const hre = require("hardhat");

async function main() {
  const create = await hre.ethers.deployContract("Create");
  const contract_owner = await hre.ethers.getSigner(
    "0x39A948875ff90EfE7537cc1b114102AB34f7762F"
  );
  await create.waitForDeployment();

  console.log(create);
  console.log("Deployed to:", create.target);
  console.log("Contract Owner:", contract_owner);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
