require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/vYszuwU6Q9cGxq1gxqwE2l7yvgM8GBI6",
      accounts: ["<private-key>"],
    },
  },
};
