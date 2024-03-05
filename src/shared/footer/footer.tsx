import { config } from '@/config/config';

export const Footer = () => {
  return (
    <footer className="flex justify-center text-contrast p-4 text-center text-sm">
      <p>{config.footer}</p>
    </footer>
  );
};
