'use client';

import {
  CodeBracketIcon,
  CpuChipIcon,
  Cog6ToothIcon,
  CubeTransparentIcon,
} from '@heroicons/react/24/outline';
import { motion, type Variants, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';

const skills = [
  {
    category: 'skillCategories.frontend',
    icon: <CodeBracketIcon className="w-6 h-6" />,
    gradient: 'from-pink-500/10 to-rose-600/10 dark:from-pink-400/10 dark:to-rose-500/10',
    iconGradient: 'from-pink-500 to-rose-600 dark:from-pink-400 dark:to-rose-500',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    category: 'skillCategories.aiTools',
    icon: <CpuChipIcon className="w-6 h-6" />,
    gradient: 'from-purple-500/10 to-indigo-600/10 dark:from-purple-400/10 dark:to-indigo-500/10',
    iconGradient: 'from-purple-500 to-indigo-600 dark:from-purple-400 dark:to-indigo-500',
    items: ['Cursor', 'Copilot/v0.dev/bolt.new', 'Calude 3.7', 'ChatGPT', 'DeepSeek'],
  },
  {
    category: 'skillCategories.web3',
    icon: <CubeTransparentIcon className="w-6 h-6" />,
    gradient: 'from-emerald-500/10 to-teal-600/10 dark:from-emerald-400/10 dark:to-teal-500/10',
    iconGradient: 'from-emerald-500 to-teal-600 dark:from-emerald-400 dark:to-teal-500',
    items: ['Smart Contract Basic', 'Wallets', 'Base', 'Solana', 'Learning...'],
  },
  {
    category: 'skillCategories.other',
    icon: <Cog6ToothIcon className="w-6 h-6" />,
    gradient: 'from-amber-500/10 to-orange-600/10 dark:from-amber-400/10 dark:to-orange-500/10',
    iconGradient: 'from-amber-500 to-orange-600 dark:from-amber-400 dark:to-orange-500',
    items: [
      'Git, Linux, Raspberry Pi',
      'Slack, FigJam, Linear',
      'Notion',
      'Davinci Resolve',
      'Filmmaking',
    ],
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
      duration: 0.6,
    },
  },
};

export function SkillsSection() {
  const t = useTranslations('About');
  const { scrollYProgress } = useScroll();

  return (
    <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="space-y-20"
      >
        <div className="text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          >
            <motion.h2
              style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
              className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-400">
                {t('skills')}
              </span>
            </motion.h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.p
              style={{ y: useTransform(scrollYProgress, [0, 1], [0, -25]) }}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              {t('skillsDescription')}
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {skills.map((skillGroup, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -2 }}
              className="relative group"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${skillGroup.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300`}
              />
              <motion.div
                initial={{ scale: 0.95 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 300, damping: 20, delay: index * 0.1 }}
                className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-100/80 dark:border-gray-700/50 h-full overflow-hidden"
              >
                <div className="relative p-4 sm:p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <span
                      className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${skillGroup.iconGradient} text-white`}
                    >
                      <motion.div
                        initial={{ rotate: 0 }}
                        whileHover={{ rotate: 90 }}
                        transition={{ duration: 0.2 }}
                        className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center"
                      >
                        {skillGroup.icon}
                      </motion.div>
                    </span>
                    <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200">
                      {t(skillGroup.category)}
                    </h3>
                  </div>
                  <ul className="space-y-2 sm:space-y-3">
                    {skillGroup.items.map((skill, skillIndex) => (
                      <motion.li
                        key={skillIndex}
                        whileHover={{ x: 2 }}
                        className="text-gray-600 dark:text-gray-300 flex items-start sm:items-center gap-3 group/item"
                      >
                        <span className="mt-1.5 sm:mt-0 w-1.5 h-1.5 shrink-0 rounded-full bg-gradient-to-r from-blue-500/80 to-blue-600/80 dark:from-blue-400/80 dark:to-blue-500/80 opacity-50 group-hover/item:opacity-100 transition-opacity" />
                        <span className="text-base group-hover/item:text-blue-500 dark:group-hover/item:text-blue-400 transition-colors">
                          {skill}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
