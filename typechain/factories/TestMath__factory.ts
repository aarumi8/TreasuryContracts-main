/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TestMath, TestMathInterface } from "../TestMath";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalSupplyChange",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalSupplyBeforeBurning",
        type: "uint256",
      },
    ],
    name: "myCalculateWithdrawalAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalSupplyChange",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalSupplyBeforeBurning",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokenDecimals",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "primaryTokenDecimals",
        type: "uint256",
      },
    ],
    name: "newCalculateWithdrawalAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610382806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80637b3c6f8f1461003b578063c9b7563514610060575b600080fd5b61004e610049366004610141565b610073565b60405190815260200160405180910390f35b61004e61006e36600461016d565b610092565b60008161008084866101d7565b61008a91906101f4565b949350505050565b6000806100a084601261022f565b6100ab90600a610362565b6100b590886101d7565b905060006100c484601261022f565b6100cf90600a610362565b6100d990886101d7565b905060006100e885601261022f565b6100f390600a610362565b6100fd90886101d7565b905061010a86601261022f565b61011590600a610362565b8161012084866101d7565b61012a91906101f4565b61013491906101f4565b9998505050505050505050565b60008060006060848603121561015657600080fd5b505081359360208301359350604090920135919050565b600080600080600060a0868803121561018557600080fd5b505083359560208501359550604085013594606081013594506080013592509050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b80820281158282048414176101ee576101ee6101a8565b92915050565b60008261022a577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b500490565b818103818111156101ee576101ee6101a8565b600181815b8085111561029b57817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04821115610281576102816101a8565b8085161561028e57918102915b93841c9390800290610247565b509250929050565b6000826102b2575060016101ee565b816102bf575060006101ee565b81600181146102d557600281146102df576102fb565b60019150506101ee565b60ff8411156102f0576102f06101a8565b50506001821b6101ee565b5060208310610133831016604e8410600b841016171561031e575081810a6101ee565b6103288383610242565b807fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0482111561035a5761035a6101a8565b029392505050565b600061036e83836102a3565b939250505056fea164736f6c6343000814000a";

export class TestMath__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TestMath> {
    return super.deploy(overrides || {}) as Promise<TestMath>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): TestMath {
    return super.attach(address) as TestMath;
  }
  connect(signer: Signer): TestMath__factory {
    return super.connect(signer) as TestMath__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestMathInterface {
    return new utils.Interface(_abi) as TestMathInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestMath {
    return new Contract(address, _abi, signerOrProvider) as TestMath;
  }
}
