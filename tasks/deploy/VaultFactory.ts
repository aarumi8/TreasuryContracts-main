import { task, types } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

const WAIT_BLOCK_CONFIRMATIONS = 8;

task("TASK_DEPLOY_VAULT_FACTORY").setAction(async function (
  _taskArguments: TaskArguments,
  hre
) {
  console.log("BlackHole Deployment Started");
  const BlackHole = await hre.ethers.getContractFactory("BlackHole");
  const blackHole = await BlackHole.deploy();
  console.log("BlackHole Deployed");

  console.log("Contract Deployment Started");
  const VaultFactory = await hre.ethers.getContractFactory("VaultFactory");
  const vaultFactory = await VaultFactory.deploy(blackHole.address);

  await vaultFactory.deployed();

  console.log("VaultFactory Contract deployed to: ", vaultFactory.address);
  console.log("Contract Deployment Ended");

  console.log("Set Fee Reciever Address");
  const [deployer] = await hre.ethers.getSigners()
  await vaultFactory.setFeeRecieverAddress(deployer.address);
  console.log("Fee Reciever Address Seted");

  const ERC20WithMint = await hre.ethers.getContractFactory("ERC20WithMint");

  console.log("Deploy Project Token");
  const projectToken = await ERC20WithMint.deploy();
  await projectToken.deployed();
  console.log("Project Token Deployed", projectToken.address);

  console.log("Create Project Vault");
  await vaultFactory.createNewVault(projectToken.address, true);

  try {
    await blackHole.deployTransaction.wait(WAIT_BLOCK_CONFIRMATIONS);
    await hre.run(`verify:verify`, {
      address: blackHole.address,
      constructorArguments: [],
    });
  } catch (e) {
    console.log(e);
  }

  try {
    await vaultFactory.deployTransaction.wait(WAIT_BLOCK_CONFIRMATIONS);
    await hre.run(`verify:verify`, {
      address: vaultFactory.address,
      constructorArguments: [blackHole.address],
    });
  } catch (e) {
    console.log(e);
  }

  try {
    await projectToken.deployTransaction.wait(WAIT_BLOCK_CONFIRMATIONS);
    await hre.run(`verify:verify`, {
      address: projectToken.address,
      constructorArguments: [],
    });
  } catch (e) {
    console.log(e);
  }

  const vaultAddress = (await vaultFactory.listManagedVaults(0, 1))[0];
  await vaultFactory.setProjectVaultAddress(vaultAddress);

  try {
    console.log("Project Vault Created", vaultAddress);
    await hre.run(`verify:verify`, {
      address: vaultAddress,
      constructorArguments: [
        projectToken.address,
        vaultFactory.address,
      ],
    });
  } catch (e) {
    console.log(e);
  }

  return null;
});
