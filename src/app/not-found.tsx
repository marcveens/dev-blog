import Layout from '@/shared/Layout/layout';
import * as styles from '../styles/layout.css';

export default function NotFound() {
  return (
    <Layout>
      <main>
        <h1 className={styles.pageTitle}>Not found</h1>
        <p>You just hit a route that doesn't exist... the sadness.</p>
      </main>
    </Layout>
  );
}
