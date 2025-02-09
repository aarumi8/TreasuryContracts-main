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

interface VaultFactoryInterface extends ethers.utils.Interface {
  functions: {
    "createNewVault(address,bool)": FunctionFragment;
    "getBlackHoleAddress()": FunctionFragment;
    "getCurrentFeePercentage()": FunctionFragment;
    "getCurrentProjectVaultFeePercentage()": FunctionFragment;
    "getFeeRecieverAddress()": FunctionFragment;
    "getNumberOfManagedVaults()": FunctionFragment;
    "getProjectVaultAddress()": FunctionFragment;
    "listManagedVaults(uint256,uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "primaryTokenToVault(address)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setFeeRecieverAddress(address)": FunctionFragment;
    "setProjectVaultAddress(address)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "updateFeePercentage(uint256,uint256)": FunctionFragment;
    "updateProjectVaultFeePercentage(uint256,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "createNewVault",
    values: [string, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "getBlackHoleAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getCurrentFeePercentage",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getCurrentProjectVaultFeePercentage",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getFeeRecieverAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getNumberOfManagedVaults",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getProjectVaultAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "listManagedVaults",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "primaryTokenToVault",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setFeeRecieverAddress",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setProjectVaultAddress",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "updateFeePercentage",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "updateProjectVaultFeePercentage",
    values: [BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "createNewVault",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getBlackHoleAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCurrentFeePercentage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCurrentProjectVaultFeePercentage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getFeeRecieverAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getNumberOfManagedVaults",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getProjectVaultAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "listManagedVaults",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "primaryTokenToVault",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setFeeRecieverAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setProjectVaultAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateFeePercentage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateProjectVaultFeePercentage",
    data: BytesLike
  ): Result;

  events: {
    "FeeUpdated(uint256,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "ProjectVaultFeeUpdated(uint256,uint256)": EventFragment;
    "VaultCreated(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "FeeUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ProjectVaultFeeUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "VaultCreated"): EventFragment;
}

export type FeeUpdatedEvent = TypedEvent<
  [BigNumber, BigNumber] & {
    updatedFeePercentage: BigNumber;
    feeBaseValue: BigNumber;
  }
>;

export type OwnershipTransferredEvent = TypedEvent<
  [string, string] & { previousOwner: string; newOwner: string }
>;

export type ProjectVaultFeeUpdatedEvent = TypedEvent<
  [BigNumber, BigNumber] & {
    updatedFeePercentage: BigNumber;
    feeBaseValue: BigNumber;
  }
>;

export type VaultCreatedEvent = TypedEvent<
  [string, string] & { newVaultAddress: string; tokenAddress: string }
>;

export class VaultFactory extends BaseContract {
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

  interface: VaultFactoryInterface;

  functions: {
    createNewVault(
      tokenAddress: string,
      isBurnableToken: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getBlackHoleAddress(overrides?: CallOverrides): Promise<[string]>;

    getCurrentFeePercentage(
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber]>;

    getCurrentProjectVaultFeePercentage(
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber]>;

    getFeeRecieverAddress(overrides?: CallOverrides): Promise<[string]>;

    getNumberOfManagedVaults(overrides?: CallOverrides): Promise<[BigNumber]>;

    getProjectVaultAddress(overrides?: CallOverrides): Promise<[string]>;

    listManagedVaults(
      from: BigNumberish,
      to: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string[]] & { vaultsAddresses: string[] }>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    primaryTokenToVault(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setFeeRecieverAddress(
      feeRecieverAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setProjectVaultAddress(
      vaultAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateFeePercentage(
      newFeePercentage: BigNumberish,
      newBase: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateProjectVaultFeePercentage(
      newFeePercentage: BigNumberish,
      newBase: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  createNewVault(
    tokenAddress: string,
    isBurnableToken: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getBlackHoleAddress(overrides?: CallOverrides): Promise<string>;

  getCurrentFeePercentage(
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber]>;

  getCurrentProjectVaultFeePercentage(
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber]>;

  getFeeRecieverAddress(overrides?: CallOverrides): Promise<string>;

  getNumberOfManagedVaults(overrides?: CallOverrides): Promise<BigNumber>;

  getProjectVaultAddress(overrides?: CallOverrides): Promise<string>;

  listManagedVaults(
    from: BigNumberish,
    to: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string[]>;

  owner(overrides?: CallOverrides): Promise<string>;

  primaryTokenToVault(arg0: string, overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setFeeRecieverAddress(
    feeRecieverAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setProjectVaultAddress(
    vaultAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateFeePercentage(
    newFeePercentage: BigNumberish,
    newBase: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateProjectVaultFeePercentage(
    newFeePercentage: BigNumberish,
    newBase: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    createNewVault(
      tokenAddress: string,
      isBurnableToken: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    getBlackHoleAddress(overrides?: CallOverrides): Promise<string>;

    getCurrentFeePercentage(
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber]>;

    getCurrentProjectVaultFeePercentage(
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber]>;

    getFeeRecieverAddress(overrides?: CallOverrides): Promise<string>;

    getNumberOfManagedVaults(overrides?: CallOverrides): Promise<BigNumber>;

    getProjectVaultAddress(overrides?: CallOverrides): Promise<string>;

    listManagedVaults(
      from: BigNumberish,
      to: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string[]>;

    owner(overrides?: CallOverrides): Promise<string>;

    primaryTokenToVault(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setFeeRecieverAddress(
      feeRecieverAddress: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setProjectVaultAddress(
      vaultAddress: string,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    updateFeePercentage(
      newFeePercentage: BigNumberish,
      newBase: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    updateProjectVaultFeePercentage(
      newFeePercentage: BigNumberish,
      newBase: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "FeeUpdated(uint256,uint256)"(
      updatedFeePercentage?: null,
      feeBaseValue?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber],
      { updatedFeePercentage: BigNumber; feeBaseValue: BigNumber }
    >;

    FeeUpdated(
      updatedFeePercentage?: null,
      feeBaseValue?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber],
      { updatedFeePercentage: BigNumber; feeBaseValue: BigNumber }
    >;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

    "ProjectVaultFeeUpdated(uint256,uint256)"(
      updatedFeePercentage?: null,
      feeBaseValue?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber],
      { updatedFeePercentage: BigNumber; feeBaseValue: BigNumber }
    >;

    ProjectVaultFeeUpdated(
      updatedFeePercentage?: null,
      feeBaseValue?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber],
      { updatedFeePercentage: BigNumber; feeBaseValue: BigNumber }
    >;

    "VaultCreated(address,address)"(
      newVaultAddress?: string | null,
      tokenAddress?: string | null
    ): TypedEventFilter<
      [string, string],
      { newVaultAddress: string; tokenAddress: string }
    >;

    VaultCreated(
      newVaultAddress?: string | null,
      tokenAddress?: string | null
    ): TypedEventFilter<
      [string, string],
      { newVaultAddress: string; tokenAddress: string }
    >;
  };

  estimateGas: {
    createNewVault(
      tokenAddress: string,
      isBurnableToken: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getBlackHoleAddress(overrides?: CallOverrides): Promise<BigNumber>;

    getCurrentFeePercentage(overrides?: CallOverrides): Promise<BigNumber>;

    getCurrentProjectVaultFeePercentage(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getFeeRecieverAddress(overrides?: CallOverrides): Promise<BigNumber>;

    getNumberOfManagedVaults(overrides?: CallOverrides): Promise<BigNumber>;

    getProjectVaultAddress(overrides?: CallOverrides): Promise<BigNumber>;

    listManagedVaults(
      from: BigNumberish,
      to: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    primaryTokenToVault(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setFeeRecieverAddress(
      feeRecieverAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setProjectVaultAddress(
      vaultAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateFeePercentage(
      newFeePercentage: BigNumberish,
      newBase: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateProjectVaultFeePercentage(
      newFeePercentage: BigNumberish,
      newBase: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    createNewVault(
      tokenAddress: string,
      isBurnableToken: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getBlackHoleAddress(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getCurrentFeePercentage(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getCurrentProjectVaultFeePercentage(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getFeeRecieverAddress(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getNumberOfManagedVaults(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getProjectVaultAddress(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    listManagedVaults(
      from: BigNumberish,
      to: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    primaryTokenToVault(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setFeeRecieverAddress(
      feeRecieverAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setProjectVaultAddress(
      vaultAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateFeePercentage(
      newFeePercentage: BigNumberish,
      newBase: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateProjectVaultFeePercentage(
      newFeePercentage: BigNumberish,
      newBase: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
