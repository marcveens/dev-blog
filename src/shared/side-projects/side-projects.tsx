import { ArrowRight } from "@/utils/Icons";
import { Button } from "../button/button";
import Image from "next/image";

type SideProject = {
  title: string;
  url: string;
  description: string;
  image: string;
};

const sideProjects: SideProject[] = [
  {
    title: "TinyDeskDB",
    description: "A search engine for NPR's Tiny Desk Concerts",
    url: "https://www.tinydeskdb.com",
    image: "/media/tinydeskdb/tinydeskdb-com-small.jpg"
  }
];

export const SideProjects = () => {
  return (
    <div className="mb-5 mt-16">
      <h1 className="mb-3 text-2xl text-contrast/[.5]">Side projects</h1>
      <div className="mx-auto inline-grid w-full gap-8 sm:grid-cols-2 lg:grid-cols-3 sm:[&>*:nth-child(3)]:hidden lg:[&>*:nth-child(3)]:flex">
        {sideProjects.map((project) => (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            key={project.title}
            className="group flex flex-col rounded-2xl bg-contrast/[.05] p-3 text-contrast"
          >
            <Image
              src={project.image}
              alt={project.title}
              className="w-full rounded-lg object-cover grayscale transition-all duration-200 ease-in-out group-hover:grayscale-0"
              width="600"
              height="340"
              quality={70}
            />
            <div className="py-4">
              <h2 className="mb-1 text-lg font-light">{project.title}</h2>
              <p className="text-sm text-contrast/[.8]">{project.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
