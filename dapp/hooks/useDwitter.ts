import Dwitter from './Dwitter.json';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

const ContractABI = Dwitter.abi;
const ContractAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
const Ethereum = typeof window !== 'undefined' && (window as any).ethereum;

const getDwitterContract = () => {
  const provider = new ethers.providers.Web3Provider(Ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(ContractAddress, ContractABI, signer);
};

type User = {
  wallet: string;
  username: string;
  name: string;
  bio: string;
  avatar: string;
};

type Tweet = {
  author: string;
  content: string;
  timestamp: number;
  likes: number;
};

const useDwitter = () => {
  const [currentAccount, setCurrentAccount] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [tweets, setTweets] = useState<Tweet[]>([]);

  // connect to wallet
  const connect = async () => {
    try {
      if (!Ethereum) {
        alert('No Ethereum wallets found, please get MetaMask');
        return;
      }
      const accounts = await Ethereum.request({
        method: 'eth_requestAccounts',
      });
      if (accounts.length === 0) {
        console.log('No authorized accounts');
        return;
      }

      const account = accounts[0];
      setCurrentAccount(account);
      console.log('Connected to account: ', account);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!Ethereum) {
      console.log('No Ethereum wallets found, please get MetaMask');
      return;
    }
    connect();
    getTweets();
  }, []);

  useEffect(() => {
    if (currentAccount) {
      getUser();
      getTweets();
    }
  }, [currentAccount]);

  const getUser = async () => {
    const contract = getDwitterContract();
    const user = await contract.getUser(currentAccount);
    const { wallet, username, name, bio, avatar } = user;
    setCurrentUser({ wallet, username, name, bio, avatar });

    return currentUser;
  };

  const createUser = async (
    username: string,
    name: string,
    bio: string,
    avatar: string
  ) => {
    const contract = getDwitterContract();
    const user = await contract.signup(username, name, bio, avatar);
    getUser();
  };

  const postTweet = async (tweet: string) => {
    const contract = getDwitterContract();
    await contract.postTweet(tweet);
    await getTweets();
  };

  const getTweets = async () => {
    const contract = getDwitterContract();
    const tweets = await contract.getTweets();
    console.log('Tweets: ', tweets);
    setTweets(tweets);
  };

  return {
    connect,
    account: currentAccount,
    user: currentUser,
    createUser,
    postTweet,
    tweets,
  };
};

export default useDwitter;
