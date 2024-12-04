import { ethers } from "hardhat";
import { expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { VaultFactory, Vault, ERC20WithMint, BlackHole, BurnableERC721 } from "../typechain";
import { ContractTransaction } from "ethers";

async function GetFee(tx: ContractTransaction) {
  const transactionReceipt = await ethers.provider.getTransactionReceipt(tx.hash);
  const gasUsed = transactionReceipt.gasUsed;
  const gasPricePaid = transactionReceipt.effectiveGasPrice;
  const transactionFee = gasUsed.mul(gasPricePaid);

  return transactionFee.toBigInt();
}

const ETH_ADDRESS = "0x0000000000000000000000000000000000000000";

describe("Vault ERC721 with multiple tokens", function () {
  let factoryCreator: SignerWithAddress, primaryOwner: SignerWithAddress, erc20Owner: SignerWithAddress, user: SignerWithAddress;
  let feeReciever: SignerWithAddress;
  let blackHole: BlackHole;
  let vaultFactory: VaultFactory;
  let projectVault: Vault;
  let vault: Vault;
  let erc721Primary: BurnableERC721;
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

    // erc20WithMint contract
    const BurnableERC721 = await ethers.getContractFactory("BurnableERC721");

    // create primary token
    erc721Primary = await BurnableERC721.connect(primaryOwner).deploy();
    await erc721Primary.connect(primaryOwner).mint(10);

    // create vault
    await vaultFactory.connect(factoryCreator).createNewVault(erc721Primary.address, true);
    const vaultAddress = (await vaultFactory.listManagedVaults(0, 2))[1];
    vault = await ethers.getContractAt("Vault", vaultAddress);
    await vault.attach(vaultAddress);
    expect(await vault.factoryContractAddress()).to.equal(vaultFactory.address);

    // transfer primary token to user
    for (let i = 0; i < 5; i++) {
        await erc721Primary.connect(primaryOwner).transferFrom(primaryOwner.address, user.address, i);
    }

    // user approve primary tokens
    await erc721Primary.connect(user).setApprovalForAll(vaultAddress, true);

    // deposit 1 eth into vault
    await factoryCreator.sendTransaction({
      to: vaultAddress,
      value: ethers.utils.parseEther("1.0"),
    });
    
    erc20RewardTokens = [];

    // create and deposit erc20 tokens
    for (let i = 0; i < 5; i++) {
        // create erc20 token
        const erc20Reward = await ERC20WithMint.connect(erc20Owner).deploy();
        await erc20Reward.connect(erc20Owner).mint(ethers.utils.parseEther("1.0"));

        // deposit erc20 reward into vault
        await erc20Reward.connect(erc20Owner).transfer(vaultAddress, ethers.utils.parseEther("1.0"));
        
        erc20RewardTokens.push(erc20Reward);
    }
  });

  it("empty tokens list should be reverted", async function() {
    await expect(vault.connect(user).withdrawMultipleTokensByERC721([], [0, 1, 2, 3, 4], user.address))
      .to
      .be
      .revertedWith("empty token list");;
  });

  it("not sorted tokens should be reverted", async function() {
    await expect(vault.connect(user).withdrawMultipleTokensByERC721([
        erc20RewardTokens[0].address, 
        erc20RewardTokens[1].address,
        erc20RewardTokens[3].address,
        erc20RewardTokens[2].address,
    ], [0, 1, 2, 3, 4], user.address))
      .to
      .be
      .revertedWith("tokens should be sorted and unique");;
  });

  it("repeated tokens should be reverted", async function() {
    await expect(vault.connect(user).withdrawMultipleTokensByERC721(
        [erc20RewardTokens[0].address, erc20RewardTokens[0].address], 
        [0, 1, 2, 3, 4], user.address
    ))
      .to
      .be
      .revertedWith("tokens should be sorted and unique");;
  });

  it("withdraw only eth", async function() {
    const userBalanceBefore = await user.getBalance();
    const feeRecieverBalanceBefore = await feeReciever.getBalance();

    // withdraw from vault
    const tx = await vault.connect(user).withdrawMultipleTokensByERC721([ETH_ADDRESS], [0, 1, 2, 3, 4], user.address);

    expect(await erc721Primary.balanceOf(user.address)).to.equal(0);
    expect(await erc721Primary.balanceOf(vault.address)).to.equal(0);
    expect(await erc721Primary.balanceOf(projectVault.address)).to.equal(0);

    expect(await ethers.provider.getBalance(vault.address)).to.equal(ethers.utils.parseEther("0.5"));
    
    const userNewBalance = await user.getBalance();
    expect(userNewBalance.toBigInt() - userBalanceBefore.toBigInt()).to.equal(ethers.utils.parseEther("0.495").toBigInt() - await GetFee(tx)); // 0.5 eth - 1% = 0.495 eth
    // total fee is 0.005 eth
    expect(await ethers.provider.getBalance(projectVault.address)).to.equal(ethers.utils.parseEther("0.0015").toBigInt()); // 30% from 0.005 eth = 0.0015 eth
    const feeRecieverNewBalance = await feeReciever.getBalance();
    expect(feeRecieverNewBalance.toBigInt() - feeRecieverBalanceBefore.toBigInt()).to.equal(ethers.utils.parseEther("0.0035").toBigInt()); // 70% from 0.005 eth = 0.0035 eth

    // vault withdraw only eth
    for (let i = 0; i < 5; i++) {
        expect(await erc20RewardTokens[i].balanceOf(vault.address)).to.equal(ethers.utils.parseEther("1.0"));
    }
  });

  it("withdraw two erc20", async function() {
    // withdraw from vault
    await vault.connect(user).withdrawMultipleTokensByERC721([erc20RewardTokens[0].address, erc20RewardTokens[1].address].sort(), [0, 1, 2, 3, 4], user.address);

    expect(await erc721Primary.balanceOf(user.address)).to.equal(0);
    expect(await erc721Primary.balanceOf(vault.address)).to.equal(0);
    expect(await erc721Primary.balanceOf(projectVault.address)).to.equal(0);
    expect(await erc721Primary.totalSupply()).to.equal(5);
    
    // not withdraw eth
    expect(await ethers.provider.getBalance(vault.address)).to.equal(ethers.utils.parseEther("1.0"));

    // vault withdraw erc20 in list
    for (let i = 0; i < 2; i++) {
        expect(await erc20RewardTokens[i].balanceOf(vault.address)).to.equal(ethers.utils.parseEther("0.5"));
        
        expect(await erc20RewardTokens[i].balanceOf(user.address)).to.equal(ethers.utils.parseEther("0.495"));
        expect(await erc20RewardTokens[i].balanceOf(vault.address)).to.equal(ethers.utils.parseEther("0.5"));
        expect(await erc20RewardTokens[i].balanceOf(projectVault.address)).to.equal(ethers.utils.parseEther("0.0015"));
        expect(await erc20RewardTokens[i].balanceOf(feeReciever.address)).to.equal(ethers.utils.parseEther("0.0035"));
        expect(await erc20RewardTokens[i].balanceOf(blackHole.address)).to.equal(0);
    }

    // vault don not withdraw other erc20
    for (let i = 3; i < 5; i++) {
        expect(await erc20RewardTokens[i].balanceOf(vault.address)).to.equal(ethers.utils.parseEther("1.0"));

        expect(await erc20RewardTokens[i].balanceOf(user.address)).to.equal(0);
        expect(await erc20RewardTokens[i].balanceOf(projectVault.address)).to.equal(0);
        expect(await erc20RewardTokens[i].balanceOf(feeReciever.address)).to.equal(0);
        expect(await erc20RewardTokens[i].balanceOf(blackHole.address)).to.equal(0);
    }
  });

  it("withdraw two erc20 and eth", async function() {
    const userBalanceBefore = await user.getBalance();
    const feeRecieverBalanceBefore = await feeReciever.getBalance();

    // withdraw from vault
    const tx = await vault.connect(user).withdrawMultipleTokensByERC721(
        [erc20RewardTokens[0].address, erc20RewardTokens[1].address, ETH_ADDRESS].sort(), 
        [0, 1, 2, 3, 4],
        user.address
    );

    expect(await erc721Primary.balanceOf(user.address)).to.equal(0);
    expect(await erc721Primary.balanceOf(vault.address)).to.equal(0);
    expect(await erc721Primary.balanceOf(projectVault.address)).to.equal(0);
    expect(await erc721Primary.totalSupply()).to.equal(5);
    
    expect(await ethers.provider.getBalance(vault.address)).to.equal(ethers.utils.parseEther("0.5"));
    
    const userNewBalance = await user.getBalance();
    expect(userNewBalance.toBigInt() - userBalanceBefore.toBigInt()).to.equal(ethers.utils.parseEther("0.495").toBigInt() - await GetFee(tx));
    expect(await ethers.provider.getBalance(projectVault.address)).to.equal(ethers.utils.parseEther("0.0015").toBigInt());
    const feeRecieverNewBalance = await feeReciever.getBalance();
    expect(feeRecieverNewBalance.toBigInt() - feeRecieverBalanceBefore.toBigInt()).to.equal(ethers.utils.parseEther("0.0035").toBigInt());

    // vault withdraw erc20 in list
    for (let i = 0; i < 2; i++) {
        expect(await erc20RewardTokens[i].balanceOf(vault.address)).to.equal(ethers.utils.parseEther("0.5"));
        
        expect(await erc20RewardTokens[i].balanceOf(user.address)).to.equal(ethers.utils.parseEther("0.495"));
        expect(await erc20RewardTokens[i].balanceOf(vault.address)).to.equal(ethers.utils.parseEther("0.5"));
        expect(await erc20RewardTokens[i].balanceOf(projectVault.address)).to.equal(ethers.utils.parseEther("0.0015"));
        expect(await erc20RewardTokens[i].balanceOf(feeReciever.address)).to.equal(ethers.utils.parseEther("0.0035"));
        expect(await erc20RewardTokens[i].balanceOf(blackHole.address)).to.equal(0);
    }

    // vault don not withdraw other erc20
    for (let i = 3; i < 5; i++) {
        expect(await erc20RewardTokens[i].balanceOf(vault.address)).to.equal(ethers.utils.parseEther("1.0"));
        
        expect(await erc20RewardTokens[i].balanceOf(user.address)).to.equal(0);
        expect(await erc20RewardTokens[i].balanceOf(projectVault.address)).to.equal(0);
        expect(await erc20RewardTokens[i].balanceOf(feeReciever.address)).to.equal(0);
        expect(await erc20RewardTokens[i].balanceOf(blackHole.address)).to.equal(0);
    }
  });
});
