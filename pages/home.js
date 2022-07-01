import { getLayout } from '../components/Layout';

export default function Home({ page }) {
  return <div>{page}</div>;
}

Home.getLayout = getLayout;
