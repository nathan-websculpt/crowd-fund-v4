//NOTE: tests not updated from V2 yet

//yarn test ./test/CrowdFundTest.ts
import { ethers } from "hardhat";
import { CrowdFund } from "../typechain-types";
import { formatEther, parseEther } from "ethers/lib/utils";
import { expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber } from "ethers";

describe("CrowdFund", function () {
  let crowdFund: CrowdFund;
  let totalContractBalance = parseEther("0");
  const alicesId = 1;
  const johnsId = 2;
  type ExpectedAmounts = {
    commission: BigNumber;
    lessCommission: BigNumber;
  };

  //creates a Fund Run as bob, alice, or john ... then checks the Event
  const createFundRun = async (
    walletSigning: SignerWithAddress,
    title: string,
    description: string,
    targetAmount: BigNumber,
    deadline: number,
    owners: string[],
  ) => {
    const tx = await crowdFund.connect(walletSigning).createFundRun(title, description, targetAmount, deadline, owners);
    await expect(tx).to.emit(crowdFund, "FundRun");
  };

  //donates to a Fund Run
  const donateToFundRun = async (walletSigning: SignerWithAddress, fundRunId: number, donationAmount: BigNumber) => {
    console.log("\nwallet balance PRE-donation:  ", formatEther(await walletSigning.getBalance()));
    const tx = await crowdFund.connect(walletSigning).donateToFundRun(fundRunId, { value: donationAmount });
    await expect(tx).to.emit(crowdFund, "Donation").withArgs(fundRunId, walletSigning.address, donationAmount);
    console.log("wallet balance POST-donation: ", formatEther(await walletSigning.getBalance()));

    totalContractBalance = totalContractBalance.add(donationAmount);

    const contractBalance = await crowdFund.getBalance();
    expect(contractBalance).to.equal(totalContractBalance);
  };

  const getExpectedAmts = (beforeContractCommission: number) => {
    const comm = (0.25 / 100) * beforeContractCommission; //0.25%
    const lessCommission = beforeContractCommission - comm;
    const rslt: ExpectedAmounts = {
      commission: parseEther(comm.toString()),
      lessCommission: parseEther(lessCommission.toString()),
    };
    return rslt;
  };

  describe("Deploying ...", function () {
    this.timeout(125000); //2-minute timeout, Fund Runs have 1-minute deadlines

    it("Should deploy CrowdFund", async function () {
      const [owner] = await ethers.getSigners();
      const crowdFundFactory = await ethers.getContractFactory("CrowdFund");
      crowdFund = (await crowdFundFactory.deploy(owner.address)) as CrowdFund;
      console.log("deployed CrowdFund at address: ", crowdFund.address);
    });

    it("Contract Owner transferred successfully upon deployment...", async function () {
      const [owner] = await ethers.getSigners();
      await expect(await crowdFund.owner()).to.equal(owner.address);
    });

    describe("Making test Fund Runs (this may take a moment) ...", function () {
      it("Should make 3 test Fund Runs", async function () {
        const [, bob, alice, john] = await ethers.getSigners();
        const deadlineToCreateWith = 1;

        await createFundRun(bob, "Bob's Fund Run", "Bob's Description", parseEther("1"), deadlineToCreateWith, [
          bob.address,
        ]);
        await createFundRun(alice, "Alice's Fund Run", "Alice's Description", parseEther("2"), deadlineToCreateWith, [
          alice.address,
        ]);
        await createFundRun(john, "John's Fund Run", "John's Description", parseEther("3"), deadlineToCreateWith, [
          john.address,
        ]);
      });
    });

    describe("Testing the ability for users to donate ...", function () {
      it("Should allow Bob to donate to Alice", async function () {
        const amountToDonate = parseEther("1");
        const [, bob] = await ethers.getSigners();
        await donateToFundRun(bob, alicesId, amountToDonate);
      });

      it("Should allow John to donate to Alice", async function () {
        const amountToDonate = parseEther("1");
        const [, , , john] = await ethers.getSigners();
        await donateToFundRun(john, alicesId, amountToDonate);
      });

      it("Should allow Bob to donate to John", async function () {
        const amountToDonate = parseEther("1");
        const [, bob] = await ethers.getSigners();
        await donateToFundRun(bob, johnsId, amountToDonate);
      });

      it("Should allow Alice to donate to John", async function () {
        const amountToDonate = parseEther("1");
        const [, , alice] = await ethers.getSigners();
        await donateToFundRun(alice, johnsId, amountToDonate);
      });
    });

    describe("Force-Ending Fund Runs... ", function () {
      it("Should allow for Alice to do an 'Owner Withdrawal' because her Fund was successful", async function () {
        const [, , alice] = await ethers.getSigners();
        const endFundRun_Tx = await crowdFund.connect(alice).forceEnd(alicesId);
        endFundRun_Tx.wait();

        const expected = getExpectedAmts(2);
        const expectedAmount = expected.lessCommission;
        console.log("\nALICE'S wallet balance PRE-withdrawal:  ", formatEther(await alice.getBalance()));
        const tx = await crowdFund.connect(alice).fundRunOwnerWithdraw(alicesId);
        await expect(tx).to.emit(crowdFund, "OwnerWithdrawal");
        console.log("ALICE'S wallet balance POST-withdrawal: ", formatEther(await alice.getBalance()));

        totalContractBalance = totalContractBalance.sub(expectedAmount);
        const contractBalance = await crowdFund.getBalance();
        expect(contractBalance).to.equal(totalContractBalance);
      });

      it("Should allow for Bob to do a 'Donor Withdrawal' from John's Fund Run", async function () {
        const [, bob] = await ethers.getSigners();
        const endFundRun_Tx = await crowdFund.connect(bob).forceEnd(johnsId);
        endFundRun_Tx.wait();

        console.log("\nBOB'S wallet balance PRE-withdrawal:  ", formatEther(await bob.getBalance()));
        const tx = await crowdFund.connect(bob).fundRunDonorWithdraw(johnsId);
        await expect(tx).to.emit(crowdFund, "DonorWithdrawal");
        console.log("BOB'S wallet balance POST-withdrawal: ", formatEther(await bob.getBalance()));

        totalContractBalance = totalContractBalance.sub(parseEther("1"));
        const contractBalance = await crowdFund.getBalance();
        expect(contractBalance).to.equal(totalContractBalance);
      });

      it("Should allow for Alice to do a 'Donor Withdrawal' from John's Fund Run", async function () {
        const [, , alice] = await ethers.getSigners();
        const endFundRun_Tx = await crowdFund.connect(alice).forceEnd(johnsId);
        endFundRun_Tx.wait();

        console.log("\nALICE'S wallet balance PRE-withdrawal:  ", formatEther(await alice.getBalance()));
        const tx = await crowdFund.connect(alice).fundRunDonorWithdraw(johnsId);
        await expect(tx).to.emit(crowdFund, "DonorWithdrawal");
        console.log("ALICE'S wallet balance POST-withdrawal: ", formatEther(await alice.getBalance()));

        totalContractBalance = totalContractBalance.sub(parseEther("1"));
        const contractBalance = await crowdFund.getBalance();
        expect(contractBalance).to.equal(totalContractBalance);
      });
    });

    describe("Can Contract Owner withdraw ...", function () {
      it("Should allow contract owner to withdraw 0.005 ethers", async function () {
        const [owner] = await ethers.getSigners();

        const contractBalance = await crowdFund.getBalance();
        console.log("__>>: total contract balance: ", formatEther(contractBalance));

        console.log("\nCONTRACT OWNER'S wallet balance PRE-withdrawal:  ", formatEther(await owner.getBalance()));
        const tx = await crowdFund.connect(owner).contractOwnerWithdraw();
        await expect(tx).to.emit(crowdFund, "ContractOwnerWithdrawal").withArgs(owner.address, contractBalance);
        console.log("CONTRACT OWNER'S wallet balance POST-withdrawal:  ", formatEther(await owner.getBalance()));
      });
    });
  });
});
