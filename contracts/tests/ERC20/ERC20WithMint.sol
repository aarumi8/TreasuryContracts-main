// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract ERC20WithMint is ERC20, ERC20Burnable {
    constructor() ERC20("name", "sumbol") {
    }

    function mint(uint256 value) public {
        _mint(msg.sender, value);
    }
}
