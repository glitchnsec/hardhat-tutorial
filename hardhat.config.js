require("@nomicfoundation/hardhat-toolbox");

const { ALCHEMY_API_KEY, mnemonic } = require("./secrets.json");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: {mnemonic: mnemonic}
    },
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: {mnemonic: mnemonic, initialIndex: 1},
    }
  }
};
