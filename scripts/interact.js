const hre = require("hardhat");
require("dotenv").config();

async function main() {
  const contractAddress = process.env.MST_ADDRESS;
  if (!contractAddress) {
    throw new Error("MST_ADDRESS is missing. Add the deployed address to .env first.");
  }

  const [signer] = await hre.ethers.getSigners();
  const token = await hre.ethers.getContractAt("MySimpleToken", contractAddress, signer);
  const decimals = await token.decimals();
  const mintTo = process.env.MINT_TO || signer.address;
  const mintAmount = process.env.MINT_AMOUNT || "1000";

  console.log("Interacting with MySimpleToken...");
  console.log(`Signer: ${signer.address}`);
  console.log(`Mint recipient: ${mintTo}`);
  console.log(`Mint amount: ${mintAmount} MST`);
  console.log(`Initial balance: ${hre.ethers.formatUnits(await token.balanceOf(mintTo), decimals)} MST`);

  const mintTx = await token.mint(mintTo, hre.ethers.parseUnits(mintAmount, decimals));
  await mintTx.wait();
  console.log(`Mint transaction confirmed: ${mintTx.hash}`);

  const finalBalance = await token.balanceOf(mintTo);
  console.log(`Final balance: ${hre.ethers.formatUnits(finalBalance, decimals)} MST`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
