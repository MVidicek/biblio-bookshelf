import Layout from '../components/Layout';

export default function Reading() {
  return <div>Reading</div>;
}

Reading.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
