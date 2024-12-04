// SPDX-License-Identifier: BUSL-1.1

pragma solidity ^0.8.20;
 
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IVaultFactory} from "./interfaces/IVaultFactory.sol";
import {Vault} from "./Vault.sol";

/// @title VaultFactory
/// @notice Contract for creating and managing multiple Vault contracts
/// @dev Inherits Ownable for access control functionality
contract VaultFactory is Ownable, IVaultFactory {
    uint256 private feePercentage = 100; // Default 1% fee
    uint256 private feeBase = 10000; // Base value for fee calculation
    uint256 constant MAX_FEE = 200; // Maximum allowable fee is 2%

    uint256 private projectVaultPercentage = 3000; // Default 30% of total fees send to project Vault
    uint256 private projectVaultBase = 10000; // Base value for project Vault fees calculation
    uint256 constant MIN_PROJECT_VAULT_FEE = 3000; // Minimum allowable project Vault fee is 30%
    address private projectVaultAddress;
    address private feeReciever;
    address immutable private blackHole;

    address[] private managedVaults; // Stores addresses of all created Vault contracts
    mapping(address => address) public primaryTokenToVault; // Stores addresses of all created Vault contracts by primary tokens

    /// @dev Constructor for the VaultFactory contract
    /// @param blackHoleAddress address for burn tokens
    constructor(address blackHoleAddress) {
        blackHole = blackHoleAddress;
        feeReciever =_msgSender();
        projectVaultAddress = _msgSender();
    }
 
    /// @notice Emitted when a new Vault is created
    /// @param newVaultAddress The address of the newly created Vault contract
    /// @param tokenAddress The address of the primary token for the new Vault
    event VaultCreated(address indexed newVaultAddress, address indexed tokenAddress);

    /// @notice Emitted when the fee percentage is updated
    /// @param updatedFeePercentage The new fee percentage
    /// @param feeBaseValue The base value for calculating the fee
    event FeeUpdated(uint256 updatedFeePercentage, uint256 feeBaseValue);

    /// @notice Emitted when the project vault fee percentage is updated
    /// @param updatedFeePercentage The new fee percentage
    /// @param feeBaseValue The base value for calculating the fee
    event ProjectVaultFeeUpdated(uint256 updatedFeePercentage, uint256 feeBaseValue);
 
    /// @notice Creates a new Vault contract with a specified token
    /// @param tokenAddress The address of the token for which the Vault is created
    /// @param isBurnableToken Hint for burning. If True then try to burn token natively else token will be sent to a black hole
    /// @dev Emits a VaultCreated event on successful creation
    function createNewVault(address tokenAddress, bool isBurnableToken) public {
        // check that totalSupply exists
        (bool success,) = tokenAddress.call(abi.encodeWithSignature("totalSupply()"));
        require(success, "totalSupply does not exist");

        require(primaryTokenToVault[tokenAddress] == address(0), "vault for this token already exists");

        Vault newVault = new Vault(tokenAddress, isBurnableToken, address(this));
        managedVaults.push(address(newVault));
        primaryTokenToVault[tokenAddress] = address(newVault);
        emit VaultCreated(address(newVault), tokenAddress);
    }
 
    /// @notice Allows the owner to update the fee percentage
    /// @param newFeePercentage The new fee percentage to set
    /// @param newBase The new base value for fee calculation
    /// @dev Emits a FeeUpdated event on successful update
    function updateFeePercentage(uint256 newFeePercentage, uint256 newBase) public onlyOwner {
        require(newFeePercentage * 10000 <= MAX_FEE * newBase, "fee exceeds maximum limit");
        feePercentage = newFeePercentage;
        feeBase = newBase;
        emit FeeUpdated(newFeePercentage, newBase);
    }
 
    /// @notice Provides the current fee percentage and base
    /// @return feePercentage The current fee percentage
    /// @return feeBase The current base value for fee calculation
    function getCurrentFeePercentage() public view returns (uint256, uint256) {
        return (feePercentage, feeBase);
    }

    /// @notice Allows the owner to update the project Vault fee percentage
    /// @param newFeePercentage The new fee percentage to set
    /// @param newBase The new base value for fee calculation
    /// @dev Emits a FeeUpdated event on successful update
    function updateProjectVaultFeePercentage(uint256 newFeePercentage, uint256 newBase) public onlyOwner {
        require(newFeePercentage <= newBase, "fee exceeds maximum limit");
        require(newFeePercentage * 10000 >= MIN_PROJECT_VAULT_FEE * newBase, "fee exceeds minimum limit");
        projectVaultPercentage = newFeePercentage;
        projectVaultBase = newBase;
        emit ProjectVaultFeeUpdated(newFeePercentage, newBase);
    }

    /// @notice Provides the current project Vault fee percentage and base
    /// @return feePercentage The current fee percentage
    /// @return feeBase The current base value for fee calculation
    function getCurrentProjectVaultFeePercentage() public view returns (uint256, uint256) {
        return (projectVaultPercentage, projectVaultBase);
    }

    /// @notice Allows the owner to set project Vault address
    /// @param vaultAddress The address of project Vault
    function setProjectVaultAddress(address vaultAddress) external onlyOwner {
        require(projectVaultAddress == owner(), "project Vault address already seted");
        projectVaultAddress = vaultAddress;
    }

    /// @notice Allows the owner to set fee reciever
    /// @param feeRecieverAddress The address of fee reciever
    function setFeeRecieverAddress(address feeRecieverAddress) external onlyOwner {
        feeReciever = feeRecieverAddress; 
    }

    /// @notice Allows to get project Vault address
    /// @return projectVaultAddress The address of project Vault
    function getProjectVaultAddress() external view returns (address) {
        return projectVaultAddress;
    }

    /// @notice Allows to get fee reciever address
    /// @return feeReciever The address of fee reciever
    function getFeeRecieverAddress() external view returns (address) {
        return feeReciever;
    }

    /// @notice Allows to get fee reciever address
    /// @return blackHole The address of fee reciever
    function getBlackHoleAddress() external view returns (address) {
        return blackHole;
    }


    /// @return Returns number of managed Vault contracts
    function getNumberOfManagedVaults() external view returns (uint256) {
        return managedVaults.length;
    }
 
    /// @notice Returns the list of addresses for all managed Vault contracts
    /// @param from right side of range 
    /// @param to left side of range
    /// @return vaultsAddresses a list of addresses of managed Vault contracts
    function listManagedVaults(uint256 from, uint256 to) public view returns (address[] memory vaultsAddresses) {
        vaultsAddresses = new address[](to - from);
        for (uint256 i = from; i < to; i++) {
            vaultsAddresses[i - from] = managedVaults[i];
        }
    }
}
