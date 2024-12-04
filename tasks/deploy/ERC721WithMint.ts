import { task, types } from "hardhat/config";
import { TaskArguments } from "hardhat/types";


task("TASK_DEPLOY_ERC721_BURNABLE").setAction(async function (
  _taskArguments: TaskArguments,
  hre
) {
  console.log("Contract Deployment Started ");
  const ERC20WithMint = await hre.ethers.getContractFactory("BurnableERC721");
  const erc721 = await ERC20WithMint.deploy();

  await erc721.deployed();

  console.log("ERC721 Contract deployed to: ", erc721.address);
  console.log("Contract Deployment Ended");

  const WAIT_BLOCK_CONFIRMATIONS = 8;
  await erc721.deployTransaction.wait(WAIT_BLOCK_CONFIRMATIONS);

  await hre.run(`verify:verify`, {
    address: erc721.address,
    constructorArguments: [],
  });

  return null;
});