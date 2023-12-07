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
