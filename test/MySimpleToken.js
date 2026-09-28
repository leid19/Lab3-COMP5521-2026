const { expect } = require("chai");

describe("MySimpleToken", function () {
  async function deployToken() {
    const [owner, otherAccount] = await ethers.getSigners();
    const MySimpleToken = await ethers.getContractFactory("MySimpleToken");
    const token = await MySimpleToken.deploy();
    await token.waitForDeployment();
    return { token, owner, otherAccount };
  }

  it("sets the expected name, symbol, and owner", async function () {
    const { token, owner } = await deployToken();
    expect(await token.name()).to.equal("My Simple Token");
    expect(await token.symbol()).to.equal("MST");
    expect(await token.owner()).to.equal(owner.address);
  });

  it("allows the owner to mint tokens", async function () {
    const { token, owner } = await deployToken();
    const amount = ethers.parseUnits("1000", 18);
    await token.mint(owner.address, amount);
    expect(await token.balanceOf(owner.address)).to.equal(amount);
  });

  it("rejects minting by a non-owner", async function () {
    const { token, otherAccount } = await deployToken();
    await expect(
      token.connect(otherAccount).mint(otherAccount.address, ethers.parseUnits("1", 18)),
    ).to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount").withArgs(otherAccount.address);
  });
});
