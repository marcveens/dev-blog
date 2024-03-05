import * as styles from './layout.css';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = (props: LayoutProps) => {
  const { children } = props;

  return (
    <div className="max-w-900 container mx-auto px-4 sm:px-6">
      <div className={styles.layout}>
        <Header />
        <div className={styles.main}>{children}</div>

        <Footer />
      </div>
    </div>
  );
};

export default Layout;
