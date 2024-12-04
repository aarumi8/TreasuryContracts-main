import { task, types } from "hardhat/config";
import { TaskArguments } from "hardhat/types";


task("TASK_DEPLOY_ERC20_WITH_MINT").setAction(async function (
  _taskArguments: TaskArguments,
  hre
) {
  console.log("Contract Deployment Started ");
  const ERC20WithMint = await hre.ethers.getContractFactory("ERC20WithMint");
  const erc20 = await ERC20WithMint.deploy();

  await erc20.deployed();

  console.log("ERC20 Contract deployed to: ", erc20.address);
  console.log("Contract Deployment Ended");

  const WAIT_BLOCK_CONFIRMATIONS = 8;
  await erc20.deployTransaction.wait(WAIT_BLOCK_CONFIRMATIONS);

  await hre.run(`verify:verify`, {
    address: erc20.address,
    constructorArguments: [],
  });

  return null;
});