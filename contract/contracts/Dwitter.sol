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

    function signup(
        string memory _username,
        string memory _name,
        string memory _bio,
        string memory _avatar
    ) public {
        require(
            bytes(usernames[msg.sender]).length == 0,
            "Username already exists"
        );
        require(
            users[_username].wallet == address(0),
            "Username is taken, please try another one"
        );

        users[_username] = User({
            wallet: msg.sender,
            username: _username,
            name: _name,
            bio: _bio,
            avatar: _avatar
        });
        usernames[msg.sender] = _username;
    }

    function getUser(address _wallet) public view returns (User memory) {
        return users[usernames[_wallet]];
    }
}
