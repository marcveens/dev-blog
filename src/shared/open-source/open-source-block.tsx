import { Package, Star, DownloadSimple } from '@/utils/Icons';

export type OpenSourceBlockProps = {
  title: string;
  description?: string;
  downloads: number;
  stars: number;
  version: string;
  link: string;
};

export const OpenSourceBlock = (props: OpenSourceBlockProps) => {
  const { title, description, downloads, stars, version, link } = props;
  const formattedDownloads = getFormattedDownloads(downloads);

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col gap-3 rounded-2xl border border-solid border-contrast/[.1] px-7 py-4 text-contrast transition-colors duration-200 ease-in-out hover:border-contrast/[.3]"
    >
      <div>
        <div className="mb-1 text-xl font-extralight text-contrast/[.8]">{title}</div>
        {description && <div className="text-[14px] font-extralight text-contrast/[.5]">{description}</div>}
      </div>
      <div className="flex gap-8 opacity-50">
        <InfoBlock icon={<Package size={20} />} label={version} />
        <InfoBlock icon={<Star size={20} />} label={stars} />
        <InfoBlock icon={<DownloadSimple size={20} />} label={`${formattedDownloads} p/m`} />
      </div>
    </a>
  );
};

const InfoBlock = (props: { icon: React.ReactNode; label: React.ReactNode }) => {
  const { icon, label } = props;

  return (
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-[14px] font-extralight">{label}</span>
    </div>
  );
};

const getFormattedDownloads = (downloads: number) => {
  if (downloads < 1000) {
    return downloads;
  } else if (downloads < 1000000) {
    return `${(downloads / 1000).toFixed(1)}k`;
  } else {
    return `${(downloads / 1000000).toFixed(1)}m`;
  }
};
