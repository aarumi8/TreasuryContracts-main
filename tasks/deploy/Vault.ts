import { task, types } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

task("TASK_DEPLOY_VAULT").setAction(async function (
  _taskArguments: TaskArguments,
  hre
) {
  console.log("Contract Deployment Started ");
  const Vault = await hre.ethers.getContractFactory("Vault");
  const erc20Address = "0x783f7D748604Da5A5Faa9e6b72477af0E4746a8c";
  const vaultFactoryAddress = "0xE1df0A0925Bf7Fba4970EDdE4B270298d51d8777";
  const vault = await Vault.deploy(erc20Address, true, vaultFactoryAddress);

  await vault.deployed();

  console.log("VaultFactory Contract deployed to: ", vault.address);
  console.log("Contract Deployment Ended");

  const WAIT_BLOCK_CONFIRMATIONS = 8;
  await vault.deployTransaction.wait(WAIT_BLOCK_CONFIRMATIONS);

  await hre.run(`verify:verify`, {
    address: vault.address,
    constructorArguments: [
        erc20Address,
        true,
        vaultFactoryAddress,
    ],
  });

  return null;
});
