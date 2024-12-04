/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  PayableOverrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Vault, VaultInterface } from "../Vault";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "bool",
        name: "isBurnableToken",
        type: "bool",
      },
      {
        internalType: "address",
        name: "factoryAddress",
        type: "address",
      },
    ],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "factoryContractAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isBurnable",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "primaryToken",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "primaryTokenAmount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
    ],
    name: "withdrawERC20ByERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "primaryTokenIds",
        type: "uint256[]",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
    ],
    name: "withdrawERC20ByERC721",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "primaryTokenAmount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
    ],
    name: "withdrawETHByERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "primaryTokenIds",
        type: "uint256[]",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
    ],
    name: "withdrawETHByERC721",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "tokens",
        type: "address[]",
      },
      {
        internalType: "uint256",
        name: "primaryTokenAmount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
    ],
    name: "withdrawMultipleTokensByERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "tokens",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "primaryTokenIds",
        type: "uint256[]",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
    ],
    name: "withdrawMultipleTokensByERC721",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x60e060405260405162001e6438038062001e64833981016040819052620000269162000067565b60016000556001600160a01b0392831660805290911660a052151560c052620000b7565b80516001600160a01b03811681146200006257600080fd5b919050565b6000806000606084860312156200007d57600080fd5b62000088846200004a565b9250602084015180151581146200009e57600080fd5b9150620000ae604085016200004a565b90509250925092565b60805160a05160c051611cf86200016c600039600081816101b8015261099c01526000818161015a015281816107b801528181610c1501528181610d9101528181610fb201528181611045015281816110ee0152818161139c0152818161142f015261180c0152600081816101fc0152818161088d015281816108fc015281816109f101528181610a8a01528181610b6b01528181610cbb0152818161119f01528181611293015261154b0152611cf86000f3fe60806040526004361061009a5760003560e01c8063717fdb3411610069578063883356d91161004e578063883356d9146101a657806391ac094c146101ea578063eb01bbcd1461021e57600080fd5b8063717fdb3414610128578063732e0a1d1461014857600080fd5b80631d082d42146100a657806322bf2b12146100c857806341b98543146100e85780636f53c7ad1461010857600080fd5b366100a157005b600080fd5b3480156100b257600080fd5b506100c66100c1366004611924565b61023e565b005b3480156100d457600080fd5b506100c66100e3366004611983565b610275565b3480156100f457600080fd5b506100c66101033660046119c5565b6102aa565b34801561011457600080fd5b506100c6610123366004611a49565b6102e3565b34801561013457600080fd5b506100c6610143366004611a79565b610316565b34801561015457600080fd5b5061017c7f000000000000000000000000000000000000000000000000000000000000000081565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020015b60405180910390f35b3480156101b257600080fd5b506101da7f000000000000000000000000000000000000000000000000000000000000000081565b604051901515815260200161019d565b3480156101f657600080fd5b5061017c7f000000000000000000000000000000000000000000000000000000000000000081565b34801561022a57600080fd5b506100c6610239366004611ad6565b61033b565b61024661035f565b600080610252846103d7565b91509150610263868684848761040b565b505061026f6001600055565b50505050565b61027d61035f565b600080610289846103d7565b9150915061029985838386610632565b50506102a56001600055565b505050565b6102b261035f565b6000806102bf8585610706565b915091506102d0878784848761040b565b50506102dc6001600055565b5050505050565b6102eb61035f565b6000806102f7846103d7565b9150915061030682828561073d565b50506103126001600055565b5050565b61031e61035f565b60008061032b8585610706565b9150915061026386838386610632565b61034361035f565b6000806103508585610706565b9150915061029982828561073d565b6002600054036103d0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c0060448201526064015b60405180910390fd5b6002600055565b6000806103e26107b3565b90506103ed83610999565b60006103f76107b3565b90506104038183611b51565b925050915091565b83610472576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f656d70747920746f6b656e206c6973740000000000000000000000000000000060448201526064016103c7565b6000808686828161048557610485611b6a565b905060200201602081019061049a9190611b99565b73ffffffffffffffffffffffffffffffffffffffff16036104ce576104c084848461073d565b806104ca81611bb6565b9150505b6000815b86811015610628578787828181106104ec576104ec611b6a565b90506020020160208101906105019190611b99565b73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16106105bb576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f746f6b656e732073686f756c6420626520736f7274656420616e6420756e697160448201527f756500000000000000000000000000000000000000000000000000000000000060648201526084016103c7565b6105ed8888838181106105d0576105d0611b6a565b90506020020160208101906105e59190611b99565b878787610632565b8787828181106105ff576105ff611b6a565b90506020020160208101906106149190611b99565b91508061062081611bb6565b9150506104d2565b5050505050505050565b6040517f70a082310000000000000000000000000000000000000000000000000000000081523060048201526000906106ce9073ffffffffffffffffffffffffffffffffffffffff8716906370a0823190602401602060405180830381865afa1580156106a3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106c79190611bee565b8585610d73565b905060006106db82610d8a565b90506106e78183611b51565b91506106f4868484610e35565b6106fe8682610f9e565b505050505050565b6000806107116107b3565b905061071d84846110ea565b60006107276107b3565b90506107338183611b51565b9250509250929050565b600061074a478585610d73565b9050600061075782610d8a565b90506107638183611b51565b60405190925073ffffffffffffffffffffffffffffffffffffffff84169083156108fc029084906000818181858888f193505050501580156107a9573d6000803e3d6000fd5b506102dc81611388565b6000807f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16633709907e6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610821573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108459190611c07565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff80831660048301529192507f0000000000000000000000000000000000000000000000000000000000000000909116906370a0823190602401602060405180830381865afa1580156108d6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108fa9190611bee565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610965573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109899190611bee565b6109939190611b51565b91505090565b807f000000000000000000000000000000000000000000000000000000000000000015610c11576040517f70a082310000000000000000000000000000000000000000000000000000000081523060048201526000907f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16906370a0823190602401602060405180830381865afa158015610a4d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a719190611bee565b905073ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000166323b872dd336040517fffffffff0000000000000000000000000000000000000000000000000000000060e084901b16815273ffffffffffffffffffffffffffffffffffffffff909116600482015230602482015260448101869052606401600060405180830381600087803b158015610b2357600080fd5b505af1158015610b37573d6000803e3d6000fd5b50506040517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152600092507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1691506370a0823190602401602060405180830381865afa158015610bc8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bec9190611bee565b9050610bf88282611b51565b9250610c0383611546565b15610c0e5750505050565b50505b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16633709907e6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610c7e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ca29190611c07565b905073ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000166323b872dd336040517fffffffff0000000000000000000000000000000000000000000000000000000060e084901b16815273ffffffffffffffffffffffffffffffffffffffff9182166004820152908416602482015260448101859052606401600060405180830381600087803b158015610d5657600080fd5b505af1158015610d6a573d6000803e3d6000fd5b50505050505050565b6000610d80848484611660565b90505b9392505050565b60008060007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663492917196040518163ffffffff1660e01b81526004016040805180830381865afa158015610df9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e1d9190611c24565b91509150610e2c8483836117d6565b50949350505050565b6040805173ffffffffffffffffffffffffffffffffffffffff8481166024830152604480830185905283518084039091018152606490920183526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fa9059cbb000000000000000000000000000000000000000000000000000000001790529151600092839290871691610ecc9190611c48565b6000604051808303816000865af19150503d8060008114610f09576040519150601f19603f3d011682016040523d82523d6000602084013e610f0e565b606091505b5091509150818015610f38575080511580610f38575080806020019051810190610f389190611c77565b6102dc576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600260248201527f544600000000000000000000000000000000000000000000000000000000000060448201526064016103c7565b600080610faa83611804565b9150915060007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663de27cc7a6040518163ffffffff1660e01b8152600401602060405180830381865afa15801561101b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061103f9190611c07565b905060007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16639a38c9dd6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156110ae573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110d29190611c07565b90506110df868386610e35565b6106fe868285610e35565b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16633709907e6040518163ffffffff1660e01b8152600401602060405180830381865afa158015611157573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061117b9190611c07565b905060005b8281101561026f5773ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000166323b872dd33308787868181106111d8576111d8611b6a565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e088901b16815273ffffffffffffffffffffffffffffffffffffffff958616600482015294909316602485015250602090910201356044820152606401600060405180830381600087803b15801561125457600080fd5b505af1158015611268573d6000803e3d6000fd5b5050505061128d84848381811061128157611281611b6a565b90506020020135611546565b611376577f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166323b872dd30848787868181106112e1576112e1611b6a565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e088901b16815273ffffffffffffffffffffffffffffffffffffffff958616600482015294909316602485015250602090910201356044820152606401600060405180830381600087803b15801561135d57600080fd5b505af1158015611371573d6000803e3d6000fd5b505050505b8061138081611bb6565b915050611180565b60008061139483611804565b9150915060007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663de27cc7a6040518163ffffffff1660e01b8152600401602060405180830381865afa158015611405573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114299190611c07565b905060007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16639a38c9dd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015611498573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114bc9190611c07565b60405190915073ffffffffffffffffffffffffffffffffffffffff83169085156108fc029086906000818181858888f19350505050158015611502573d6000803e3d6000fd5b5060405173ffffffffffffffffffffffffffffffffffffffff82169084156108fc029085906000818181858888f193505050501580156106fe573d6000803e3d6000fd5b6000807f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff168360405160240161159391815260200190565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529181526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f42966c6800000000000000000000000000000000000000000000000000000000179052516116149190611c48565b6000604051808303816000865af19150503d8060008114611651576040519150601f19603f3d011682016040523d82523d6000602084013e611656565b606091505b5090949350505050565b600080807fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff858709858702925082811083820303915050806000036116b757600084116116ac57600080fd5b508290049050610d83565b8084116116c357600080fd5b600084868809600095508593811190920391905060016116e38184611c99565b9093179260006116f4876003611c99565b60021890506117038188611c99565b61170e906002611b51565b6117189082611c99565b90506117248188611c99565b61172f906002611b51565b6117399082611c99565b90506117458188611c99565b611750906002611b51565b61175a9082611c99565b90506117668188611c99565b611771906002611b51565b61177b9082611c99565b90506117878188611c99565b611792906002611b51565b61179c9082611c99565b90506117a88188611c99565b6117b3906002611b51565b6117bd9082611c99565b90506117c98186611c99565b9998505050505050505050565b600080826117e48587611c99565b6117ee9190611cb0565b91506117fa8286611b51565b9050935093915050565b6000806000807f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663fcd4863b6040518163ffffffff1660e01b81526004016040805180830381865afa158015611874573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118989190611c24565b915091506118a78583836117d6565b90969095509350505050565b60008083601f8401126118c557600080fd5b50813567ffffffffffffffff8111156118dd57600080fd5b6020830191508360208260051b85010111156118f857600080fd5b9250929050565b73ffffffffffffffffffffffffffffffffffffffff8116811461192157600080fd5b50565b6000806000806060858703121561193a57600080fd5b843567ffffffffffffffff81111561195157600080fd5b61195d878288016118b3565b909550935050602085013591506040850135611978816118ff565b939692955090935050565b60008060006060848603121561199857600080fd5b83356119a3816118ff565b92506020840135915060408401356119ba816118ff565b809150509250925092565b6000806000806000606086880312156119dd57600080fd5b853567ffffffffffffffff808211156119f557600080fd5b611a0189838a016118b3565b90975095506020880135915080821115611a1a57600080fd5b50611a27888289016118b3565b9094509250506040860135611a3b816118ff565b809150509295509295909350565b60008060408385031215611a5c57600080fd5b823591506020830135611a6e816118ff565b809150509250929050565b60008060008060608587031215611a8f57600080fd5b8435611a9a816118ff565b9350602085013567ffffffffffffffff811115611ab657600080fd5b611ac2878288016118b3565b9094509250506040850135611978816118ff565b600080600060408486031215611aeb57600080fd5b833567ffffffffffffffff811115611b0257600080fd5b611b0e868287016118b3565b90945092505060208401356119ba816118ff565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b81810381811115611b6457611b64611b22565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600060208284031215611bab57600080fd5b8135610d83816118ff565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203611be757611be7611b22565b5060010190565b600060208284031215611c0057600080fd5b5051919050565b600060208284031215611c1957600080fd5b8151610d83816118ff565b60008060408385031215611c3757600080fd5b505080516020909101519092909150565b6000825160005b81811015611c695760208186018101518583015201611c4f565b506000920191825250919050565b600060208284031215611c8957600080fd5b81518015158114610d8357600080fd5b8082028115828204841417611b6457611b64611b22565b600082611ce6577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b50049056fea164736f6c6343000814000a";

export class Vault__factory extends ContractFactory {
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
    tokenAddress: string,
    isBurnableToken: boolean,
    factoryAddress: string,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<Vault> {
    return super.deploy(
      tokenAddress,
      isBurnableToken,
      factoryAddress,
      overrides || {}
    ) as Promise<Vault>;
  }
  getDeployTransaction(
    tokenAddress: string,
    isBurnableToken: boolean,
    factoryAddress: string,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      tokenAddress,
      isBurnableToken,
      factoryAddress,
      overrides || {}
    );
  }
  attach(address: string): Vault {
    return super.attach(address) as Vault;
  }
  connect(signer: Signer): Vault__factory {
    return super.connect(signer) as Vault__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): VaultInterface {
    return new utils.Interface(_abi) as VaultInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Vault {
    return new Contract(address, _abi, signerOrProvider) as Vault;
  }
}
