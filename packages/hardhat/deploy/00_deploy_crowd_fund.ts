import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { scaffoldDeployWrapper } from "../utils";

const deployCrowdFund: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;
  const owner = "0x1e7aAbB9D0C701208E875131d0A1cFcDAba79350"; //todo change to fe wallet
  await deploy("CrowdFund", {
    from: deployer,
    args: [owner],
    log: true,
    autoMine: true,
  });
};

const wrappedDeploy = scaffoldDeployWrapper(deployCrowdFund);

export default wrappedDeploy;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
wrappedDeploy.tags = ["CrowdFund"];
