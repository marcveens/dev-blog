'use client';

import Giscus from '@giscus/react';
import * as styles from './Comments.css';

export const Comments = () => {
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
        theme="light"
        lang="en"
        loading="lazy"
      />
    </div>
  );
};
