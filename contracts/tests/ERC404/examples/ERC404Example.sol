//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {ERC404} from "../ERC404.sol";

contract ERC404Example is Ownable, ERC404 {
  constructor(
  ) ERC404("erc404", "erc404", 18) {
    // Do not mint the ERC721s to the initial owner, as it's a waste of gas.
    _setERC721TransferExempt(msg.sender, true);
  }

  function tokenURI(uint256 id_) public pure override returns (string memory) {
    return string.concat("https://example.com/token/", Strings.toString(id_));
  }

  function setERC721TransferExempt(
    address account_,
    bool value_
  ) external onlyOwner {
    _setERC721TransferExempt(account_, value_);
  }

  function mint(uint256 value) public {
    _mintERC20(msg.sender, value);
  }
}
