// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "hardhat/console.sol"; // used for console.log

contract Dwitter {
    struct User {
        address wallet;
        string username;
        string name;
        string bio;
        string avatar;
    }

    struct Tweet {
        address author;
        string content;
        uint256 timestamp;
        uint256 likes;
    }

    Tweet[] public tweets;

    mapping(address => string) public usernames;
    mapping(string => User) public users;



}
