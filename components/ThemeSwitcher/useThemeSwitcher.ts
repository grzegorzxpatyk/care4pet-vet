import { stagger, useAnimate } from 'framer-motion';
import { useEffect } from 'react';
import colors from 'tailwindcss/colors';

const staggerButtons = stagger(0.2, { startDelay: 0.15 });

function useSafeAnimate() {
  const [scope, animate] = useAnimate();

  const safeAnimate = (...args: Parameters<typeof animate>) => {
    if (!scope.current) {
      return;
    }
    return animate(...args);
  };

  return [scope, safeAnimate] as [typeof scope, typeof animate];
}

export function useThemeSwitcherAnimation(isOpen: boolean) {
  const [scope, safeAnimate] = useSafeAnimate();

  const toggleVisibility = (selector: string) => {
    safeAnimate(selector, {
      visibility: isOpen ? 'visible' : 'hidden',
    });
  };

  useEffect(() => {
    if (isOpen) {
      safeAnimate('.theme-switch', {
        background: `${colors.blue[800]}10`,
      });

      safeAnimate(
        '.theme-switch > .child:nth-of-type(1)',
        {
          display: 'block',
          visibility: 'visible',
        },
        {
          delay: staggerButtons,
          onComplete: () => {
            safeAnimate(
              '.theme-switch > .child:nth-of-type(1)',
              {
                x: 0,
                opacity: 1,
              },
              {
                delay: staggerButtons,
              }
            );
          },
        }
      );

      safeAnimate(
        '.theme-switch > .child:nth-of-type(2)',
        {
          display: 'block',
          visibility: 'visible',
        },
        {
          delay: staggerButtons,
          onComplete: () => {
            safeAnimate(
              '.theme-switch > .child:nth-of-type(2)',
              {
                x: 0,
                opacity: 1,
              },
              {
                delay: staggerButtons,
              }
            );
          },
        }
      );

      safeAnimate(
        '.theme-switch > .child:nth-of-type(3)',
        {
          display: 'block',
          visibility: 'visible',
        },
        {
          delay: staggerButtons,
          onComplete: () => {
            safeAnimate(
              '.theme-switch > .child:nth-of-type(3)',
              {
                x: 0,
                opacity: 1,
              },
              {
                delay: staggerButtons,
              }
            );
          },
        }
      );
    } else {
      safeAnimate('.theme-switch', {
        background: `${colors.blue[800]}00`,
      });

      safeAnimate(
        '.theme-switch > .child:nth-of-type(1)',
        {
          x: 96,
          opacity: 0,
        },
        {
          delay: staggerButtons,
          onComplete: () =>
            toggleVisibility('.theme-switch > .child:nth-of-type(1)'),
        }
      );

      safeAnimate(
        '.theme-switch > .child:nth-of-type(2)',
        {
          x: 48,
          opacity: 0,
        },
        {
          delay: staggerButtons,
          onComplete: () =>
            toggleVisibility('.theme-switch > .child:nth-of-type(2)'),
        }
      );
    }
    safeAnimate(
      '.theme-switch > .child:nth-of-type(3)',
      {
        x: 0,
        opacity: 0,
      },
      {
        delay: staggerButtons,
        onComplete: () =>
          toggleVisibility('.theme-switch > .child:nth-of-type(3)'),
      }
    );
  }, [isOpen]);

  return scope;
}
