// SPDX-License-Identifier: BUSL-1.1

pragma solidity ^0.8.20;

import {Context} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {TransferHelper} from "./libraries/TransferHelper.sol";
import {Math} from "./libraries/Math.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {IERC20} from "./interfaces/IERC20.sol";
import {IVaultFactory} from "./interfaces/IVaultFactory.sol";
import {IEnumerable} from "./interfaces/IEnumerable.sol";

/// @title Vault Contract
/// @notice This contract manages funds and allows withdrawals in ETH or ERC20 tokens
/// @dev Inherits Context for sender information, and ReentrancyGuard for security against reentrancy attacks
contract Vault is Context, ReentrancyGuard {
    address constant NATIVE_ETH_ADDRESS = address(0);
    address public immutable primaryToken;
    address public immutable factoryContractAddress;
    bool public immutable isBurnable;

    /// @notice Creates a new Vault contract
    /// @dev Sets the main token and the factory contract address
    /// @param tokenAddress Address of the primary token
    /// @param isBurnableToken Hint for burning. If True then try to burn token natively else
    /// token will be sent to a black hole
    /// @param factoryAddress Address of the factory contract
    constructor(
        address tokenAddress,
        bool isBurnableToken,
        address factoryAddress
    ) payable {
        primaryToken = tokenAddress;
        factoryContractAddress = factoryAddress;
        isBurnable = isBurnableToken;
    }

    receive() external payable {}

    /// @notice Allows a user to withdraw ETH proportional to their primary token holding
    /// @dev Public function callable by users for ETH withdrawal
    /// @param primaryTokenAmount The amount of primary token to burn for the withdrawal
    function withdrawETHByERC20(
        uint256 primaryTokenAmount,
        address recipient
    ) public nonReentrant {
        (
            uint256 totalSupplyChange,
            uint256 totalSupplyBeforeBurning
        ) = _burnERC20PrimaryTokenWithChange(primaryTokenAmount);
        _withdrawETH(totalSupplyChange, totalSupplyBeforeBurning, recipient);
    }

    /// @notice Allows a user to withdraw ERC20 tokens proportional to their primary token holding
    /// @dev Public function callable by users for ERC20 token withdrawal
    /// @param token The ERC20 token address for withdrawal
    /// @param primaryTokenAmount The amount of primary token to burn for the withdrawal
    function withdrawERC20ByERC20(
        address token,
        uint256 primaryTokenAmount,
        address recipient
    ) public nonReentrant {
        (
            uint256 totalSupplyChange,
            uint256 totalSupplyBeforeBurning
        ) = _burnERC20PrimaryTokenWithChange(primaryTokenAmount);
        _withdrawERC20(token, totalSupplyChange, totalSupplyBeforeBurning, recipient);
    }

    /// @notice Allows a user to withdraw multiple types of tokens in a batch, proportional to their primary
    /// token holding
    /// @dev Public function callable by users for batch token withdrawal
    /// @param tokens An array of token addresses for withdrawal
    /// @param primaryTokenAmount The amount of primary token to burn for the withdrawals
    function withdrawMultipleTokensByERC20(
        address[] calldata tokens,
        uint256 primaryTokenAmount,
        address recipient
    ) public nonReentrant {
        (
            uint256 totalSupplyChange,
            uint256 totalSupplyBeforeBurning
        ) = _burnERC20PrimaryTokenWithChange(primaryTokenAmount);
        _withdrawMultipleTokens(
            tokens,
            totalSupplyChange,
            totalSupplyBeforeBurning,
            recipient
        );
    }

    /// @notice Allows a user to withdraw ETH proportional to their primary token holding by burning ERC721 tokens
    /// @dev Public function callable by users for ETH withdrawal
    /// @param primaryTokenIds Token ids of primary token to burn for the withdrawals
    function withdrawETHByERC721(
        uint256[] calldata primaryTokenIds,
        address recipient
    ) public nonReentrant {
        (
            uint256 totalSupplyChange,
            uint256 totalSupplyBeforeBurning
        ) = _burnERC721PrimaryTokenWithWithChange(primaryTokenIds);
        _withdrawETH(totalSupplyChange, totalSupplyBeforeBurning, recipient);
    }

    /// @notice Allows a user to withdraw ERC20 tokens proportional to their primary token holding by burning 
    /// ERC721 tokens
    /// @dev Public function callable by users for ERC20 token withdrawal
    /// @param token The ERC20 token address for withdrawal
    /// @param primaryTokenIds Token ids of primary token to burn for the withdrawals
    function withdrawERC20ByERC721(
        address token,
        uint256[] calldata primaryTokenIds,
        address recipient
    ) public nonReentrant {
        (
            uint256 totalSupplyChange,
            uint256 totalSupplyBeforeBurning
        ) = _burnERC721PrimaryTokenWithWithChange(primaryTokenIds);
        _withdrawERC20(token, totalSupplyChange, totalSupplyBeforeBurning, recipient);
    }

    /// @notice Allows a user to withdraw multiple types of tokens in a batch, proportional to their
    /// primary token holding
    /// @dev Public function callable by users for batch token withdrawal
    /// @param tokens An array of token addresses for withdrawal
    /// @param primaryTokenIds Token ids of primary token to burn for the withdrawals
    function withdrawMultipleTokensByERC721(
        address[] calldata tokens,
        uint256[] calldata primaryTokenIds,
        address recipient
    ) public nonReentrant {
        (
            uint256 totalSupplyChange,
            uint256 totalSupplyBeforeBurning
        ) = _burnERC721PrimaryTokenWithWithChange(primaryTokenIds);
        _withdrawMultipleTokens(
            tokens,
            totalSupplyChange,
            totalSupplyBeforeBurning,
            recipient
        );
    }

    /// @notice Burns a specified amount of the primary token with totalS supply changes check
    /// @dev Try to burn the primary token natively, and if it doesn't work, we send it to a black hole
    /// @param amount The amount of the primary token to burn
    /// @return totalSupplyChange total supply changes
    /// @return totalSupplyBeforeBurning the result of the burning
    function _burnERC20PrimaryTokenWithChange(
        uint256 amount
    )
        internal
        returns (uint256 totalSupplyChange, uint256 totalSupplyBeforeBurning)
    {
        totalSupplyBeforeBurning = _getCurrentTotalSupply();
        _burnERC20PrimaryToken(amount);
        uint256 totalSupplyAfterBurning = _getCurrentTotalSupply();

        totalSupplyChange = totalSupplyBeforeBurning - totalSupplyAfterBurning;
    }

    /// @notice Burns a specified amount of the primary token
    /// @dev Internal function to burn the primary tokens
    /// @param primaryTokenIds Token ids of primary token to burn
    /// @return totalSupplyChange total supply changes
    /// @return totalSupplyBeforeBurning the result of the burning
    function _burnERC721PrimaryTokenWithWithChange(
        uint256[] calldata primaryTokenIds
    )
        internal
        returns (uint256 totalSupplyChange, uint256 totalSupplyBeforeBurning)
    {
        totalSupplyBeforeBurning = _getCurrentTotalSupply();
        _burnERC721PrimaryTokens(primaryTokenIds);
        uint256 totalSupplyAfterBurning = _getCurrentTotalSupply();

        totalSupplyChange = totalSupplyBeforeBurning - totalSupplyAfterBurning;
    }

    /// @notice Burns a specified amount of the primary token
    /// @dev Try to burn the primary token natively, and if it doesn't work, we send it to a black hole
    /// @param amount The amount of the primary token to burn
    function _burnERC20PrimaryToken(uint256 amount) internal {
        uint256 amountToBurn = amount;
        if (isBurnable) {
            uint256 primaryTokenBalanceBefore = IERC20(primaryToken).balanceOf(
                address(this)
            );
            IERC20(primaryToken).transferFrom(
                _msgSender(),
                address(this),
                amount
            );
            uint256 primaryTokenBalanceAfter = IERC20(primaryToken).balanceOf(
                address(this)
            );
            amountToBurn = primaryTokenBalanceAfter - primaryTokenBalanceBefore;

            if (_tryBurnERC20(amountToBurn)) {
                return;
            }
        }
        address blackHoleAddress = IVaultFactory(factoryContractAddress)
            .getBlackHoleAddress();
        IERC20(primaryToken).transferFrom(
            _msgSender(),
            blackHoleAddress,
            amountToBurn
        );
    }

    /// @notice Trying to burns a specified amount of the ERC20 primary token
    /// @dev Internal function which is trying to burn ERC20 tokens
    /// @param amount The amount of the primary ERC20 token to burn
    /// @return success the result of the burning
    function _tryBurnERC20(uint256 amount) internal returns (bool) {
        (bool success, ) = primaryToken.call(
            abi.encodeWithSignature("burn(uint256)", amount)
        );

        return success;
    }

    /// @notice Withdraws ETH proportional to the amount of primary token
    /// @dev Internal function handling withdrawal logic for ETH
    /// @param totalSupplyChange total supply changes
    /// @param totalSupplyBeforeBurning the result of the burning
    function _withdrawETH(
        uint256 totalSupplyChange,
        uint256 totalSupplyBeforeBurning,
        address recipient
    ) internal {
        uint256 withdrawalAmount = _calculateWithdrawalAmount(
            address(this).balance,
            totalSupplyChange,
            totalSupplyBeforeBurning
        );
        uint256 fee = _calculateTransactionFee(withdrawalAmount);
        withdrawalAmount -= fee;

        payable(recipient).transfer(withdrawalAmount);
        _sendFeeInETH(fee);
    }

    /// @notice Withdraws ERC20 tokens proportional to the amount of primary token
    /// @dev Internal function handling withdrawal logic for ERC20 tokens
    /// @param token The ERC20 token address for withdrawal
    /// @param totalSupplyChange total supply changes
    /// @param totalSupplyBeforeBurning the result of the burning
    function _withdrawERC20(
        address token,
        uint256 totalSupplyChange,
        uint256 totalSupplyBeforeBurning,
        address recipient
    ) internal {
        uint256 withdrawalAmount = _calculateWithdrawalAmount(
            IERC20(token).balanceOf(address(this)),
            totalSupplyChange,
            totalSupplyBeforeBurning
        );
        uint256 fee = _calculateTransactionFee(withdrawalAmount);
        withdrawalAmount -= fee;

        TransferHelper.safeTransfer(token, recipient, withdrawalAmount);
        _sendFeeInERC20(token, fee);
    }

    /// @notice Withdraw multiple types of tokens in a batch, proportional to their primary token holding
    /// tokens array must be sorted with unique tokens
    /// @dev Internal function callable by users for batch token withdrawal
    /// @param tokens An array of token addresses for withdrawal
    /// @param totalSupplyChange total supply changes
    /// @param totalSupplyBeforeBurning the result of the burning
    function _withdrawMultipleTokens(
        address[] calldata tokens,
        uint256 totalSupplyChange,
        uint256 totalSupplyBeforeBurning,
        address recipient
    ) internal {
        require(tokens.length > 0, "empty token list");
        uint256 start = 0;
        if (tokens[0] == NATIVE_ETH_ADDRESS) {
            _withdrawETH(totalSupplyChange, totalSupplyBeforeBurning, recipient);
            start++;
        }
        uint160 prevAddress = 0;
        for (uint256 i = start; i < tokens.length; i++) {
            require(
                prevAddress < uint160(tokens[i]),
                "tokens should be sorted and unique"
            );
            _withdrawERC20(
                tokens[i],
                totalSupplyChange,
                totalSupplyBeforeBurning,
                recipient
            );
            prevAddress = uint160(tokens[i]);
        }
    }

    /// @notice Sends transaction fee in ETH to the factory and hodl Vault
    /// @dev Internal function to transfer ETH fee
    /// @param amount The fee amount to transfer
    function _sendFeeInETH(uint256 amount) internal {
        (uint256 toProjectVault, uint256 toFeeReciever) = _splitFee(amount);
        address projectVaultAddress = IVaultFactory(factoryContractAddress)
            .getProjectVaultAddress();
        address feeReciever = IVaultFactory(factoryContractAddress)
            .getFeeRecieverAddress();

        payable(projectVaultAddress).transfer(toProjectVault);
        payable(feeReciever).transfer(toFeeReciever);
    }

    /// @notice Sends transaction fee in ERC20 tokens to the factory and hodl Vault
    /// @dev Internal function to transfer ERC20 token fee
    /// @param token The ERC20 token address
    /// @param amount The fee amount to transfer
    function _sendFeeInERC20(address token, uint256 amount) internal {
        (uint256 toProjectVault, uint256 toFeeReciever) = _splitFee(amount);
        address projectVaultAddress = IVaultFactory(factoryContractAddress)
            .getProjectVaultAddress();
        address feeReciever = IVaultFactory(factoryContractAddress)
            .getFeeRecieverAddress();

        TransferHelper.safeTransfer(token, projectVaultAddress, toProjectVault);
        TransferHelper.safeTransfer(token, feeReciever, toFeeReciever);
    }

    /// @notice Trying to burns a specified amount of the ERC721 primary token
    /// @dev Internal function which is trying to burn ERC721 token
    /// @param tokenId The token id of the ERC721 primary token to burn
    /// @return success the result of the burning
    function _tryBurnERC721(uint256 tokenId) internal returns (bool) {
        (bool success, ) = primaryToken.call(
            abi.encodeWithSignature("burn(uint256)", tokenId)
        );

        return success;
    }

    /// @notice Burns a specified amount of the primary token
    /// @dev Internal function to burn the primary tokens
    /// @param primaryTokenIds Token ids of primary token to burn
    function _burnERC721PrimaryTokens(
        uint256[] calldata primaryTokenIds
    ) internal {
        address blackHoleAddress = IVaultFactory(factoryContractAddress)
            .getBlackHoleAddress();
        for (uint256 i = 0; i < primaryTokenIds.length; i++) {
            IERC721(primaryToken).transferFrom(
                _msgSender(),
                address(this),
                primaryTokenIds[i]
            );
            if (!_tryBurnERC721(primaryTokenIds[i])) {
                IERC721(primaryToken).transferFrom(
                    address(this),
                    blackHoleAddress,
                    primaryTokenIds[i]
                );
            }
        }
    }

    /// @notice Gets the current total supply of the primary
    /// @dev Internal view function to check total supply
    /// @return The total supply of the primary token
    function _getCurrentTotalSupply() internal view returns (uint256) {
        address blackHoleAddress = IVaultFactory(factoryContractAddress)
            .getBlackHoleAddress();
        return
            IEnumerable(primaryToken).totalSupply() -
            IEnumerable(primaryToken).balanceOf(blackHoleAddress);
    }

    /// @notice Calculates the transaction fee
    /// @dev Internal function to calculate fees based on the fee structure in VaultFactory
    /// @param amount The amount on which to calculate the fee
    /// @return fee The calculated fee amount
    function _calculateTransactionFee(
        uint256 amount
    ) internal view returns (uint256 fee) {
        (uint256 feePercentage, uint256 base) = IVaultFactory(
            factoryContractAddress
        ).getCurrentFeePercentage();
        (fee, ) = _splitAmountByPercentage(amount, feePercentage, base);
        return fee;
    }

    /// @dev Splits a fee amount into two parts based on the current fee structure.
    /// @return toProjectVault The calculated amount allocated to the project Vault.
    /// @return toFeeReciever The calculated amount allocated to the fee reciever.
    function _splitFee(
        uint256 fee
    ) internal view returns (uint256 toProjectVault, uint256 toFeeReciever) {
        (uint256 feePercentage, uint256 base) = IVaultFactory(
            factoryContractAddress
        ).getCurrentProjectVaultFeePercentage();
        (toProjectVault, toFeeReciever) = _splitAmountByPercentage(
            fee,
            feePercentage,
            base
        );
    }

    /// @notice Calculates the withdrawal amount based on token balance and primary token amount
    /// @dev Internal function to calculate proportional withdrawal amount
    /// @param tokenAmount The balance of the token to be withdrawn
    /// @param totalSupplyChange The amount of the primary token
    /// @param totalSupplyBeforeBurning the result of the burning
    /// @return The calculated amount available for withdrawal
    function _calculateWithdrawalAmount(
        uint256 tokenAmount,
        uint256 totalSupplyChange,
        uint256 totalSupplyBeforeBurning
    ) internal pure returns (uint256) {
        return Math.mulDiv(tokenAmount, totalSupplyChange, totalSupplyBeforeBurning);
    }

    /// @dev Splits an amount into two parts based on a given percentage and base value.
    /// @param amount The total amount to be split.
    /// @param percentage The percentage of the amount to be allocated to the first part.
    /// @param base The base value against which the percentage is calculated.
    /// @return first The calculated amount for the first part.
    /// @return second The calculated amount for the second part.
    function _splitAmountByPercentage(
        uint256 amount,
        uint256 percentage,
        uint256 base
    ) internal pure returns (uint256 first, uint256 second) {
        first = (amount * percentage) / base;
        second = amount - first;
    }
}
