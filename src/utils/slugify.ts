
import rawSlugify from 'slugify';

export const slugify = (text: string) => {
  return rawSlugify(text, {
    lower: true,
    strict: true
  });
};