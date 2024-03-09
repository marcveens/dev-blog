import { format, parseISO } from 'date-fns';
import { PostPreviewProps } from './post-types';
import Link from 'next/link';
import { cutStringToWholeWord } from './post-utils';
import { ArrowRight } from '@phosphor-icons/react';
import { Button } from '../Button/Button';

export const PostPreviewBlock = (props: PostPreviewProps) => {
  const { title, description, slug, date } = props;

  const formattedDate = format(parseISO(date), 'MMMM yyyy');
  const strippedDescription = description.replace(/(<([^>]+)>)/gi, '');

  return (
    <Link href={slug} className="group flex flex-col items-start rounded-2xl bg-contrast/[.05] p-7 text-contrast">
      <time dateTime={date} className="mb-1 block text-xs text-contrast/[.5]">
        {formattedDate}
      </time>
      <div className="flex flex-col gap-7">
        <h2 className="text-28 font-light leading-normal">{title}</h2>
        <p className="text-base leading-normal text-contrast/[.8]">{cutStringToWholeWord(strippedDescription, 185)}</p>

        <Button className="self-end" endIcon={<ArrowRight size={16} />}>
          Read more
        </Button>
      </div>
    </Link>
  );
};
