import { getOpenSourceProjects } from '@/api/api';
import { ArrowRight } from '@/utils/Icons';
import { OpenSourceBlock, OpenSourceBlockProps } from './open-source-block';
import { LinkButton } from '../button/link-button';

export const OpenSourceContributions = async () => {
  const projects: OpenSourceBlockProps[] = await getOpenSourceProjects();

  return (
    <div className="mb-5 mt-16">
      <h1 className="mb-3 text-2xl text-contrast/[.5]">Recent open source projects</h1>
      <div className="mx-auto inline-grid w-full gap-8 sm:grid-cols-2 lg:grid-cols-3 sm:[&>*:nth-child(3)]:hidden lg:[&>*:nth-child(3)]:flex">
        {projects.map((project) => (
          <OpenSourceBlock key={project.title} {...project} />
        ))}
      </div>
      <div className="flex justify-end mt-5">
        <LinkButton endIcon={<ArrowRight size={16} />} to="https://github.com/marcveens" className="self-center">
          My GitHub
        </LinkButton>
      </div>
    </div>
  );
};
