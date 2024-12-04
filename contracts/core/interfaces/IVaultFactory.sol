// SPDX-License-Identifier: BUSL-1.1

pragma solidity ^0.8.20;

interface IVaultFactory {
    function getCurrentFeePercentage() external view returns (uint256, uint256);
    function getCurrentProjectVaultFeePercentage() external view returns (uint256, uint256);
    function getProjectVaultAddress() external view returns (address);
    function getFeeRecieverAddress() external view returns (address);
    function getBlackHoleAddress() external view returns (address);
}
