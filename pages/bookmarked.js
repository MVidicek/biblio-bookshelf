import Layout from '../components/Layout';

export default function Bookmarked() {
  return <div>Bookmarked</div>;
}

Bookmarked.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
