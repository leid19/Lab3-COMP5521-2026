// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Import OpenZeppelin's ERC20 and Ownable contracts
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MySimpleToken
 * @dev An educational ERC20 token for the first project-introduction lesson.
 *
 * MST is not a production stablecoin: it has no peg, reserves, or price
 * mechanism. It gives students a small token contract to deploy and use in
 * the later HTLC project.
 */
contract MySimpleToken is ERC20, Ownable {

    // The deployer becomes the owner and is therefore allowed to mint.
    constructor() ERC20("My Simple Token", "MST") Ownable(msg.sender) {}

    /**
     * @dev Create new tokens and allocate them to an account.
     * Only the owner can call this function.
     * @param to The address that will receive the new tokens.
     * @param amount The amount of tokens to mint.
     */
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
