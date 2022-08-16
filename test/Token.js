const { expect } = require("chai");
// always in the global scope - optional declaration
const { ethers } = require("hardhat");

describe("Token contract", function () {
  // A unit of test
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    // get an account created in the testing environment
    const [owner] = await ethers.getSigners();

    // get the contract as defined in the "contracts" folder
    const Token = await ethers.getContractFactory("Token");

    // deploy it using the default account created by the testing environment
    const hardhatToken = await Token.deploy();

    // invoke the balanceOf function to check owner balance
    const ownerBalance = await hardhatToken.balanceOf(owner.address);

    // check that the hardcoded value of total supply == the default
    // balance of owner as this will be assigned during deployment
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });

  it("Should transfer tokens between accounts", async function() {
    const [owner, addr1, addr2] = await ethers.getSigners();

    // add the address as a parameter here to change owner
    const Token = await ethers.getContractFactory("Token");

    const hardhatToken = await Token.deploy();

    // Transfer 50 tokens from owner to addr1
    await hardhatToken.transfer(addr1.address, 50);
    expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50);

    // Transfer 50 tokens from addr1 to addr2
    await hardhatToken.connect(addr1).transfer(addr2.address, 50);
    expect(await hardhatToken.balanceOf(addr2.address)).to.equal(50);
  });

  it("Can use another account as owner", async function() {
    const [initial, addr1, addr2] = await ethers.getSigners();

    // add the address as a parameter here to change owner
    const Token = await ethers.getContractFactory("Token", addr1);

    const hardhatToken = await Token.deploy();

    // Transfer 50 tokens from addr1 to initial addr
    await hardhatToken.transfer(initial.address, 50);
    expect(await hardhatToken.balanceOf(initial.address)).to.equal(50);

    // Transfer 50 tokens from addr1 to addr2
    await hardhatToken.connect(initial).transfer(addr2.address, 50);
    expect(await hardhatToken.balanceOf(addr2.address)).to.equal(50);
  });
});