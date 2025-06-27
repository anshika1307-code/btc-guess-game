
import type {
  Provider
} from '@reown/appkit'

export interface BitcoinConnector extends Provider {
  getAccountAddresses(): Promise<BitcoinConnector.AccountAddress[]>;
  signMessage(params: BitcoinConnector.SignMessageParams): Promise<string>;
  sendTransfer(params: BitcoinConnector.SendTransferParams): Promise<string>;
  signPSBT(
    params: BitcoinConnector.SignPSBTParams
  ): Promise<BitcoinConnector.SignPSBTResponse>;
}
export namespace BitcoinConnector {
  export type AccountAddress = {
    address: string
    publicKey?: string
    path?: string
    purpose: 'payment' | 'ordinal' | 'stx'
  }

  export type SignMessageParams = {
    message: string
  }

  export type SendTransferParams = {
    to: string
    amount: number
  }

  export type SignPSBTParams = {
    psbt: string
  }

  export type SignPSBTResponse = {
    psbt: string
    txid?: string
  }
}
