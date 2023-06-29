import { format, parseISO } from 'date-fns';
import * as styles from './postpreview.css';
import { slugify } from '@/utils/slugify';
import { ArrowRight } from '../../utils/Icons';

type PostPreviewProps = {
  title: string;
  description: string;
  slug: string;
  date: string;
  category: string;
};

export const PostPreview = (props: PostPreviewProps) => {
  const { title, description, slug, category, date } = props;

  const formattedDate = format(parseISO(date), 'MMMM yyyy');
  const strippedDescription = description.replace(/(<([^>]+)>)/gi, '');

  return (
    <div className={styles.postPreview}>
      <div>
        <time className={styles.time} dateTime={date}>
          {formattedDate}
        </time>
        <a className={styles.category} href={`/category/${slugify(category)}`}>
          {category}
        </a>
      </div>
      <h2 className={styles.title}>
        <a href={`/posts/${slug}`}>{title}</a>
      </h2>
      <p>{cutStringToWholeWord(strippedDescription, 185)}</p>
      <a className={styles.link} href={`/posts/${slug}`}>
        Read more <ArrowRight size={16} />
      </a>
    </div>
  );
};

function cutStringToWholeWord(str: string, maxLength: number) {
  if (str.length <= maxLength) {
    return str;
  }

  // Trim the string to the maximum length
  var trimmedString = str.substring(0, maxLength);

  // Re-trim the string to the last whole word
  trimmedString = trimmedString.substring(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' ')));

  if (trimmedString.length < str.length) {
    trimmedString += '...';
  }

  return trimmedString;
}
