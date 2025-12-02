'use client';

import { motion } from 'framer-motion';
import { MailIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { NewsletterForm } from '@/components/newsletter/newsletter-form';
import { CONTACT_EMAIL, GITHUB_USERNAME } from '@/constants/config';

function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
        fill="currentColor"
      />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 1200 1227"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 87.7831H306.615L611.412 515.685L658.88 583.579L1055.08 1143.56H892.476L569.165 687.854V687.828Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Footer() {
  const t = useTranslations('Footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative min-h-screen flex flex-col">
      <style jsx global>{`
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradientMove 8s linear infinite;
        }
      `}</style>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900/50" />
      <div className="relative flex-1 flex flex-col max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 w-full">
        {/* Main content section */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-full max-w-4xl mx-auto text-center space-y-16 sm:space-y-32">
            {/* Newsletter section */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="space-y-10"
            >
              <div className="space-y-6">
                <motion.h2
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 uppercase animate-gradient"
                >
                  {t('newsletter')}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                >
                  {t('newsletterDescription')}
                </motion.p>
              </div>
              <NewsletterForm />
            </motion.div>

            {/* Social links section */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="flex items-center gap-12">
                <motion.a
                  whileHover={{
                    scale: 1.2,
                    rotate: [0, -10, 10, -10, 0],
                    transition: {
                      rotate: {
                        duration: 0.5,
                        ease: 'easeInOut',
                        repeat: Infinity,
                      },
                    },
                  }}
                  whileTap={{ scale: 0.8 }}
                  href="https://x.com/timleecoder42"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group"
                >
                  <span className="sr-only">X (formerly Twitter)</span>
                  <div className="absolute -inset-3 rounded-full bg-blue-500/10 dark:bg-blue-400/10 scale-0 group-hover:scale-100 transition-transform" />
                  <XIcon className="w-6 h-6 text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors relative" />
                </motion.a>
                <motion.a
                  whileHover={{
                    scale: 1.2,
                    y: [-2, -6, -2],
                    transition: {
                      y: {
                        duration: 0.5,
                        ease: 'easeInOut',
                        repeat: Infinity,
                      },
                    },
                  }}
                  whileTap={{ scale: 0.8 }}
                  href={`https://github.com/${GITHUB_USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group"
                >
                  <span className="sr-only">GitHub</span>
                  <div className="absolute -inset-3 rounded-full bg-purple-500/10 dark:bg-purple-400/10 scale-0 group-hover:scale-100 transition-transform" />
                  <GitHubIcon className="w-7 h-7 text-gray-600 hover:text-purple-500 dark:text-gray-400 dark:hover:text-purple-400 transition-colors relative" />
                </motion.a>
                <motion.a
                  whileHover={{
                    scale: 1.2,
                    rotate: [0, 15, -15, 15, 0],
                    transition: {
                      rotate: {
                        duration: 0.6,
                        ease: 'easeInOut',
                        repeat: Infinity,
                      },
                    },
                  }}
                  whileTap={{ scale: 0.8 }}
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="relative group"
                >
                  <span className="sr-only">Email</span>
                  <div className="absolute -inset-3 rounded-full bg-green-500/10 dark:bg-green-400/10 scale-0 group-hover:scale-100 transition-transform" />
                  <MailIcon className="w-7 h-7 text-gray-600 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-400 transition-colors relative" />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom section with copyright and additional links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10px' }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-0 sm:mt-16"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <span>© {currentYear} Tim Lee.</span>
              <span className="hidden sm:inline">•</span>
              <span>{t('rights')}</span>
            </div>
            <div className="flex items-center gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={`https://github.com/${GITHUB_USERNAME}/timlee.now`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                {t('sourceCode')}
              </motion.a>
              <span>•</span>
              <motion.span
                initial={{ opacity: 0.5 }}
                whileHover={{ opacity: 1 }}
                className="flex items-center gap-1"
              >
                {t('madeWith')} <span className="text-red-500">❤</span> {t('and')}{' '}
                <a
                  href="https://cursor.sh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  Cursor
                </a>
              </motion.span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
