import Layout from '../components/Layout';

export default function Finished() {
  return <div>Finished</div>;
}

Finished.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
