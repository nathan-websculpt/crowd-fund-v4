import { ethers } from "hardhat";
import { CrowdFund } from "../typechain-types";
import { formatEther, parseEther } from "ethers/lib/utils";
import { expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber } from "ethers";

describe("__>  Multisig Crowd Fund Test  <__", function () {
  this.timeout(125000);
  let crowdFund: CrowdFund;

  let owner: SignerWithAddress;
  let bob: SignerWithAddress;
  let alice: SignerWithAddress;
  let john: SignerWithAddress;
  let chandler: SignerWithAddress;
  let joey: SignerWithAddress;
  let ross: SignerWithAddress;
  let someoneElse: SignerWithAddress;
  let someoneElseEntirely: SignerWithAddress;

  const getNonce = async (fundRunID: number) => (await crowdFund.getNonce(fundRunID)).add(1);

  const getDigest = async (nonce: BigNumber, amount: BigNumber, to: string, proposedBy: string, reason: string) => {
    const tx = { amount, to, proposedBy, reason };
    const encoded = ethers.utils.defaultAbiCoder.encode(
      ["tuple(uint256,address,address,string)"],
      [[tx.amount, tx.to, tx.proposedBy, tx.reason]],
    );
    const encodedWithNonce = ethers.utils.solidityPack(["bytes", "uint256"], [encoded, nonce]);

    const digest = ethers.utils.keccak256(encodedWithNonce);
    return digest;
  };
  const signMultisigWithdraw = async (
    walletSigning: SignerWithAddress,
    nonce: BigNumber,
    amount: BigNumber,
    to: string,
    proposedBy: string,
    fundRunID: number,
    proposalID: number,
    reason: string,
    sigs: string[],
  ) => {
    const tx = { amount, to, proposedBy, reason };
    return await crowdFund.connect(walletSigning).multisigWithdraw(tx, nonce, fundRunID, proposalID, sigs);
  };

  const createFundRun = async (
    walletSigning: SignerWithAddress,
    title: string,
    description: string,
    owners: string[],
  ) => {
    const tx = await crowdFund.connect(walletSigning).createFundRun(title, description, owners);
    await expect(tx).to.emit(crowdFund, "FundRun");
  };

  describe("Deploying ...", function () {
    it("Should deploy CrowdFund", async function () {
      const [a, b, c, d, e, f, g, h, j] = await ethers.getSigners();
      owner = a;
      bob = b;
      alice = c;
      john = d;
      chandler = e;
      joey = f;
      ross = g;
      someoneElse = h;
      someoneElseEntirely = j;

      const crowdFundFactory = await ethers.getContractFactory("CrowdFund");
      crowdFund = (await crowdFundFactory.deploy(owner.address)) as CrowdFund;
      console.log("deployed CrowdFund at address: ", crowdFund.address);
    });

    it("Contract Owner transferred successfully upon deployment...", async function () {
      await expect(await crowdFund.owner()).to.equal(owner.address);
    });

    describe("Making test Fund Runs (this may take a moment) ...", function () {
      it("Should make a (2-Sig) MULTISIG Fund Run", async function () {
        const ownersArray = [alice.address, john.address];
        await createFundRun(alice, "Alice AND John's Fund Run", "2x MULTISIG FUNDRUN", ownersArray);
      });

      it("Should make a (3-sig) MULTISIG Fund Run", async function () {
        const ownersArray = [chandler.address, joey.address, ross.address];
        await createFundRun(chandler, "Chandler/Joey/Ross Fund Run", "3x MULTISIG FUNDRUN", ownersArray);
      });
    });

    describe("Handling donations", function () {
      it("Should complete all donations to the (2-sig)", async function () {
        const fundRunID = 0;
        const donationAmount = parseEther("1");
        const tx = await crowdFund.connect(someoneElse).donateToFundRun(fundRunID, { value: donationAmount });
        await tx.wait();
      });

      it("Should complete all donations to the (3-sig)", async function () {
        const fundRunID = 1;
        const donationAmount = parseEther("1");
        const tx = await crowdFund.connect(someoneElseEntirely).donateToFundRun(fundRunID, { value: donationAmount });
        await tx.wait();
      });
    });

    describe("Making Proposals", function () {
      it("(2-sig wallet)...Alice proposes to pay John 0.25 Ethers", async function () {
        const fundRunID = 0;
        const proposalID = 0;
        const transferAmount = parseEther("0.25");
        const reason = "Alice proposes to pay John 0.25 Ethers";

        const multisigReq = {
          amount: transferAmount,
          to: john.address,
          proposedBy: alice.address,
          reason: reason,
        };

        const johnFirstBalance = await john.getBalance();
        const johnExpectedBalance = await johnFirstBalance.add(transferAmount);
        console.log("Alice's Address: ", alice.address);
        console.log("John's Address: ", john.address);
        console.log("John has a balance of: ", formatEther(johnFirstBalance));

        const nonce = await getNonce(fundRunID);
        const digest = await getDigest(nonce, transferAmount, john.address, alice.address, reason);

        //sign digest; CREATING proposal;
        const aliceProposal_signature = await alice.signMessage(ethers.utils.arrayify(digest));
        const creationTx = await crowdFund
          .connect(alice)
          .createMultisigProposal(aliceProposal_signature, fundRunID, multisigReq);
        creationTx.wait();

        //sign digest; SUPPORTING proposal;
        const johnSupport_signature = await john.signMessage(ethers.utils.arrayify(digest));
        const supportingTxOne = await crowdFund
          .connect(john)
          .supportMultisigProposal(johnSupport_signature, fundRunID, proposalID);
        supportingTxOne.wait();

        const tx = await signMultisigWithdraw(
          john,
          nonce,
          transferAmount,
          john.address,
          alice.address,
          fundRunID,
          proposalID,
          reason,
          [aliceProposal_signature, johnSupport_signature],
        );
        await tx.wait();
        const johnNewBalance = await john.getBalance();
        console.log("John NOW has a balance of: ", formatEther(johnNewBalance));
        expect(johnNewBalance).to.approximately(johnExpectedBalance, 10000000000000000n);
      });

      //paying someone who is not the owner IS allowed, because a group can pay tertiary parties (like designers, etc)
      it("(2-sig wallet)...John proposes to pay Bob (who is not an owner) 0.75 Ethers", async function () {
        const fundRunID = 0;
        const proposalID = 1;
        const transferAmount = parseEther("0.75");
        const reason = "John proposes to pay Bob (who is not an owner) 0.75 Ethers";
        const multisigReq = { amount: transferAmount, to: bob.address, proposedBy: john.address, reason: reason };

        const bobFirstBalance = await bob.getBalance();
        const bobExpectedBalance = await bobFirstBalance.add(transferAmount);
        console.log("Bob has a balance of: ", formatEther(bobFirstBalance));

        const nonce = await getNonce(fundRunID);
        const digest = await getDigest(nonce, transferAmount, bob.address, john.address, reason);

        //sign digest; CREATING proposal;
        const johnProposal_signature = await john.signMessage(ethers.utils.arrayify(digest));
        const creationTx = await crowdFund
          .connect(john)
          .createMultisigProposal(johnProposal_signature, fundRunID, multisigReq);
        creationTx.wait();

        //sign digest; SUPPORTING proposal;
        const aliceSupport_signature = await alice.signMessage(ethers.utils.arrayify(digest));
        const supportingTxOne = await crowdFund
          .connect(alice)
          .supportMultisigProposal(aliceSupport_signature, fundRunID, proposalID);
        supportingTxOne.wait();

        const tx = await signMultisigWithdraw(
          alice,
          nonce,
          transferAmount,
          bob.address,
          john.address,
          fundRunID,
          proposalID,
          reason,
          [johnProposal_signature, aliceSupport_signature],
        );
        await tx.wait();
        const bobNewBalance = await bob.getBalance();
        console.log("Bob NOW has a balance of: ", formatEther(bobNewBalance));
        expect(bobNewBalance).to.approximately(bobExpectedBalance, 10000000000000000n);
      });

      it("(3-sig wallet)...The Chan-Chan Man proposes to pay Bob 0.5 Ethers", async function () {
        const fundRunID = 1;
        const proposalID = 2;
        const transferAmount = parseEther("0.5");
        const reason = "The Chan-Chan Man proposes to pay Bob (who is not an owner) 0.5 Ethers for web design services";
        const multisigReq = {
          amount: transferAmount,
          to: bob.address,
          proposedBy: chandler.address,
          reason: reason,
        };

        const bobFirstBalance = await bob.getBalance();
        const bobExpectedBalance = await bobFirstBalance.add(transferAmount);
        console.log("Bob has a balance of: ", formatEther(bobFirstBalance));

        const nonce = await getNonce(fundRunID);
        const digest = await getDigest(nonce, transferAmount, bob.address, chandler.address, reason);

        //sign digest; CREATING proposal;
        const chandlerProposal_signature = await chandler.signMessage(ethers.utils.arrayify(digest));
        const creationTx = await crowdFund
          .connect(chandler)
          .createMultisigProposal(chandlerProposal_signature, fundRunID, multisigReq);
        creationTx.wait();

        //sign digest; SUPPORTING proposal;
        const joeySupport_signature = await joey.signMessage(ethers.utils.arrayify(digest));
        const supportingTxOne = await crowdFund
          .connect(joey)
          .supportMultisigProposal(joeySupport_signature, fundRunID, proposalID);
        supportingTxOne.wait();

        //sign digest; SUPPORTING proposal;
        const rossSupport_signature = await ross.signMessage(ethers.utils.arrayify(digest));
        const supportingTxTwo = await crowdFund
          .connect(ross)
          .supportMultisigProposal(rossSupport_signature, fundRunID, proposalID);
        supportingTxTwo.wait();

        const tx = await signMultisigWithdraw(
          ross,
          nonce,
          transferAmount,
          bob.address,
          chandler.address,
          fundRunID,
          proposalID,
          reason,
          [chandlerProposal_signature, joeySupport_signature, rossSupport_signature],
        );
        await tx.wait();
        const bobNewBalance = await bob.getBalance();
        console.log("Bob NOW has a balance of: ", formatEther(bobNewBalance));
        expect(bobNewBalance).to.approximately(bobExpectedBalance, 10000000000000000n);
      });

      it("(3-sig wallet)...Ross proposes to pay Alice 0.5 Ethers", async function () {
        const fundRunID = 1;
        const proposalID = 3;
        const transferAmount = parseEther("0.5");
        const reason = "Ross proposes to pay Alice (who is not an owner) 0.5 Ethers for Project Management services";
        const multisigReq = { amount: transferAmount, to: alice.address, proposedBy: ross.address, reason: reason };

        const aliceFirstBalance = await alice.getBalance();
        const aliceExpectedBalance = await aliceFirstBalance.add(transferAmount);
        console.log("Alice has a balance of: ", formatEther(aliceFirstBalance));

        const nonce = await getNonce(fundRunID);
        const digest = await getDigest(nonce, transferAmount, alice.address, ross.address, reason);

        //sign digest; SUPPORTING proposal;
        const rossCreate_signature = await ross.signMessage(ethers.utils.arrayify(digest));
        const creationTx = await crowdFund
          .connect(ross)
          .createMultisigProposal(rossCreate_signature, fundRunID, multisigReq);
        creationTx.wait();

        //sign digest; SUPPORTING proposal;
        const joeySupport_signature = await joey.signMessage(ethers.utils.arrayify(digest));
        const supportingTxOne = await crowdFund
          .connect(joey)
          .supportMultisigProposal(joeySupport_signature, fundRunID, proposalID);
        supportingTxOne.wait();

        //sign digest; CREATING proposal;
        const chandlerSupport_signature = await chandler.signMessage(ethers.utils.arrayify(digest));
        const supportingTxTwo = await crowdFund
          .connect(chandler)
          .supportMultisigProposal(chandlerSupport_signature, fundRunID, proposalID);
        supportingTxTwo.wait();

        const tx = await signMultisigWithdraw(
          chandler,
          nonce,
          transferAmount,
          alice.address,
          ross.address,
          fundRunID,
          proposalID,
          reason,
          [rossCreate_signature, joeySupport_signature, chandlerSupport_signature],
        );
        await tx.wait();
        const aliceNewBalance = await alice.getBalance();
        console.log("Alice NOW has a balance of: ", formatEther(aliceNewBalance));
        expect(aliceNewBalance).to.approximately(aliceExpectedBalance, 10000000000000000n);
      });
    });
  });
});
