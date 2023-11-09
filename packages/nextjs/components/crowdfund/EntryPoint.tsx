import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

/**
 * EITHER DISPLAYS:
 * Connect Button -- the most simplistic aspects of:
 *      /components/scaffold-eth/RainbowKitCustomConnectButton.tsx
 *
 * OR DISPLAYS:
 * Main buttons of dapp
 */
export const EntryPoint = () => {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted }) => {
        const connected = mounted && account && chain;

        return (
          <>
            {(() => {
              if (!connected) {
                return (
                  <button className="btn btn-primary btn-sm" onClick={openConnectModal} type="button">
                    Connect Wallet
                  </button>
                );
              }

              //entry to dapp
              return (
                <>
                  <Link href="/crowdfund/start-fund-run" passHref className="m-2 btn btn-primary">
                    <div className="tooltip tooltip-primary" data-tip="Start your Fund Run today!">
                      Start Fund Run
                    </div>
                  </Link>

                  <Link href="/crowdfund/browse-fund-runs" passHref className="m-2 btn btn-primary">
                    <div className="tooltip tooltip-primary" data-tip="Donate to projects">
                      Start Donating
                    </div>
                  </Link>
                </>
              );
            })()}
          </>
        );
      }}
    </ConnectButton.Custom>
  );
};
