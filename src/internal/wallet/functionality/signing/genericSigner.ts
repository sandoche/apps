import { Sender, TxGenerated } from "@evmos/transactions";
import {
  signBackendTxWithKeplr,
  signEvmosjsTxWithKeplr,
} from "../keplr/keplrSigner";
import {
  signBackendTxWithMetamask,
  signEvmosjsTxWithMetamask,
} from "../metamask/metamaskSigner";
import {
  broadcastEip712BackendTxToBackend,
  broadcastSignedTxToBackend,
  RawTx,
  TxGeneratedByBackend,
} from "../signing";
import { KEPLR_KEY, METAMASK_KEY } from "../wallet";

export class Signer {
  keplrBackendData: { tx: RawTx; sender: string; network: string } | null =
    null;
  metamaskBackendData: {
    chainId: string;
    address: string;
    signature: string;
    body: string;
    auth: string;
  } | null = null;
  currentExtension: string | null = null;

  reset() {
    this.keplrBackendData = null;
    this.metamaskBackendData = null;
  }

  async signEvmosjsTx(
    sender: Sender,
    tx: TxGenerated,
    chainId: string,
    currentExtension: string
  ) {
    if (currentExtension === METAMASK_KEY) {
      return signEvmosjsTxWithMetamask(sender, tx);
    }

    if (currentExtension === KEPLR_KEY) {
      return signEvmosjsTxWithKeplr(sender, tx, chainId);
    }

    return {
      result: false,
      message: `Error signing the tx: Extension not supported`,
      transaction: null,
    };
  }

  async signBackendTx(
    sender: string,
    tx: TxGeneratedByBackend,
    network: string,
    currentExtension: string
  ) {
    this.reset();
    if (currentExtension === METAMASK_KEY) {
      const res = await signBackendTxWithMetamask(sender, tx);
      if (res.signature === null) {
        return {
          result: res.result,
          message: res.message,
        };
      }
      this.metamaskBackendData = {
        chainId: tx.chainId,
        address: sender,
        signature: res.signature,
        body: tx.legacyAmino.body,
        auth: tx.legacyAmino.authInfo,
      };
      this.currentExtension === METAMASK_KEY;
      return {
        result: res.result,
        message: res.message,
      };
    }

    if (currentExtension === KEPLR_KEY) {
      const res = await signBackendTxWithKeplr(sender, tx);
      if (res.transaction === null) {
        return {
          result: res.result,
          message: res.message,
        };
      }
      this.keplrBackendData = { tx: res.transaction, sender, network };
      this.currentExtension === KEPLR_KEY;
      return {
        result: res.result,
        message: res.message,
      };
    }

    return {
      result: false,
      message: `Error signing the tx: Extension not supported`,
    };
  }

  // TODO: add support to broadcast EvmosJS transactions
  async broadcastTxToBackend() {
    // Metamask
    if (this.currentExtension === METAMASK_KEY) {
      if (this.metamaskBackendData == null) {
        return {
          error: true,
          message: `There is no transaction to be signed`,
          txhash: `0x0`,
        };
      }
      // Broadcast
      return await broadcastEip712BackendTxToBackend(
        cosmosChainIdToEth(this.metamaskBackendData.chainId),
        this.metamaskBackendData.address,
        this.metamaskBackendData.signature,
        this.metamaskBackendData.body,
        this.metamaskBackendData.auth
      );
    }
    // Keplr
    if (this.currentExtension === KEPLR_KEY) {
      if (this.keplrBackendData == null) {
        return {
          error: true,
          message: `There is no transaction to be signed`,
          txhash: `0x0`,
        };
      }
      // Broadcast
      return broadcastSignedTxToBackend(
        this.keplrBackendData.tx,
        this.keplrBackendData.sender,
        this.keplrBackendData.network
      );
    }
    return {
      error: true,
      message: `Invalid wallet extension`,
      txhash: `0x0`,
    };
  }
}

// TODO: move this to utils
function cosmosChainIdToEth(chainId: string) {
  const start = chainId.indexOf("_");
  const end = chainId.indexOf("-");
  if (start !== undefined && end !== undefined) {
    try {
      return parseInt(chainId.substring(start + 1, end), 10);
    } catch (e) {
      return -1;
    }
  }
  return -1;
}
