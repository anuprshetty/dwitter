import Dwitter from './Dwitter.json';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

const ContractABI = Dwitter.abi;
const ContractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
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

const useDwitter = () => {
  const [currentAccount, setCurrentAccount] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

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
  }, []);

  useEffect(() => {
    if (currentAccount) {
      getUser();
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

  return { connect, account: currentAccount, user: currentUser, createUser };
};

export default useDwitter;
