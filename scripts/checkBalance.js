const hre = require("hardhat");
require("dotenv").config();

async function main() {
  const contractAddress = process.env.MST_ADDRESS;
  if (!contractAddress) {
    throw new Error("MST_ADDRESS is missing. Add the deployed address to .env first.");
  }

  const [signer] = await hre.ethers.getSigners();
  const token = await hre.ethers.getContractAt("MySimpleToken", contractAddress, signer);
  const [name, symbol, decimals, balance] = await Promise.all([
    token.name(),
    token.symbol(),
    token.decimals(),
    token.balanceOf(signer.address),
  ]);

  console.log(`Account: ${signer.address}`);
  console.log(`Token: ${name} (${symbol})`);
  console.log(`Balance: ${hre.ethers.formatUnits(balance, decimals)} ${symbol}`);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});
