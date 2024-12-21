import {TronWeb} from 'tronweb';
import axios from 'axios';

// Initialize TronWeb instance with fullHost and privateKey (optional for wallet creation)
export const tronWeb = new TronWeb({
  fullHost: 'https://api.trongrid.io',
  privateKey: process.env.TRON_PRIVATE_KEY,  // Optional, needed for interacting with the wallet
});

// Function to generate a new TRON wallet
export const generateWallet = async () => {
  try {
    // Generate a new wallet account
    const newAccount = await tronWeb.createAccount(); // Use await to handle the promise

    // Log the newAccount to inspect its structure
    console.log("Generated Account:", newAccount);

    if (!newAccount) {
      throw new Error('Failed to generate new account');
    }

    // Correctly extract the address and private key
    const address = newAccount.address.base58; // Correctly access the base58 address
    const privateKey = newAccount.privateKey;  // Private key is directly available

    return {
      address: address, // TRON address
      privateKey: privateKey,  // Private key
    };
  } catch (error) {
    console.error('Error generating wallet:', error.message);
    throw new Error('Error generating TRON wallet');
  }
};

export const getWalletBalance = async (address) => {
  try {
    // Get the balance in SUN (1 TRX = 1,000,000 SUN)
    const balanceInSun = await tronWeb.trx.getBalance(address);

    // Convert the balance to TRX (1 TRX = 1,000,000 SUN)
    const balanceInTrx = tronWeb.fromSun(balanceInSun);

    console.log(`Wallet balance: ${balanceInTrx} TRX`);

    // Return the balance for display in the UI
    return balanceInTrx;
  } catch (error) {
    console.error('Error fetching balance:', error.message);
    return null; // Return null if there's an error fetching the balance
  }
};

export const getWalletTransactions = async (address) => {
  try {
    const url = `https://api.trongrid.io/v1/accounts/${address}/transactions?limit=20`;
    const response = await axios.get(url);

    const transactions = response.data.data;
    const totalTransactions = response.data.meta.page_size;

    if (transactions.length === 0) {
      console.log('No transactions found for this address');
    } else {
    }

    // Handle pagination if there are more transactions
    if (totalTransactions > 20) {
      // You can implement a loop here to fetch more pages if needed.
    }

    return transactions;
  } catch (error) {
    console.error('Error fetching transactions:', error.message);
  }
};

