import { getLayout } from '../components/Layout';
import PageContext from '../contexts/PageContext';

export default function Home() {
  const { page } = useContext(PageContext);
  return <div>Home</div>;
}

Home.getLayout = getLayout;
