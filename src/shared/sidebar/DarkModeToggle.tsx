'use client';

import { Moon, SunDim } from '@/utils/Icons';
import * as style from './darkModeToggle.css';
import { toggleTheme, getCurrentTheme } from '@/utils/colorScheme';
import { darkThemeClass, themeClass } from '@/styles/theme.css';
import { useEffect, useState } from 'react';

export const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const body = document.querySelector('body');
    body?.classList.add(darkThemeClass);
    body?.classList.remove(themeClass);

    toggleTheme('dark');
    setIsDarkMode(true);
  };

  const toggleLightMode = () => {
    const body = document.querySelector('body');
    body?.classList.remove(darkThemeClass);
    body?.classList.add(themeClass);

    toggleTheme('light');
    setIsDarkMode(false);
  };

  useEffect(() => {
    (async () => {
      const currentTheme = await getCurrentTheme();
      if (currentTheme === 'dark') {
        setIsDarkMode(true);
      }
    })();
  }, []);

  return (
    <div className={style.toggleContainer}>
      {isDarkMode ? (
        <span className={style.toggle} onClick={toggleLightMode}>
          <SunDim size={22} weight="light" />
        </span>
      ) : (
        <span className={style.toggle} onClick={toggleDarkMode}>
          <Moon size={22} weight="light" />
        </span>
      )}
    </div>
  );
};
