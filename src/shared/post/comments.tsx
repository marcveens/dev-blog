'use client';

import Giscus from '@giscus/react';

export const Comments = () => {
  return (
    <div className="mb-5">
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
        theme="dark"
        lang="en"
        loading="lazy"
      />
    </div>
  );
};
