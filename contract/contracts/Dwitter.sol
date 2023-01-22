// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

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

    function postTweet(string memory _content) public {
        require(
            bytes(usernames[msg.sender]).length > 0,
            "You must sign up to post a tweet."
        );
        require(
            bytes(_content).length > 0,
            "You must write something to post a tweet."
        );
        require(bytes(_content).length <= 140, "Your tweet is too long.");

        Tweet memory tweet = Tweet({
            author: msg.sender,
            content: _content,
            timestamp: block.timestamp,
            likes: 0
        });
        tweets.push(tweet);
    }

    function getTweets() public view returns (Tweet[] memory) {
        return tweets;
    }
}
