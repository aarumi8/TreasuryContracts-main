/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  ERC721Receiver,
  ERC721ReceiverInterface,
} from "../ERC721Receiver";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC721Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class ERC721Receiver__factory {
  static readonly abi = _abi;
  static createInterface(): ERC721ReceiverInterface {
    return new utils.Interface(_abi) as ERC721ReceiverInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC721Receiver {
    return new Contract(address, _abi, signerOrProvider) as ERC721Receiver;
  }
}
