import { ethers } from "hardhat";
import { expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { VaultFactory, Vault, ERC20WithMint, BlackHole } from "../typechain";
import { ContractTransaction } from "ethers";
import { AllERC721, AllErc20, burnableErc721 } from "./tokens";

async function GetFee(tx: ContractTransaction) {
  const transactionReceipt = await ethers.provider.getTransactionReceipt(tx.hash);
  const gasUsed = transactionReceipt.gasUsed;
  const gasPricePaid = transactionReceipt.effectiveGasPrice;
  const transactionFee = gasUsed.mul(gasPricePaid);

  return transactionFee.toBigInt();
}

describe("Vault ERC721", function () {
  let factoryCreator: SignerWithAddress, primaryOwner: SignerWithAddress, erc20Owner: SignerWithAddress, user: SignerWithAddress;
  let feeReciever: SignerWithAddress;
  let blackHole: BlackHole;
  let vaultFactory: VaultFactory;
  let projectVault: Vault;

  beforeEach(async function () {
    [factoryCreator, primaryOwner, erc20Owner, user, feeReciever] = await ethers.getSigners();

    // create black hole
    const BlackHole = await ethers.getContractFactory("BlackHole");
    blackHole = (await BlackHole.connect(factoryCreator).deploy()) as BlackHole;

    // create factory
    const VaultFactory = await ethers.getContractFactory("VaultFactory");
    vaultFactory = (await VaultFactory.connect(factoryCreator).deploy(blackHole.address)) as VaultFactory;
    vaultFactory.setFeeRecieverAddress(feeReciever.address);

    // erc20WithMint contract
    const ERC20WithMint = await ethers.getContractFactory("ERC20WithMint");

    // create project token (our token)
    const projectToken = (await ERC20WithMint.connect(factoryCreator).deploy()) as ERC20WithMint;
    await projectToken.connect(factoryCreator).mint(100);

    // create project vault (out vault)
    await vaultFactory.connect(factoryCreator).createNewVault(projectToken.address, true);
    const projectVaultAddress = (await vaultFactory.listManagedVaults(0, 1))[0];
    projectVault = await ethers.getContractAt("Vault", projectVaultAddress);
    await projectVault.attach(projectVaultAddress);
    await vaultFactory.setProjectVaultAddress(projectVaultAddress);    
  });

  async function TestCorectnessEthReward(primaryToken: string) {
    // create primary token
    const ERC721Primary = await ethers.getContractFactory(primaryToken);
    const erc721Primary = await ERC721Primary.connect(primaryOwner).deploy();
    await erc721Primary.connect(primaryOwner).mint(10);
    
    // create vault
    await vaultFactory.connect(factoryCreator).createNewVault(erc721Primary.address, burnableErc721.includes(primaryToken));
    const vaultAddress = (await vaultFactory.listManagedVaults(0, 2))[1];
    const vault = await ethers.getContractAt("Vault", vaultAddress);
    await vault.attach(vaultAddress);
    expect(await vault.factoryContractAddress()).to.equal(vaultFactory.address);

    // transfer primary tokens to user
    for (let i = 0; i < 5; i++) {
        await erc721Primary.connect(primaryOwner).transferFrom(primaryOwner.address, user.address, i);
    }

    // user approve primary tokens
    await erc721Primary.connect(user).setApprovalForAll(vaultAddress, 1);

    // deposit 1 eth into vault
    await factoryCreator.sendTransaction({
      to: vaultAddress,
      value: ethers.utils.parseEther("1.0"),
    });

    const userBalanceBefore = await user.getBalance();
    const feeRecieverBalanceBefore = await feeReciever.getBalance();

    // withdraw from vault
    const tx = await vault.connect(user).withdrawETHByERC721([0, 1, 2, 3, 4], user.address);

    expect(await erc721Primary.balanceOf(user.address)).to.equal(0);
    expect(await erc721Primary.balanceOf(vaultAddress)).to.equal(0);
    expect(await erc721Primary.balanceOf(projectVault.address)).to.equal(0);
    
    const userNewBalance = await user.getBalance();
    expect(userNewBalance.toBigInt() - userBalanceBefore.toBigInt()).to.equal(ethers.utils.parseEther("0.495").toBigInt() - await GetFee(tx)); // 0.5 eth - 1% = 0.495 eth

    // total fee is 0.005 eth
    expect(await ethers.provider.getBalance(projectVault.address)).to.equal(ethers.utils.parseEther("0.0015").toBigInt()); // 30% from 0.005 eth = 0.0015 eth

    const feeRecieverNewBalance = await feeReciever.getBalance();
    expect(feeRecieverNewBalance.toBigInt() - feeRecieverBalanceBefore.toBigInt()).to.equal(ethers.utils.parseEther("0.0035").toBigInt()); // 70% from 0.005 eth = 0.0035 eth
  }

  for (let primaryToken of AllERC721) {
    it(`vault withdraw ETH primary = ${primaryToken}(ERC721)`, async function () {
        await TestCorectnessEthReward(primaryToken);
    });
  }

  async function TestCorectnessErc20Reward(primaryToken: string, rewardToken: string) {
    // create primary token
    const ERC721Primary = await ethers.getContractFactory(primaryToken);
    const erc721Primary = await ERC721Primary.connect(primaryOwner).deploy();
    await erc721Primary.connect(primaryOwner).mint(10);
    
    // create vault
    await vaultFactory.connect(factoryCreator).createNewVault(erc721Primary.address, burnableErc721.includes(primaryToken));
    const vaultAddress = (await vaultFactory.listManagedVaults(0, 2))[1];
    const vault = await ethers.getContractAt("Vault", vaultAddress);
    await vault.attach(vaultAddress);
    expect(await vault.factoryContractAddress()).to.equal(vaultFactory.address);

    // transfer primary tokens to user
    for (let i = 0; i < 5; i++) {
        await erc721Primary.connect(primaryOwner).transferFrom(primaryOwner.address, user.address, i);
    }

    // user approve 50 primary tokens
    await erc721Primary.connect(user).setApprovalForAll(vaultAddress, 1);

    // create reward token
    const ERC20Reward = await ethers.getContractFactory(rewardToken);
    const erc20Reward = (await ERC20Reward.connect(erc20Owner).deploy()) as ERC20WithMint;
    await erc20Reward.connect(erc20Owner).mint(ethers.utils.parseEther("100"));

    // deposit erc20 reward into vault
    await erc20Reward.connect(erc20Owner).transfer(vaultAddress, ethers.utils.parseEther("1.0"));

    // withdraw from vault
    await vault.connect(user).withdrawERC20ByERC721(erc20Reward.address, [0, 1, 2, 3, 4], user.address);

    expect(await erc721Primary.balanceOf(user.address)).to.equal(0);
    expect(await erc721Primary.balanceOf(vaultAddress)).to.equal(0);
    expect(await erc721Primary.balanceOf(projectVault.address)).to.equal(0);
    expect(await erc721Primary.balanceOf(feeReciever.address)).to.equal(0);

    if (burnableErc721.includes(primaryToken)) {
      expect(await erc721Primary.totalSupply()).to.equal(5);
    } else {
      expect(await erc721Primary.balanceOf(blackHole.address)).to.equal(5);
    }
    
    expect(await erc20Reward.balanceOf(user.address)).to.equal(ethers.utils.parseEther("0.495"));  // 0.5 token - 1% = 0.495 token
    expect(await erc20Reward.balanceOf(vaultAddress)).to.equal(ethers.utils.parseEther("0.5"));
    expect(await erc20Reward.balanceOf(projectVault.address)).to.equal(ethers.utils.parseEther("0.0015"));
    expect(await erc20Reward.balanceOf(feeReciever.address)).to.equal(ethers.utils.parseEther("0.0035"));
    expect(await erc20Reward.balanceOf(blackHole.address)).to.equal(0);
  }

  for (let primaryToken of AllERC721) {
    for (let rewardToken of AllErc20) {
      it(`vault withdraw primary = ${primaryToken}(ERC721) rewardToken = ${rewardToken}(ERC20)`, async function () {
        await TestCorectnessErc20Reward(primaryToken, rewardToken);
      });
    }
  }
});
