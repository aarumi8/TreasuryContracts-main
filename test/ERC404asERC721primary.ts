import { ethers } from "hardhat";
import { expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { VaultFactory, Vault, ERC20WithMint, BlackHole, ERC404Example } from "../typechain";
import { BigNumber, ContractTransaction } from "ethers";
import { AllErc20 } from "./tokens";

async function GetFee(tx: ContractTransaction) {
  const transactionReceipt = await ethers.provider.getTransactionReceipt(tx.hash);
  const gasUsed = transactionReceipt.gasUsed;
  const gasPricePaid = transactionReceipt.effectiveGasPrice;
  const transactionFee = gasUsed.mul(gasPricePaid);

  return transactionFee.toBigInt();
}

const ETH_ADDRESS = "0x0000000000000000000000000000000000000000";

describe("Vault ERC404 as ERC721", function () {
  let factoryCreator: SignerWithAddress, primaryOwner: SignerWithAddress, erc20Owner: SignerWithAddress, user: SignerWithAddress;
  let feeReciever: SignerWithAddress;
  let blackHole: BlackHole;
  let vaultFactory: VaultFactory;
  let projectVault: Vault;
  let vault: Vault;
  let erc404Primary: ERC404Example;
  let erc20RewardTokens: Array<ERC20WithMint>;

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

    // create project vault (our vault)
    await vaultFactory.connect(factoryCreator).createNewVault(projectToken.address, true);
    const projectVaultAddress = (await vaultFactory.listManagedVaults(0, 1))[0];
    projectVault = await ethers.getContractAt("Vault", projectVaultAddress);
    await projectVault.attach(projectVaultAddress);
    await vaultFactory.setProjectVaultAddress(projectVaultAddress);
  });

  async function TestCorectnessEthReward() {
    // erc20WithMint contract
    const ERC404 = await ethers.getContractFactory("ERC404Example");

    // create primary token
    erc404Primary = await ERC404.connect(primaryOwner).deploy();
    await erc404Primary.connect(primaryOwner).mint(ethers.utils.parseEther("10.0"));

    // create vault
    await vaultFactory.connect(factoryCreator).createNewVault(erc404Primary.address, false);
    const vaultAddress = (await vaultFactory.listManagedVaults(0, 2))[1];
    vault = await ethers.getContractAt("Vault", vaultAddress);
    await vault.attach(vaultAddress);
    expect(await vault.factoryContractAddress()).to.equal(vaultFactory.address);

    // transfer primary token to user
    await erc404Primary.connect(primaryOwner).transfer(user.address, ethers.utils.parseEther("5.0"));

    // user approve primary tokens
    await erc404Primary.connect(user).setApprovalForAll(vaultAddress, true);

    // deposit 1 eth into vault
    await factoryCreator.sendTransaction({
      to: vaultAddress,
      value: ethers.utils.parseEther("1.0"),
    });

    const userBalanceBefore = await user.getBalance();
    const feeRecieverBalanceBefore = await feeReciever.getBalance();

    const prefix = await erc404Primary.ID_ENCODING_PREFIX();

    // withdraw from vault
    const tx = await vault.connect(user).withdrawETHByERC721([
      prefix.add(BigNumber.from("1")), 
      prefix.add(BigNumber.from("2")), 
      prefix.add(BigNumber.from("3")), 
      prefix.add(BigNumber.from("4")), 
      prefix.add(BigNumber.from("5")),
    ],  user.address);

    expect(await erc404Primary.balanceOf(user.address)).to.equal(0);
    expect(await erc404Primary.balanceOf(vaultAddress)).to.equal(0);
    expect(await erc404Primary.balanceOf(projectVault.address)).to.equal(0);
    
    const userNewBalance = await user.getBalance();
    expect(userNewBalance.toBigInt() - userBalanceBefore.toBigInt()).to.equal(ethers.utils.parseEther("0.495").toBigInt() - await GetFee(tx)); // 0.5 eth - 1% = 0.495 eth

    // total fee is 0.005 eth
    expect(await ethers.provider.getBalance(projectVault.address)).to.equal(ethers.utils.parseEther("0.0015").toBigInt()); // 30% from 0.005 eth = 0.0015 eth

    const feeRecieverNewBalance = await feeReciever.getBalance();
    expect(feeRecieverNewBalance.toBigInt() - feeRecieverBalanceBefore.toBigInt()).to.equal(ethers.utils.parseEther("0.0035").toBigInt()); // 70% from 0.005 eth = 0.0035 eth
  }

  it(`vault withdraw ETH primary = ERC404`, async function () {
      await TestCorectnessEthReward();
  });

  async function TestCorectnessErc20Reward(rewardToken: string) {
    // erc20WithMint contract
    const ERC404 = await ethers.getContractFactory("ERC404Example");

    // create primary token
    erc404Primary = await ERC404.connect(primaryOwner).deploy();
    await erc404Primary.connect(primaryOwner).mint(ethers.utils.parseEther("10.0"));

    // create vault
    await vaultFactory.connect(factoryCreator).createNewVault(erc404Primary.address, false);
    const vaultAddress = (await vaultFactory.listManagedVaults(0, 2))[1];
    vault = await ethers.getContractAt("Vault", vaultAddress);
    await vault.attach(vaultAddress);
    expect(await vault.factoryContractAddress()).to.equal(vaultFactory.address);

    // transfer primary token to user
    await erc404Primary.connect(primaryOwner).transfer(user.address, ethers.utils.parseEther("5.0"));

    // user approve primary tokens
    await erc404Primary.connect(user).setApprovalForAll(vaultAddress, true);

    // create reward token
    const ERC20Reward = await ethers.getContractFactory(rewardToken);
    const erc20Reward = (await ERC20Reward.connect(erc20Owner).deploy()) as ERC20WithMint;
    await erc20Reward.connect(erc20Owner).mint(ethers.utils.parseEther("100"));

    // deposit erc20 reward into vault
    await erc20Reward.connect(erc20Owner).transfer(vaultAddress, ethers.utils.parseEther("1.0"));

    // withdraw from vault

    const prefix = await erc404Primary.ID_ENCODING_PREFIX();

    await vault.connect(user).withdrawERC20ByERC721(erc20Reward.address, [
      prefix.add(BigNumber.from("1")), 
      prefix.add(BigNumber.from("2")), 
      prefix.add(BigNumber.from("3")),
      prefix.add(BigNumber.from("4")), 
      prefix.add(BigNumber.from("5"))
    ], user.address);

    expect(await erc404Primary.balanceOf(user.address)).to.equal(0);
    expect(await erc404Primary.balanceOf(vaultAddress)).to.equal(0);
    expect(await erc404Primary.balanceOf(projectVault.address)).to.equal(0);
    expect(await erc404Primary.balanceOf(feeReciever.address)).to.equal(0);

    expect(await erc404Primary.balanceOf(blackHole.address)).to.equal(ethers.utils.parseEther("5.0"));
    
    expect(await erc20Reward.balanceOf(user.address)).to.equal(ethers.utils.parseEther("0.495"));  // 0.5 token - 1% = 0.495 token
    expect(await erc20Reward.balanceOf(vaultAddress)).to.equal(ethers.utils.parseEther("0.5"));
    expect(await erc20Reward.balanceOf(projectVault.address)).to.equal(ethers.utils.parseEther("0.0015"));
    expect(await erc20Reward.balanceOf(feeReciever.address)).to.equal(ethers.utils.parseEther("0.0035"));
    expect(await erc20Reward.balanceOf(blackHole.address)).to.equal(0);
  }

  for (let rewardToken of AllErc20) {
    it(`vault withdraw primary = ERC404 rewardToken = ${rewardToken}(ERC20)`, async function () {
       await TestCorectnessErc20Reward(rewardToken);
    });
  }

  it("Send token id in ERC20 method", async function () {
    // erc20WithMint contract
    const ERC404 = await ethers.getContractFactory("ERC404Example");

    // create primary token
    erc404Primary = await ERC404.connect(primaryOwner).deploy();
    await erc404Primary.connect(primaryOwner).mint(ethers.utils.parseEther("2.0"));

    // create vault
    await vaultFactory.connect(factoryCreator).createNewVault(erc404Primary.address, false);
    const vaultAddress = (await vaultFactory.listManagedVaults(0, 2))[1];
    vault = await ethers.getContractAt("Vault", vaultAddress);
    await vault.attach(vaultAddress);
    expect(await vault.factoryContractAddress()).to.equal(vaultFactory.address);

    // transfer primary token to user
    await erc404Primary.connect(primaryOwner).transfer(user.address, ethers.utils.parseEther("1.0"));

    // user approve primary tokens
    await erc404Primary.connect(user).setApprovalForAll(vaultAddress, true);
    await erc404Primary.connect(user).approve(vaultAddress, ethers.utils.parseEther("1.0"));

    // deposit 1 eth into vault
    await factoryCreator.sendTransaction({
      to: vaultAddress,
      value: ethers.utils.parseEther("1.0"),
    });

    const userBalanceBefore = await user.getBalance();
    const feeRecieverBalanceBefore = await feeReciever.getBalance();

    const prefix = await erc404Primary.ID_ENCODING_PREFIX();

    // withdraw from vault
    const tx = await vault.connect(user).withdrawETHByERC20(prefix.add(BigNumber.from("1")), user.address);

    expect(await erc404Primary.balanceOf(user.address)).to.equal(0);
    expect(await erc404Primary.balanceOf(vaultAddress)).to.equal(0);
    expect(await erc404Primary.balanceOf(projectVault.address)).to.equal(0);
    
    const userNewBalance = await user.getBalance();
    expect(userNewBalance.toBigInt() - userBalanceBefore.toBigInt()).to.equal(ethers.utils.parseEther("0.495").toBigInt() - await GetFee(tx)); // 0.5 eth - 1% = 0.495 eth

    // total fee is 0.005 eth
    expect(await ethers.provider.getBalance(projectVault.address)).to.equal(ethers.utils.parseEther("0.0015").toBigInt()); // 30% from 0.005 eth = 0.0015 eth

    const feeRecieverNewBalance = await feeReciever.getBalance();
    expect(feeRecieverNewBalance.toBigInt() - feeRecieverBalanceBefore.toBigInt()).to.equal(ethers.utils.parseEther("0.0035").toBigInt()); // 70% from 0.005 eth = 0.0035 eth
  })
});
