const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Dwitter", async function () {
  it("Tests dwitter flow", async function () { 
    const Dwitter = await ethers.getContractFactory("Dwitter");
    const [user1, user2] = await ethers.getSigners();
    const dwitter = await Dwitter.deploy();
    await dwitter.deployed();

    await dwitter.signup("anuprshetty", "Anup", "An ambivert", "avatarUrl");
    console.log("Signing up user for Anup...");

    const user = await dwitter.users("anuprshetty");
    expect(user.name).to.equal("Anup");
    expect(user.bio).to.equal("An ambivert");
    expect(user.avatar).to.equal("avatarUrl");
    console.log("Test signup is successful");

    const userFromAddress = await dwitter.getUser(user1.address);
    expect(userFromAddress.username).to.equal("anuprshetty");
    expect(userFromAddress.name).to.equal("Anup");
    expect(userFromAddress.bio).to.equal("An ambivert");
    expect(userFromAddress.avatar).to.equal("avatarUrl");
    console.log("Test getUser function");

    expect(await dwitter.usernames(user1.address)).to.equal("anuprshetty");

    await expect(dwitter.signup("anuprshetty", "", "", "")).to.be.revertedWith(
      "Username already exists"
    );
    console.log("Test username already exists error");

    await expect(
      dwitter
        .connect(user2)
        .signup("anuprshetty", "Anup Shetty", "someBio", "someAvatar")
    ).to.be.revertedWith("Username is taken, please try another one");
    console.log("Test username is taken error");

    await dwitter.postTweet("Hello world!");
    expect((await dwitter.tweets(0)).content).to.equal("Hello world!");
    console.log("Test postTweet function");

    const tweets = await dwitter.getTweets();
    expect(tweets[0].content).to.equal("Hello world!");
    console.log("Test getTweets function");
  });
});
