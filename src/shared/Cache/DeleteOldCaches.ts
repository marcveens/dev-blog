'use client';

import { useEffect } from 'react';

export const DeleteOldCaches = () => {
  useEffect(() => {
    (async () => {
      const keys = await caches.keys();
      const keysToDelete = keys.filter((key) => key.includes('gatsby'));
      await Promise.all(keysToDelete.map((key) => caches.delete(key)));
    })();
  }, []);

  return null;
};
