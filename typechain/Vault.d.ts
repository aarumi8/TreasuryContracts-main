/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface VaultInterface extends ethers.utils.Interface {
  functions: {
    "factoryContractAddress()": FunctionFragment;
    "isBurnable()": FunctionFragment;
    "primaryToken()": FunctionFragment;
    "withdrawERC20ByERC20(address,uint256,address)": FunctionFragment;
    "withdrawERC20ByERC721(address,uint256[],address)": FunctionFragment;
    "withdrawETHByERC20(uint256,address)": FunctionFragment;
    "withdrawETHByERC721(uint256[],address)": FunctionFragment;
    "withdrawMultipleTokensByERC20(address[],uint256,address)": FunctionFragment;
    "withdrawMultipleTokensByERC721(address[],uint256[],address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "factoryContractAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isBurnable",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "primaryToken",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawERC20ByERC20",
    values: [string, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawERC20ByERC721",
    values: [string, BigNumberish[], string]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawETHByERC20",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawETHByERC721",
    values: [BigNumberish[], string]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawMultipleTokensByERC20",
    values: [string[], BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawMultipleTokensByERC721",
    values: [string[], BigNumberish[], string]
  ): string;

  decodeFunctionResult(
    functionFragment: "factoryContractAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "isBurnable", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "primaryToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawERC20ByERC20",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawERC20ByERC721",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawETHByERC20",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawETHByERC721",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawMultipleTokensByERC20",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawMultipleTokensByERC721",
    data: BytesLike
  ): Result;

  events: {};
}

export class Vault extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: VaultInterface;

  functions: {
    factoryContractAddress(overrides?: CallOverrides): Promise<[string]>;

    isBurnable(overrides?: CallOverrides): Promise<[boolean]>;

    primaryToken(overrides?: CallOverrides): Promise<[string]>;

    withdrawERC20ByERC20(
      token: string,
      primaryTokenAmount: BigNumberish,
      recipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdrawERC20ByERC721(
      token: string,
      primaryTokenIds: BigNumberish[],
      recipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdrawETHByERC20(
      primaryTokenAmount: BigNumberish,
      recipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdrawETHByERC721(
      primaryTokenIds: BigNumberish[],
      recipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdrawMultipleTokensByERC20(
      tokens: string[],
      primaryTokenAmount: BigNumberish,
      recipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdrawMultipleTokensByERC721(
      tokens: string[],
      primaryTokenIds: BigNumberish[],
      recipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  factoryContractAddress(overrides?: CallOverrides): Promise<string>;

  isBurnable(overrides?: CallOverrides): Promise<boolean>;

  primaryToken(overrides?: CallOverrides): Promise<string>;

  withdrawERC20ByERC20(
    token: string,
    primaryTokenAmount: BigNumberish,
    recipient: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdrawERC20ByERC721(
    token: string,
    primaryTokenIds: BigNumberish[],
    recipient: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdrawETHByERC20(
    primaryTokenAmount: BigNumberish,
    recipient: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdrawETHByERC721(
    primaryTokenIds: BigNumberish[],
    recipient: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdrawMultipleTokensByERC20(
    tokens: string[],
    primaryTokenAmount: BigNumberish,
    recipient: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdrawMultipleTokensByERC721(
    tokens: string[],
    primaryTokenIds: BigNumberish[],
    recipient: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    factoryContractAddress(overrides?: CallOverrides): Promise<string>;

    isBurnable(overrides?: CallOverrides): Promise<boolean>;

    primaryToken(overrides?: CallOverrides): Promise<string>;

    withdrawERC20ByERC20(
      token: string,
      primaryTokenAmount: BigNumberish,
      recipient: string,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawERC20ByERC721(
      token: string,
      primaryTokenIds: BigNumberish[],
      recipient: string,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawETHByERC20(
      primaryTokenAmount: BigNumberish,
      recipient: string,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawETHByERC721(
      primaryTokenIds: BigNumberish[],
      recipient: string,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawMultipleTokensByERC20(
      tokens: string[],
      primaryTokenAmount: BigNumberish,
      recipient: string,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawMultipleTokensByERC721(
      tokens: string[],
      primaryTokenIds: BigNumberish[],
      recipient: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    factoryContractAddress(overrides?: CallOverrides): Promise<BigNumber>;

    isBurnable(overrides?: CallOverrides): Promise<BigNumber>;

    primaryToken(overrides?: CallOverrides): Promise<BigNumber>;

    withdrawERC20ByERC20(
      token: string,
      primaryTokenAmount: BigNumberish,
      recipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdrawERC20ByERC721(
      token: string,
      primaryTokenIds: BigNumberish[],
      recipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdrawETHByERC20(
      primaryTokenAmount: BigNumberish,
      recipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdrawETHByERC721(
      primaryTokenIds: BigNumberish[],
      recipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdrawMultipleTokensByERC20(
      tokens: string[],
      primaryTokenAmount: BigNumberish,
      recipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdrawMultipleTokensByERC721(
      tokens: string[],
      primaryTokenIds: BigNumberish[],
      recipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    factoryContractAddress(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isBurnable(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    primaryToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    withdrawERC20ByERC20(
      token: string,
      primaryTokenAmount: BigNumberish,
      recipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdrawERC20ByERC721(
      token: string,
      primaryTokenIds: BigNumberish[],
      recipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdrawETHByERC20(
      primaryTokenAmount: BigNumberish,
      recipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdrawETHByERC721(
      primaryTokenIds: BigNumberish[],
      recipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdrawMultipleTokensByERC20(
      tokens: string[],
      primaryTokenAmount: BigNumberish,
      recipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdrawMultipleTokensByERC721(
      tokens: string[],
      primaryTokenIds: BigNumberish[],
      recipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
