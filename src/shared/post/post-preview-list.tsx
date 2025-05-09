import { format } from "date-fns";
import { PostPreviewProps } from "./post-types";
import Link from "next/link";
import { cutStringToWholeWord } from "./post-utils";
import { ArrowRight } from "@/utils/Icons";
import { LinkButton } from "../button/link-button";

export const PostPreviewList = (props: PostPreviewProps) => {
  const { title, description, slug, date } = props;

  const formattedDate = format(date, "MMMM yyyy");
  const strippedDescription = description.replace(/(<([^>]+)>)/gi, "");

  return (
    <article className="flex flex-col items-start text-contrast">
      <div className="mb-1 flex gap-5 text-sm font-light uppercase">
        <time
          dateTime={date.toISOString()}
          className="block text-contrast/[.5]"
        >
          {formattedDate}
        </time>
      </div>
      <div className="flex flex-col gap-7">
        <h2 className="text-28">
          <Link
            href={slug}
            className="hover:border-context hover:border-b hover:border-solid"
          >
            {title}
          </Link>
        </h2>
        <p className="text-base text-contrast/[.8]">
          {cutStringToWholeWord(strippedDescription, 185)}
        </p>

        <LinkButton
          to={slug}
          className="self-start"
          endIcon={<ArrowRight size={16} />}
        >
          Read more
        </LinkButton>
      </div>
    </article>
  );
};
