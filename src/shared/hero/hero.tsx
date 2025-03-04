import { config } from "@/config/config";
import { ResponsiveCloud } from "../cloud/responsive-cloud";

export const Hero = () => {
  return (
    <div>
      <section className="flex flex-col md:flex-row md:items-center">
        <div className="mb-5 text-center md:mb-0 md:max-w-[50%] md:text-left lg:grow lg:max-w-none">
          <h1 className="md:text-[32px]/[1] lg:text-[50px]/[1] text-2xl font-medium sm:text-3xl">
            {config.hero}
          </h1>
        </div>
        <ResponsiveCloud />
      </section>
    </div>
  );
};
