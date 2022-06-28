import Layout from '../components/Layout';

export default function Discover() {
  return <div>Discover</div>;
}

Discover.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
