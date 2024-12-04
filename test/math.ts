import { ethers } from "hardhat";
import { expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { TestMath } from "../typechain";
import { BigNumber } from "ethers";
import { assert } from "console";

describe("VaultFactory", function () {
  let creator: SignerWithAddress;
  let testMath: TestMath;

  beforeEach(async function () {
    [creator] = await ethers.getSigners();

    // create black hole
    const TestMath = await ethers.getContractFactory("TestMath");
    testMath = (await TestMath.connect(creator).deploy()) as TestMath;
  });

  async function CheckValues(
    tokenAmount: BigNumber,
    totalSupplyChange: BigNumber,
    totalSupplyBeforeBurning: BigNumber,
    tokenDecimals: BigNumber,
    primaryTokenDecimals: BigNumber,
  ) {
    const myValue = await testMath.myCalculateWithdrawalAmount(tokenAmount, totalSupplyChange, totalSupplyBeforeBurning);
    const newValue = await testMath.newCalculateWithdrawalAmount(tokenAmount, totalSupplyChange, totalSupplyBeforeBurning, tokenDecimals, primaryTokenDecimals);

    console.log(myValue, newValue);

    await assert(myValue.eq(newValue), JSON.stringify({ tokenAmount, totalSupplyChange, totalSupplyBeforeBurning, tokenDecimals, primaryTokenDecimals, myValue, newValue }));
  }

  function randomBN(max: BigNumber) {
    return BigNumber.from(ethers.utils.randomBytes(32)).mod(max);
  }


  async function CheckValuesRandom() {
    const tokenAmount = randomBN(BigNumber.from(10).pow(32));
    const totalSupplyBeforeBurning = randomBN(BigNumber.from(10).pow(32));
    const totalSupplyChange = randomBN(totalSupplyBeforeBurning);
    const tokenDecimals = BigNumber.from(18);
    const primaryTokenDecimals = BigNumber.from(18);
    await CheckValues(tokenAmount, totalSupplyChange, totalSupplyBeforeBurning, tokenDecimals, primaryTokenDecimals);
  }
  
  it.skip("check math random", async function () {
    const times = 1;

    const tests = [];
    for (let i = 0; i < times; i++) {
        tests.push(CheckValuesRandom());
    }

    await Promise.all(tests);
  });
});
