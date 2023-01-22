import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Button from '../components/Button';
import useDwitter from '../hooks/useDwitter';

const Home: NextPage = () => {
  const { connect, account } = useDwitter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Dwitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold mb-8">
          Welcome to <span className="text-blue-500">Dwitter</span>
        </h1>
        {!account ? (
          <Button label="Connect with Ethereum" onClick={connect} />
        ) : (
          <p className="text-red-400">Connected to {account}</p>
        )}
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        Powered by Ethereum
      </footer>
    </div>
  );
};

export default Home;
