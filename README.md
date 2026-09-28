# COMP5521 Project Introduction 1

This repository is the first-lesson demo for the project **Cross-Chain Asset Exchange Using HTLC**. This lesson focuses on the single-chain foundation: deploying and minting an educational ERC20 token called **My Simple Token (MST)**, then checking its balance. The HTLC exchange is introduced and implemented in the second lesson.

MST is an educational token, not a production stablecoin. It has no price peg or reserve mechanism. It is used as one asset in the later HTLC demonstration.

## Prerequisites

- Node.js (LTS) and npm
- MetaMask with a disposable Sepolia testnet account
- Sepolia ETH for gas
- A Sepolia RPC endpoint (Infura, Alchemy, or another provider)

## 1. Install

```bash
git clone <repository-url>
cd Lab3-COMP5521-2026
npm install
```

Copy `.env.example` to `.env`, then fill in your own values. The variables are:

- `SEPOLIA_RPC_URL`: your Sepolia RPC endpoint. Create or view an Infura endpoint at [https://app.infura.io/key/active-endpoints](https://app.infura.io/key/active-endpoints).
- `PRIVATE_KEY`: the private key of your disposable Sepolia testnet account. In MetaMask, select the account, open the account menu, choose **Account details**, and select **Show private key**. Never commit or share this value.
- `ETHERSCAN_API_KEY`: an Etherscan API key for optional contract-source verification. Follow [https://docs.etherscan.io/getting-an-api-key](https://docs.etherscan.io/getting-an-api-key) to create one.
- `VERIFY_CONTRACT`: set this to `true` only when you want the deployment script to verify the contract on Etherscan. Keep it `false` for the basic classroom demo.
- `MST_ADDRESS`: leave empty before deployment; copy the deployed contract address here afterward.
- `MINT_TO`: optional recipient address for newly minted MST. Leave empty to mint to the account represented by `PRIVATE_KEY`.
- `MINT_AMOUNT`: the number of MST tokens to mint, expressed in whole tokens.

Never commit `.env` or share your private key:

```env
SEPOLIA_RPC_URL="https://sepolia.infura.io/v3/YOUR_PROJECT_ID"
PRIVATE_KEY="YOUR_TESTNET_PRIVATE_KEY"
ETHERSCAN_API_KEY="YOUR_ETHERSCAN_API_KEY"
VERIFY_CONTRACT="false"
MST_ADDRESS=""
MINT_TO=""
MINT_AMOUNT="1000"
```

## 2. Compile and test locally

```bash
npm run compile
npm test
```

The local tests cover the token metadata, owner-only minting, and balance updates.

## 3. Deploy to Sepolia

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

The script prints the deployer, chain ID, transaction hash, and contract address. Copy the printed `MST_ADDRESS=...` line into `.env`.

Optional Etherscan verification can be enabled after deployment by setting `VERIFY_CONTRACT="true"` and adding `ETHERSCAN_API_KEY`.

## 4. Mint MST and inspect the balance

By default, tokens are minted to the account represented by `PRIVATE_KEY`:

```bash
npx hardhat run scripts/interact.js --network sepolia
npx hardhat run scripts/checkBalance.js --network sepolia
```

To mint to another MetaMask account, set `MINT_TO` in `.env`. `MINT_AMOUNT` is expressed in whole MST tokens.

You can also import the deployed token into MetaMask using the MST contract address. The token uses 18 decimals, like the standard ERC20 default.

## Project structure

- `contracts/MySimpleToken.sol`: OpenZeppelin ERC20 token with owner-only `mint`
- `scripts/deploy.js`: deploys MST to Sepolia
- `scripts/interact.js`: mints MST and prints before/after balances
- `scripts/checkBalance.js`: reads the current account's MST balance
- `test/MySimpleToken.js`: local contract tests
- `hardhat.config.js`: Sepolia network configuration

In the second lesson, the deployed MST token becomes one side of the HTLC-based cross-chain asset exchange.
