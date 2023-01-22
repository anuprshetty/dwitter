import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Button from '../components/Button';
import SignUpForm from '../components/SignUpForm';
import useDwitter from '../hooks/useDwitter';

const Home: NextPage = () => {
  const { connect, account, user, createUser, postTweet, tweets } =
    useDwitter();
  const [tweetContent, setTweetContent] = useState<string>('');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Dwitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20">
        <h1 className="text-6xl font-bold mb-8">
          Welcome to <span className="text-blue-500">Dwitter</span>
        </h1>
        {!account ? (
          <Button label="Connect with Ethereum" onClick={connect} />
        ) : account.toUpperCase() !== user?.wallet.toUpperCase() ? (
          <SignUpForm createUser={createUser} />
        ) : (
          <>
            <div className="flex items-center w-80">
              <img src={user?.avatar} className="rounded-full h-16 w-16 mr-4" />
              <div className="flex flex-col justify-start">
                <span>{user?.name}</span>
                <span className="text-sm text-gray-400">@{user?.username}</span>
              </div>
              <textarea
                className="rounded-xl border-4 ml-4 p-2"
                placeholder="What's happening?"
                value={tweetContent}
                onChange={(e) => setTweetContent(e.target.value)}
              />
            </div>
            <div className="mt-2 flex justify-end w-72">
              <Button label="Tweet" onClick={() => postTweet(tweetContent)} />
            </div>
          </>
        )}

        {tweets.map((tweet) => (
          <span className="w-64 py-2 px-4">{tweet.content}</span>
        ))}
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        Powered by Ethereum
      </footer>
    </div>
  );
};

export default Home;
