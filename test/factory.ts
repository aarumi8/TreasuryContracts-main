import { ethers } from "hardhat";
import { expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { VaultFactory, ERC20WithMint, BlackHole } from "../typechain";
import { BigNumber } from "ethers";

describe("VaultFactory", function () {
  let factoryCreator: SignerWithAddress, primaryOwner: SignerWithAddress, erc20Owner: SignerWithAddress, user: SignerWithAddress;
  let feeReciever: SignerWithAddress;
  let blackHole: BlackHole;
  let vaultFactory: VaultFactory;

  beforeEach(async function () {
    [factoryCreator, primaryOwner, erc20Owner, user, feeReciever] = await ethers.getSigners();

    // create black hole
    const BlackHole = await ethers.getContractFactory("BlackHole");
    blackHole = (await BlackHole.connect(factoryCreator).deploy()) as BlackHole;

    // create factory
    const VaultFactory = await ethers.getContractFactory("VaultFactory");
    vaultFactory = (await VaultFactory.connect(factoryCreator).deploy(blackHole.address)) as VaultFactory;
    vaultFactory.setFeeRecieverAddress(feeReciever.address);

    const ERC20WithMint = await ethers.getContractFactory("ERC20WithMint");
    const erc20 = (await ERC20WithMint.connect(factoryCreator).deploy()) as ERC20WithMint;
    await erc20.connect(factoryCreator).mint(100);

    await expect(await vaultFactory.connect(factoryCreator).createNewVault(erc20.address, true))
      .to
      .emit(vaultFactory, "VaultCreated")
      .withArgs((await vaultFactory.listManagedVaults(0, 1))[0], erc20.address);

    const projectVaultAddress = (await vaultFactory.listManagedVaults(0, 1))[0];
    const vault = await ethers.getContractAt("Vault", projectVaultAddress);
    await vault.attach(projectVaultAddress);

    await vaultFactory.connect(factoryCreator).setProjectVaultAddress(projectVaultAddress);

    expect(await vaultFactory.getProjectVaultAddress()).to.equal(projectVaultAddress);
  });

  it("can create new vault", async function () {
    // create ERC20 token
    const ERC20WithMint = await ethers.getContractFactory("ERC20WithMint");
    const erc20 = (await ERC20WithMint.connect(user).deploy()) as ERC20WithMint;
    await erc20.connect(user).mint(100);

    expect(await vaultFactory.getNumberOfManagedVaults()).to.equal(1);

    // create project vault (out vault)
    await expect(await vaultFactory.connect(user).createNewVault(erc20.address, true))
      .to
      .emit(vaultFactory, "VaultCreated")
      .withArgs((await vaultFactory.listManagedVaults(1, 2))[0], erc20.address);

    expect(await vaultFactory.getNumberOfManagedVaults()).to.equal(2);

    const projectVaultAddress = (await vaultFactory.listManagedVaults(1, 2))[0];
    expect(await vaultFactory.primaryTokenToVault(erc20.address)).to.equal(projectVaultAddress);
    
    const vault = await ethers.getContractAt("Vault", projectVaultAddress);
    await vault.attach(projectVaultAddress);

    expect(await vault.primaryToken()).to.equal(erc20.address);
    expect(await vault.factoryContractAddress()).to.equal(vaultFactory.address);
  });

  it("correct black hole address", async function () {
    expect(await vaultFactory.getBlackHoleAddress()).to.equal(blackHole.address);
  });
  
  it("can't create vault without total supply", async function () {
    const ERC20Primary = await ethers.getContractFactory("ERC20WithoutTotalSupply");
    const erc20Primary = await ERC20Primary.connect(primaryOwner).deploy();

    await expect(vaultFactory.connect(factoryCreator).createNewVault(erc20Primary.address, true)).to.be.revertedWith("totalSupply does not exist");
  });

  it("getCurrentFeePercentage returns correct fee", async function () {
    expect(await vaultFactory.getCurrentFeePercentage()).to.eql([BigNumber.from(100), BigNumber.from(10000)]);
  });

  it("can update fee", async function () {
    await expect(await vaultFactory.connect(factoryCreator).updateFeePercentage(BigNumber.from(200), BigNumber.from(10000)))
      .to
      .emit(vaultFactory, "FeeUpdated")
      .withArgs(BigNumber.from(200), BigNumber.from(10000));

    expect(await vaultFactory.getCurrentFeePercentage()).to.eql([BigNumber.from(200), BigNumber.from(10000)]);
  });

  it("can't update fee greater than 2%", async function () {
    await expect(vaultFactory.connect(factoryCreator).updateFeePercentage(BigNumber.from(300), BigNumber.from(10000)))
      .to
      .be
      .revertedWith("fee exceeds maximum limit");
  });

  it("only owner can update fee", async function () {
    await expect(vaultFactory.connect(user).updateFeePercentage(BigNumber.from(300), BigNumber.from(10000)))
      .to
      .be
      .revertedWith("Ownable: caller is not the owner");
  });

  it("can update project vault fee", async function () {
    await expect(await vaultFactory.connect(factoryCreator).updateProjectVaultFeePercentage(BigNumber.from(4000), BigNumber.from(10000))) // 40%
      .to
      .emit(vaultFactory, "ProjectVaultFeeUpdated")
      .withArgs(BigNumber.from(4000), BigNumber.from(10000));

    expect(await vaultFactory.getCurrentProjectVaultFeePercentage()).to.eql([BigNumber.from(4000), BigNumber.from(10000)]);
  });

  it("can't update project vault fee less than 30%", async function () {
    await expect(vaultFactory.connect(factoryCreator).updateProjectVaultFeePercentage(BigNumber.from(2900), BigNumber.from(10000))) // 29%
      .to
      .be
      .revertedWith("fee exceeds minimum limit");
  });

  it("can't update project vault fee greater than 100%", async function () {
    await expect(vaultFactory.connect(factoryCreator).updateProjectVaultFeePercentage(BigNumber.from(10100), BigNumber.from(100))) // 101%
      .to
      .be
      .revertedWith("fee exceeds maximum limit");
  });
  
  it("only owner update project vault fee", async function () {
    await expect(vaultFactory.connect(user).updateFeePercentage(BigNumber.from(4000), BigNumber.from(10000)))
      .to
      .be
      .revertedWith("Ownable: caller is not the owner");
  });

  it("can update fee reciever address", async function () {
    expect(await vaultFactory.getFeeRecieverAddress()).to.equal(feeReciever.address);
    await vaultFactory.connect(factoryCreator).setFeeRecieverAddress(user.address);
    expect(await vaultFactory.getFeeRecieverAddress()).to.equal(user.address);
  });

  it("only owner can update fee reciever address", async function () {
    await expect(vaultFactory.connect(user).setFeeRecieverAddress(user.address))
      .to
      .be
      .revertedWith("Ownable: caller is not the owner");
  });

  it("can't update project vault address", async function () {
    await expect(vaultFactory.connect(factoryCreator).setProjectVaultAddress(user.address))
      .to
      .be
      .revertedWith("project Vault address already seted");
  });

  it.skip("can create plenty of vaults", async function () {
    const VAULTS_COUNT = 20000;
    const newVaultsAddresses = [];

    for (let i = 1; i <= VAULTS_COUNT; i++) {
      // create ERC20 token
      const ERC20WithMint = await ethers.getContractFactory("ERC20WithMint");
      const erc20 = (await ERC20WithMint.connect(user).deploy()) as ERC20WithMint;
      await erc20.connect(user).mint(100);

      expect(await vaultFactory.getNumberOfManagedVaults()).to.equal(i);

      // create project vault (out vault)
      await expect(await vaultFactory.connect(user).createNewVault(erc20.address, true))
        .to
        .emit(vaultFactory, "VaultCreated")
        .withArgs((await vaultFactory.listManagedVaults(i, i + 1))[0], erc20.address);

      expect(await vaultFactory.getNumberOfManagedVaults()).to.equal(i + 1);

      const projectVaultAddress = (await vaultFactory.listManagedVaults(i, i + 1))[0];
      expect(await vaultFactory.primaryTokenToVault(erc20.address)).to.equal(projectVaultAddress);
      
      newVaultsAddresses.push(projectVaultAddress);
      
      const vault = await ethers.getContractAt("Vault", projectVaultAddress);
      await vault.attach(projectVaultAddress);

      expect(await vault.primaryToken()).to.equal(erc20.address);
      expect(await vault.factoryContractAddress()).to.equal(vaultFactory.address);
    }

    expect(await vaultFactory.getNumberOfManagedVaults()).to.equal(VAULTS_COUNT + 1);
    await expect(vaultFactory.listManagedVaults(1, VAULTS_COUNT + 1)).to.be.reverted; // to many vaults to be requested
    expect(await vaultFactory.listManagedVaults(1 + VAULTS_COUNT / 2, 1 + VAULTS_COUNT / 2 + 100)).to.eql(newVaultsAddresses.slice(VAULTS_COUNT / 2, VAULTS_COUNT / 2 + 100)); // ok
  });
});
