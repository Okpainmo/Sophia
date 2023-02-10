import React from 'react';
import Head from 'next/head';
import WaitlistHome from '../components/waitlist';

function Home() {
  return (
    <>
      <Head>
        {/* title */}
        <title>Sophia waitlist</title>
        {/* favicon */}
      </Head>
      <WaitlistHome />;
    </>
  );
}

export default Home;
