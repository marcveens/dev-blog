import { Header } from '../header/header';
import { Footer } from '../footer/footer';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = (props: LayoutProps) => {
  const { children } = props;

  return (
    <div className="max-w-1200 container mx-auto text-contrast font-light">
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="mb-12 flex-grow basis-0 px-4 pt-8 sm:px-6">{children}</div>

        <Footer />
      </div>
    </div>
  );
};

export default Layout;
