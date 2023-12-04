import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { ContractOwnerWithdrawal } from "../generated/schema"
import { ContractOwnerWithdrawal as ContractOwnerWithdrawalEvent } from "../generated/crowdFundTestTwo/crowdFundTestTwo"
import { handleContractOwnerWithdrawal } from "../src/crowd-fund-test-two"
import { createContractOwnerWithdrawalEvent } from "./crowd-fund-test-two-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let contractOwner = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let amount = BigInt.fromI32(234)
    let newContractOwnerWithdrawalEvent = createContractOwnerWithdrawalEvent(
      contractOwner,
      amount
    )
    handleContractOwnerWithdrawal(newContractOwnerWithdrawalEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ContractOwnerWithdrawal created and stored", () => {
    assert.entityCount("ContractOwnerWithdrawal", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ContractOwnerWithdrawal",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "contractOwner",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ContractOwnerWithdrawal",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
