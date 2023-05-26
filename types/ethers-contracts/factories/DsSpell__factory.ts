/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { DsSpell, DsSpellInterface } from "../DsSpell";

const _abi = [
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    constant: true,
    name: "action",
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
    name: "cast",
    constant: false,
    payable: false,
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "description",
    payable: false,
    constant: true,
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "done",
    constant: true,
    payable: false,
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
    name: "eta",
    constant: true,
    payable: false,
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "expiration",
    constant: true,
    payable: false,
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "log",
    constant: true,
    payable: false,
    outputs: [
      {
        internalType: "contract Changelog",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    payable: false,
    constant: true,
    name: "nextCastTime",
    outputs: [
      {
        internalType: "uint256",
        name: "castTime",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    payable: false,
    constant: true,
    name: "officeHours",
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
    payable: false,
    constant: true,
    name: "pause",
    outputs: [
      {
        internalType: "contract PauseAbstract",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    payable: false,
    constant: false,
    name: "schedule",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "sig",
    payable: false,
    constant: true,
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tag",
    payable: false,
    constant: true,
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class DsSpell__factory {
  static readonly abi = _abi;
  static createInterface(): DsSpellInterface {
    return new utils.Interface(_abi) as DsSpellInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DsSpell {
    return new Contract(address, _abi, signerOrProvider) as DsSpell;
  }
}
