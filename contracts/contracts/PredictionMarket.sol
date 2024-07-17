// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract SimpleContract {
    string public message;

    constructor(string memory _message) {
        message = _message;
    }
}
