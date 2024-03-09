import { format, parseISO } from 'date-fns';
import { PostPreviewProps } from './post-types';
import Link from 'next/link';
import { cutStringToWholeWord } from './post-utils';
import { ArrowRight } from '@/utils/Icons';
import { slugify } from '@/utils/slugify';
import { LinkButton } from '../Button/LinkButton';

export const PostPreviewList = (props: PostPreviewProps) => {
  const { title, description, slug, category, date } = props;

  const formattedDate = format(parseISO(date), 'MMMM yyyy');
  const strippedDescription = description.replace(/(<([^>]+)>)/gi, '');

  return (
    <article className="flex flex-col items-start text-contrast">
      <div className="mb-1 flex gap-5 text-sm font-light uppercase">
        <time dateTime={date} className="block text-contrast/[.5]">
          {formattedDate}
        </time>
        <Link href={`/category/${slugify(category)}`} className="text-primary hover:shadow-underline-primary">
          {category}
        </Link>
      </div>
      <div className="flex flex-col gap-7">
        <h2 className="text-28 leading-normal">
          <Link href={slug} className="hover:border-context hover:border-b hover:border-solid">
            {title}
          </Link>
        </h2>
        <p className="text-base text-contrast/[.8]">{cutStringToWholeWord(strippedDescription, 185)}</p>

        <LinkButton to={slug} className="self-start" endIcon={<ArrowRight size={16} />}>
          Read more
        </LinkButton>
      </div>
    </article>
  );
};
