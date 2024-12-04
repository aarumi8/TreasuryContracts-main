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

interface ERC404U16Interface extends ethers.utils.Interface {
  functions: {
    "DOMAIN_SEPARATOR()": FunctionFragment;
    "ID_ENCODING_PREFIX()": FunctionFragment;
    "allowance(address,address)": FunctionFragment;
    "approve(address,uint256)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "decimals()": FunctionFragment;
    "erc20Approve(address,uint256)": FunctionFragment;
    "erc20BalanceOf(address)": FunctionFragment;
    "erc20TotalSupply()": FunctionFragment;
    "erc20TransferFrom(address,address,uint256)": FunctionFragment;
    "erc721Approve(address,uint256)": FunctionFragment;
    "erc721BalanceOf(address)": FunctionFragment;
    "erc721TotalSupply()": FunctionFragment;
    "erc721TransferExempt(address)": FunctionFragment;
    "erc721TransferFrom(address,address,uint256)": FunctionFragment;
    "getApproved(uint256)": FunctionFragment;
    "getERC721QueueLength()": FunctionFragment;
    "getERC721TokensInQueue(uint256,uint256)": FunctionFragment;
    "isApprovedForAll(address,address)": FunctionFragment;
    "minted()": FunctionFragment;
    "name()": FunctionFragment;
    "nonces(address)": FunctionFragment;
    "owned(address)": FunctionFragment;
    "ownerOf(uint256)": FunctionFragment;
    "permit(address,address,uint256,uint256,uint8,bytes32,bytes32)": FunctionFragment;
    "safeTransferFrom(address,address,uint256)": FunctionFragment;
    "setApprovalForAll(address,bool)": FunctionFragment;
    "setSelfERC721TransferExempt(bool)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "symbol()": FunctionFragment;
    "tokenURI(uint256)": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "transfer(address,uint256)": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
    "units()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "DOMAIN_SEPARATOR",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "ID_ENCODING_PREFIX",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "allowance",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "erc20Approve",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "erc20BalanceOf",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "erc20TotalSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "erc20TransferFrom",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "erc721Approve",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "erc721BalanceOf",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "erc721TotalSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "erc721TransferExempt",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "erc721TransferFrom",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getApproved",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getERC721QueueLength",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getERC721TokensInQueue",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "isApprovedForAll",
    values: [string, string]
  ): string;
  encodeFunctionData(functionFragment: "minted", values?: undefined): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(functionFragment: "nonces", values: [string]): string;
  encodeFunctionData(functionFragment: "owned", values: [string]): string;
  encodeFunctionData(
    functionFragment: "ownerOf",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "permit",
    values: [
      string,
      string,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BytesLike,
      BytesLike
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "safeTransferFrom",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setApprovalForAll",
    values: [string, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "setSelfERC721TransferExempt",
    values: [boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "tokenURI",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "units", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "DOMAIN_SEPARATOR",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "ID_ENCODING_PREFIX",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "erc20Approve",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "erc20BalanceOf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "erc20TotalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "erc20TransferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "erc721Approve",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "erc721BalanceOf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "erc721TotalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "erc721TransferExempt",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "erc721TransferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getApproved",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getERC721QueueLength",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getERC721TokensInQueue",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isApprovedForAll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "minted", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nonces", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owned", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "ownerOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "permit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "safeTransferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setApprovalForAll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setSelfERC721TransferExempt",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "tokenURI", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "units", data: BytesLike): Result;

  events: {
    "Approval(address,address,uint256)": EventFragment;
    "ApprovalForAll(address,address,bool)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ApprovalForAll"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}

export type Approval_address_address_uint256_Event = TypedEvent<
  [string, string, BigNumber] & {
    owner: string;
    spender: string;
    value: BigNumber;
  }
>;

export type Approval_address_address_uint256_Event = TypedEvent<
  [string, string, BigNumber] & {
    owner: string;
    spender: string;
    id: BigNumber;
  }
>;

export type ApprovalForAllEvent = TypedEvent<
  [string, string, boolean] & {
    owner: string;
    operator: string;
    approved: boolean;
  }
>;

export type Transfer_address_address_uint256_Event = TypedEvent<
  [string, string, BigNumber] & { from: string; to: string; amount: BigNumber }
>;

export type Transfer_address_address_uint256_Event = TypedEvent<
  [string, string, BigNumber] & { from: string; to: string; id: BigNumber }
>;

export class ERC404U16 extends BaseContract {
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

  interface: ERC404U16Interface;

  functions: {
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<[string]>;

    ID_ENCODING_PREFIX(overrides?: CallOverrides): Promise<[BigNumber]>;

    allowance(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    approve(
      spender_: string,
      valueOrId_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    balanceOf(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    decimals(overrides?: CallOverrides): Promise<[number]>;

    erc20Approve(
      spender_: string,
      value_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    erc20BalanceOf(
      owner_: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    erc20TotalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    erc20TransferFrom(
      from_: string,
      to_: string,
      value_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    erc721Approve(
      spender_: string,
      id_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    erc721BalanceOf(
      owner_: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    erc721TotalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    erc721TransferExempt(
      target_: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    erc721TransferFrom(
      from_: string,
      to_: string,
      id_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getApproved(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getERC721QueueLength(overrides?: CallOverrides): Promise<[BigNumber]>;

    getERC721TokensInQueue(
      start_: BigNumberish,
      count_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    isApprovedForAll(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    minted(overrides?: CallOverrides): Promise<[BigNumber]>;

    name(overrides?: CallOverrides): Promise<[string]>;

    nonces(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    owned(owner_: string, overrides?: CallOverrides): Promise<[BigNumber[]]>;

    ownerOf(
      id_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string] & { erc721Owner: string }>;

    permit(
      owner_: string,
      spender_: string,
      value_: BigNumberish,
      deadline_: BigNumberish,
      v_: BigNumberish,
      r_: BytesLike,
      s_: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "safeTransferFrom(address,address,uint256)"(
      from_: string,
      to_: string,
      id_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "safeTransferFrom(address,address,uint256,bytes)"(
      from_: string,
      to_: string,
      id_: BigNumberish,
      data_: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setApprovalForAll(
      operator_: string,
      approved_: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setSelfERC721TransferExempt(
      state_: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    symbol(overrides?: CallOverrides): Promise<[string]>;

    tokenURI(id_: BigNumberish, overrides?: CallOverrides): Promise<[string]>;

    totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    transfer(
      to_: string,
      value_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferFrom(
      from_: string,
      to_: string,
      valueOrId_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    units(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<string>;

  ID_ENCODING_PREFIX(overrides?: CallOverrides): Promise<BigNumber>;

  allowance(
    arg0: string,
    arg1: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  approve(
    spender_: string,
    valueOrId_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  balanceOf(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  decimals(overrides?: CallOverrides): Promise<number>;

  erc20Approve(
    spender_: string,
    value_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  erc20BalanceOf(owner_: string, overrides?: CallOverrides): Promise<BigNumber>;

  erc20TotalSupply(overrides?: CallOverrides): Promise<BigNumber>;

  erc20TransferFrom(
    from_: string,
    to_: string,
    value_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  erc721Approve(
    spender_: string,
    id_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  erc721BalanceOf(
    owner_: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  erc721TotalSupply(overrides?: CallOverrides): Promise<BigNumber>;

  erc721TransferExempt(
    target_: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  erc721TransferFrom(
    from_: string,
    to_: string,
    id_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getApproved(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

  getERC721QueueLength(overrides?: CallOverrides): Promise<BigNumber>;

  getERC721TokensInQueue(
    start_: BigNumberish,
    count_: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  isApprovedForAll(
    arg0: string,
    arg1: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  minted(overrides?: CallOverrides): Promise<BigNumber>;

  name(overrides?: CallOverrides): Promise<string>;

  nonces(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  owned(owner_: string, overrides?: CallOverrides): Promise<BigNumber[]>;

  ownerOf(id_: BigNumberish, overrides?: CallOverrides): Promise<string>;

  permit(
    owner_: string,
    spender_: string,
    value_: BigNumberish,
    deadline_: BigNumberish,
    v_: BigNumberish,
    r_: BytesLike,
    s_: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "safeTransferFrom(address,address,uint256)"(
    from_: string,
    to_: string,
    id_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "safeTransferFrom(address,address,uint256,bytes)"(
    from_: string,
    to_: string,
    id_: BigNumberish,
    data_: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setApprovalForAll(
    operator_: string,
    approved_: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setSelfERC721TransferExempt(
    state_: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  symbol(overrides?: CallOverrides): Promise<string>;

  tokenURI(id_: BigNumberish, overrides?: CallOverrides): Promise<string>;

  totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

  transfer(
    to_: string,
    value_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferFrom(
    from_: string,
    to_: string,
    valueOrId_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  units(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<string>;

    ID_ENCODING_PREFIX(overrides?: CallOverrides): Promise<BigNumber>;

    allowance(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approve(
      spender_: string,
      valueOrId_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    balanceOf(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    decimals(overrides?: CallOverrides): Promise<number>;

    erc20Approve(
      spender_: string,
      value_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    erc20BalanceOf(
      owner_: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    erc20TotalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    erc20TransferFrom(
      from_: string,
      to_: string,
      value_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    erc721Approve(
      spender_: string,
      id_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    erc721BalanceOf(
      owner_: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    erc721TotalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    erc721TransferExempt(
      target_: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    erc721TransferFrom(
      from_: string,
      to_: string,
      id_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    getApproved(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

    getERC721QueueLength(overrides?: CallOverrides): Promise<BigNumber>;

    getERC721TokensInQueue(
      start_: BigNumberish,
      count_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    isApprovedForAll(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    minted(overrides?: CallOverrides): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<string>;

    nonces(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    owned(owner_: string, overrides?: CallOverrides): Promise<BigNumber[]>;

    ownerOf(id_: BigNumberish, overrides?: CallOverrides): Promise<string>;

    permit(
      owner_: string,
      spender_: string,
      value_: BigNumberish,
      deadline_: BigNumberish,
      v_: BigNumberish,
      r_: BytesLike,
      s_: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    "safeTransferFrom(address,address,uint256)"(
      from_: string,
      to_: string,
      id_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "safeTransferFrom(address,address,uint256,bytes)"(
      from_: string,
      to_: string,
      id_: BigNumberish,
      data_: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    setApprovalForAll(
      operator_: string,
      approved_: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    setSelfERC721TransferExempt(
      state_: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    symbol(overrides?: CallOverrides): Promise<string>;

    tokenURI(id_: BigNumberish, overrides?: CallOverrides): Promise<string>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    transfer(
      to_: string,
      value_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transferFrom(
      from_: string,
      to_: string,
      valueOrId_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    units(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    "Approval(address,address,uint256)"(
      owner?: string | null,
      spender?: string | null,
      value?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { owner: string; spender: string; value: BigNumber }
    >;

    "Approval(address,address,uint256)"(
      owner?: string | null,
      spender?: string | null,
      id?: BigNumberish | null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { owner: string; spender: string; id: BigNumber }
    >;

    "ApprovalForAll(address,address,bool)"(
      owner?: string | null,
      operator?: string | null,
      approved?: null
    ): TypedEventFilter<
      [string, string, boolean],
      { owner: string; operator: string; approved: boolean }
    >;

    ApprovalForAll(
      owner?: string | null,
      operator?: string | null,
      approved?: null
    ): TypedEventFilter<
      [string, string, boolean],
      { owner: string; operator: string; approved: boolean }
    >;

    "Transfer(address,address,uint256)"(
      from?: string | null,
      to?: string | null,
      amount?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { from: string; to: string; amount: BigNumber }
    >;

    "Transfer(address,address,uint256)"(
      from?: string | null,
      to?: string | null,
      id?: BigNumberish | null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { from: string; to: string; id: BigNumber }
    >;
  };

  estimateGas: {
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<BigNumber>;

    ID_ENCODING_PREFIX(overrides?: CallOverrides): Promise<BigNumber>;

    allowance(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approve(
      spender_: string,
      valueOrId_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    balanceOf(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    decimals(overrides?: CallOverrides): Promise<BigNumber>;

    erc20Approve(
      spender_: string,
      value_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    erc20BalanceOf(
      owner_: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    erc20TotalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    erc20TransferFrom(
      from_: string,
      to_: string,
      value_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    erc721Approve(
      spender_: string,
      id_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    erc721BalanceOf(
      owner_: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    erc721TotalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    erc721TransferExempt(
      target_: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    erc721TransferFrom(
      from_: string,
      to_: string,
      id_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getApproved(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getERC721QueueLength(overrides?: CallOverrides): Promise<BigNumber>;

    getERC721TokensInQueue(
      start_: BigNumberish,
      count_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isApprovedForAll(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    minted(overrides?: CallOverrides): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<BigNumber>;

    nonces(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    owned(owner_: string, overrides?: CallOverrides): Promise<BigNumber>;

    ownerOf(id_: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    permit(
      owner_: string,
      spender_: string,
      value_: BigNumberish,
      deadline_: BigNumberish,
      v_: BigNumberish,
      r_: BytesLike,
      s_: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "safeTransferFrom(address,address,uint256)"(
      from_: string,
      to_: string,
      id_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "safeTransferFrom(address,address,uint256,bytes)"(
      from_: string,
      to_: string,
      id_: BigNumberish,
      data_: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setApprovalForAll(
      operator_: string,
      approved_: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setSelfERC721TransferExempt(
      state_: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    symbol(overrides?: CallOverrides): Promise<BigNumber>;

    tokenURI(id_: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    transfer(
      to_: string,
      value_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferFrom(
      from_: string,
      to_: string,
      valueOrId_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    units(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ID_ENCODING_PREFIX(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    allowance(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    approve(
      spender_: string,
      valueOrId_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    balanceOf(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    decimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    erc20Approve(
      spender_: string,
      value_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    erc20BalanceOf(
      owner_: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    erc20TotalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    erc20TransferFrom(
      from_: string,
      to_: string,
      value_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    erc721Approve(
      spender_: string,
      id_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    erc721BalanceOf(
      owner_: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    erc721TotalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    erc721TransferExempt(
      target_: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    erc721TransferFrom(
      from_: string,
      to_: string,
      id_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getApproved(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getERC721QueueLength(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getERC721TokensInQueue(
      start_: BigNumberish,
      count_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isApprovedForAll(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    minted(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nonces(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owned(
      owner_: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    ownerOf(
      id_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    permit(
      owner_: string,
      spender_: string,
      value_: BigNumberish,
      deadline_: BigNumberish,
      v_: BigNumberish,
      r_: BytesLike,
      s_: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "safeTransferFrom(address,address,uint256)"(
      from_: string,
      to_: string,
      id_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "safeTransferFrom(address,address,uint256,bytes)"(
      from_: string,
      to_: string,
      id_: BigNumberish,
      data_: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setApprovalForAll(
      operator_: string,
      approved_: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setSelfERC721TransferExempt(
      state_: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    tokenURI(
      id_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transfer(
      to_: string,
      value_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferFrom(
      from_: string,
      to_: string,
      valueOrId_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    units(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
