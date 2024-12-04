import { task, types } from "hardhat/config";
import { TaskArguments } from "hardhat/types";


task("TASK_DEPLOY_USDT").setAction(async function (
  _taskArguments: TaskArguments,
  hre
) {
  console.log("Contract USDT Deployment Started ");
  const USDT = await hre.ethers.getContractFactory("TetherToken");
  const usdt = await USDT.deploy();

  await usdt.deployed();

  console.log("ERC20 Contract deployed to: ", usdt.address);
  console.log("Contract Deployment Ended");

  const WAIT_BLOCK_CONFIRMATIONS = 8;
  await usdt.deployTransaction.wait(WAIT_BLOCK_CONFIRMATIONS);

  await hre.run(`verify:verify`, {
    address: usdt.address,
    constructorArguments: [],
  });

  return null;
});