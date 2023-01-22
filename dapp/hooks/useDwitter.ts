import Dwitter from './Dwitter.json';
import ethers from 'ethers';
import { useEffect, useState } from 'react';

const ContractABI = Dwitter.abi;
const ContractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const Ethereum = typeof window !== 'undefined' && (window as any).ethereum;

const getDwitterContract = () => {
  const provider = new ethers.providers.Web3Provider(Ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(ContractAddress, ContractABI, signer);
};

const useDwitter = () => {
  // const DwitterContract = getDwitterContract();

  const [currentAccount, setCurrentAccount] = useState<string>('');

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

  return { connect, account: currentAccount };
};

export default useDwitter;
