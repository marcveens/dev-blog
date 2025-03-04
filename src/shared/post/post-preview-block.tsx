import { format } from "date-fns";
import { PostPreviewProps } from "./post-types";
import Link from "next/link";
import { cutStringToWholeWord } from "./post-utils";
import { ArrowRight } from "@/utils/Icons";
import { Button } from "../button/button";
import { cx } from "class-variance-authority";

export const PostPreviewBlock = (props: PostPreviewProps) => {
  const { title, description, slug, date, className } = props;

  const formattedDate = format(date, "MMMM yyyy");
  const strippedDescription = description.replace(/(<([^>]+)>)/gi, "");

  return (
    <Link
      href={slug}
      className={cx(
        "group flex flex-col items-start rounded-2xl bg-contrast/[.05] p-7 text-contrast",
        className
      )}
    >
      <time
        dateTime={date.toISOString()}
        className="mb-1 block text-xs text-contrast/[.5]"
      >
        {formattedDate}
      </time>
      <div className="flex grow flex-col gap-7">
        <h2 className="text-28 font-light">{title}</h2>
        <p className="text-base/5 text-contrast/[.8]">
          {cutStringToWholeWord(strippedDescription, 100)}
        </p>

        <Button className="self-end mt-auto" endIcon={<ArrowRight size={16} />}>
          Read more
        </Button>
      </div>
    </Link>
  );
};
