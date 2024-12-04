// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract ERC20WithTax is ERC20 {
    address public feeReciever;

    constructor() ERC20("name", "symbol") {
        feeReciever = msg.sender;
    }

    function mint(uint256 value) public {
        _mint(msg.sender, value);
    }

    function transferFrom(address from, address to, uint256 amount) public override returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, amount);
        uint256 fee = amount / 10;
        _transfer(from, feeReciever, fee);
        _transfer(from, to, amount - fee);
        return true;
    }
}
