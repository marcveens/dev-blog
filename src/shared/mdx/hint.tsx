import { Info } from '@/utils/Icons';

export const Hint = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-4 rounded-lg border border-[#363d43] bg-[#22272D] px-6 pt-2">
      <Info weight="fill" className="flex-shrink-0 mt-4" />
      <div>{children}</div>
    </div>
  );
};
