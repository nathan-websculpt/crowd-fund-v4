//FROM: https://github.com/FilipHarald/scaffold-eth-2-sandbox/commit/f9f091dc4db41c42293d18215d6fafe36b26d684
//feat/insufficient_funds_popup
//By: FilipHarald
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

export const scaffoldDeployWrapper = function (func: DeployFunction): DeployFunction {
  return async function (hre: HardhatRuntimeEnvironment) {
    try {
      await func(hre);
    } catch (e: any) {
      if (e.code === "INSUFFICIENT_FUNDS") {
        try {
          const relevantMessage = e.error.stack.split("ProviderError: ")[1].split("\n")[0];
          const { deployer } = await hre.getNamedAccounts();
          console.log(`❌ Deploy script aborted due to ${relevantMessage}.`);
          console.log(`Deployer wallet: ${deployer}`);
        } catch (e: any) {}
      }
    }
  };
};
