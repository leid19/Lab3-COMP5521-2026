const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const network = await hre.ethers.provider.getNetwork();

  console.log("Deploying MySimpleToken...");
  console.log(`Deployer: ${deployer.address}`);
  console.log(`Chain ID: ${network.chainId}`);

  const MySimpleToken = await hre.ethers.getContractFactory("MySimpleToken");
  const token = await MySimpleToken.deploy();
  await token.waitForDeployment();

  const contractAddress = await token.getAddress();
  const deploymentTx = token.deploymentTransaction();
  console.log(`MySimpleToken deployed to: ${contractAddress}`);
  if (deploymentTx) {
    console.log(`Deployment transaction: ${deploymentTx.hash}`);
  }

  console.log(`\nCopy this address into .env:\nMST_ADDRESS=${contractAddress}`);

  if (process.env.VERIFY_CONTRACT === "true") {
    console.log("\nVerifying contract on Etherscan...");
    try {
      await deploymentTx.wait(5);
      await hre.run("verify:verify", {
        address: contractAddress,
        constructorArguments: [],
      });
      console.log("Contract verified successfully.");
    } catch (error) {
      if (error.message.toLowerCase().includes("already verified")) {
        console.log("Contract is already verified.");
      } else {
        console.error("Verification failed:", error.message);
      }
    }
  }
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
