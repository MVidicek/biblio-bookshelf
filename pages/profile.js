import Layout from '../components/Layout';

export default function Profile() {
  return <div>Profile</div>;
}

Profile.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
