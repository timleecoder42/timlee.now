'use client';

import type { AnimationOptions } from 'framer-motion';
import { motion, stagger, useAnimate } from 'framer-motion';
import { debounce } from 'lodash';
import { useState, useEffect } from 'react';

import { useMounted } from '@/hooks/useMounted';

type TextProps = {
  label: string;
  reverse?: boolean;
  transition?: AnimationOptions;
  staggerDuration?: number;
  staggerFrom?: 'first' | 'last' | 'center' | number;
  className?: string;
  onClick?: () => void;
};

type TextPropsWithInView = TextProps & {
  inViewOnce?: boolean;
  inViewDelay?: number;
  inViewDirection?: 'up' | 'down';
};

// Original component from https://www.fancycomponents.dev/docs/components/text/letter-swap
// Enhanced with:
// 1. InView trigger support for initial animation
// 2. Mobile-friendly tap gesture support
// 3. Configurable animation direction and timing
// 4. Proper state management for animation sequences

export const LetterSwapPingPongInView = ({
  label,
  reverse = true,
  transition = {
    type: 'spring',
    duration: 0.7,
  },
  staggerDuration = 0.03,
  staggerFrom = 'first',
  className = '',
  onClick,
  inViewOnce = true,
  inViewDelay = 0.6,
  inViewDirection = 'up',
  ...props
}: TextPropsWithInView) => {
  const [scope, animate] = useAnimate();
  const [isHovered, setIsHovered] = useState(false);
  const [hasInitialAnimationCompleted, setHasInitialAnimationCompleted] = useState(false);
  const [isInitialAnimating, setIsInitialAnimating] = useState(false);
  const isMounted = useMounted();

  const mergeTransition = (baseTransition: AnimationOptions) => ({
    ...baseTransition,
    delay: stagger(staggerDuration, {
      from: staggerFrom,
    }),
  });

  const safeAnimate = async (...args: Parameters<typeof animate>) => {
    if (isMounted && scope.current) {
      return animate(...args);
    }
    return Promise.resolve();
  };

  useEffect(() => {
    return () => {
      // Cleanup debounced functions on unmount
      startAnimation.cancel();
      endAnimation.cancel();
    };
  }, []);

  const startAnimation = debounce(
    () => {
      if (isHovered || isInitialAnimating || !isMounted) return;
      setIsHovered(true);

      safeAnimate('.letter', { y: reverse ? '100%' : '-100%' }, mergeTransition(transition));
      safeAnimate(
        '.letter-secondary',
        {
          top: '0%',
        },
        mergeTransition(transition)
      );
    },
    100,
    { leading: true, trailing: true }
  );

  const endAnimation = debounce(
    () => {
      if (isInitialAnimating || !isMounted) return;
      setIsHovered(false);

      safeAnimate(
        '.letter',
        {
          y: 0,
        },
        mergeTransition(transition)
      );

      safeAnimate(
        '.letter-secondary',
        {
          top: reverse ? '-100%' : '100%',
        },
        mergeTransition(transition)
      );
    },
    100,
    { leading: true, trailing: true }
  );

  const triggerAnimation = () => {
    if (hasInitialAnimationCompleted || isInitialAnimating || !isMounted) return;
    setIsInitialAnimating(true);

    const timeoutId = setTimeout(() => {
      if (!isMounted) return;

      safeAnimate(
        '.letter',
        { y: inViewDirection === 'up' ? '-100%' : '100%' },
        mergeTransition(transition)
      );
      safeAnimate(
        '.letter-secondary',
        {
          top: '0%',
        },
        mergeTransition(transition)
      ).then(() => {
        if (!isMounted) return;

        safeAnimate('.letter', { y: 0 }, { duration: 0 });
        safeAnimate('.letter-secondary', { top: reverse ? '-100%' : '100%' }, { duration: 0 }).then(
          () => {
            if (!isMounted) return;
            setHasInitialAnimationCompleted(true);
            setIsInitialAnimating(false);
          }
        );
      });
    }, inViewDelay * 1000);

    return () => clearTimeout(timeoutId);
  };

  return (
    <motion.span
      className={`flex justify-center items-center relative overflow-hidden ${className}`}
      onHoverStart={startAnimation}
      onHoverEnd={endAnimation}
      onTapStart={startAnimation}
      onTapCancel={endAnimation}
      onTap={endAnimation}
      onClick={onClick}
      ref={scope}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: inViewOnce }}
      onViewportEnter={triggerAnimation}
      {...props}
    >
      <span
        className="sr-only"
        style={{
          bottom: 0,
        }}
      >
        {label}
      </span>

      {label.split('').map((letter: string, i: number) => {
        return (
          <span className="whitespace-pre relative flex" key={i} aria-hidden={true}>
            <motion.span className={`relative letter`} style={{ top: 0 }}>
              {letter}
            </motion.span>
            <motion.span
              className="absolute letter-secondary"
              style={{ top: inViewDirection === 'up' ? '100%' : '-100%' }}
            >
              {letter}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
};
