// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

contract TestMath {
    constructor() {}

    function myCalculateWithdrawalAmount(
        uint256 tokenAmount,
        uint256 totalSupplyChange,
        uint256 totalSupplyBeforeBurning
    ) external pure returns (uint256) {
        return tokenAmount * totalSupplyChange / totalSupplyBeforeBurning;
    }

    function newCalculateWithdrawalAmount(
        uint256 tokenAmount,
        uint256 totalSupplyChange,
        uint256 totalSupplyBeforeBurning,
        uint256 tokenDecimals,
        uint256 primaryTokenDecimals
    ) external pure returns (uint256) {
        uint256 normalizedTokenAmount = tokenAmount * 10**(18 - tokenDecimals);
        uint256 normalizedTotalSupplyChange = totalSupplyChange * 10**(18 - primaryTokenDecimals);
        uint256 normalizedTotalSupplyBeforeBurning = totalSupplyBeforeBurning * 10**(18 - primaryTokenDecimals);

        return normalizedTokenAmount * normalizedTotalSupplyChange / normalizedTotalSupplyBeforeBurning / 10**(18 - tokenDecimals);
    }
}