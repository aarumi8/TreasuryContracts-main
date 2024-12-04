// SPDX-License-Identifier: BUSL-1.1

pragma solidity ^0.8.20;

interface IEnumerable {
    function totalSupply() external view returns (uint256);
    function balanceOf(address) external view returns (uint256);
}
