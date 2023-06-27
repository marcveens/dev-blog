import { Container } from '@/shared/Container/Container';
import { Sidebar } from '@/shared/Sidebar/Sidebar';
import * as styles from './layout.css';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = (props: LayoutProps) => {
  const { children } = props;

  return (
    <Container maxWidth="lg">
      <div className={styles.layout}>
        <Sidebar />
        <div className={styles.main}>
        {children}
        </div>
      </div>
    </Container>
  );
};

export default Layout;
