import Navbar from '@/components/Navbar';

import Hero2 from '@/components/Hero2';
import Teams from '@/components/Teams';
import Footer from '@/components/Footer';
import { Head } from 'next/document';

export default function Home() {
  return (
    <>
      {/* <Head>
        <script src="https://player.vimeo.com/api/player.js"></script>

      </Head> */}
      <Navbar />
      <Hero2 />
    </>
  );
}
