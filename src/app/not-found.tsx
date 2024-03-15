import Layout from '@/shared/layout/layout';

export default function NotFound() {
  return (
    <Layout>
      <main>
        <h1 className="text-4xl font-medium mb-8">Not found</h1>
        <p>You just hit a route that doesn&apos;t exist... the sadness.</p>
      </main>
    </Layout>
  );
}
