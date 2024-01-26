import { Container } from '@/shared/Container/Container';
import { Sidebar } from '@/shared/Sidebar/Sidebar';
import * as styles from './layout.css';
import { Header } from '../Header/Header';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = (props: LayoutProps) => {
  const { children } = props;

  return (
    <Container maxWidth="md">
      <div className={styles.layout}>
        <Header />
        {/* <Sidebar /> */}
        <div className={styles.main}>
        {children}
        </div>
      </div>
    </Container>
  );
};

export default Layout;
