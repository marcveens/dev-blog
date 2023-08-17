'use client';

import Giscus from '@giscus/react';
import * as styles from './Comments.css';
import { getCurrentTheme } from '@/utils/colorScheme';
import { useEffect, useState } from 'react';

export const Comments = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    (async () => {
      const currentTheme = await getCurrentTheme();
      if (currentTheme === 'dark') {
        setIsDarkMode(true);
      }
    })();
  }, []);

  return (
    <div className={styles.comments}>
      <Giscus
        id="comments"
        repo="marcveens/dev-blog"
        repoId="MDEwOlJlcG9zaXRvcnkxOTYwNTczMTA="
        category="Announcements"
        categoryId="DIC_kwDOC6-Y3s4CX303"
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={isDarkMode ? 'dark' : 'light'}
        lang="en"
        loading="lazy"
      />
    </div>
  );
};
