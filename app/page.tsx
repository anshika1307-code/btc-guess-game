"use client";
import React,{useState} from "react";
import { request, AddressPurpose, RpcErrorCode } from 'sats-connect';
import { Button } from "@/components/ui/button";
import { WalletState } from "@/types/wallet_connection";

export default function IndexPage() {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    isLoading: false
  });
  const Connect_To_Wallet = async () => {
    setWallet(prev => ({ ...prev, isLoading: true, error: undefined }));
    try {
      
      const response = await request('wallet_connect', null);
      if (response.status === 'success') {
        const paymentAddressItem = response.result.addresses.find(
          (address: { purpose: AddressPurpose }) => address.purpose === AddressPurpose.Payment
        );
        const ordinalsAddressItem = response.result.addresses.find(
          (address: { purpose: AddressPurpose }) => address.purpose === AddressPurpose.Ordinals
        );
        const stacksAddressItem = response.result.addresses.find(
          (address: { purpose: AddressPurpose }) => address.purpose === AddressPurpose.Stacks
        );
        console.log("Wallet Connection Response ==>",response)
        setWallet({
          isConnected: true,
          isLoading: false,
          paymentAddress: paymentAddressItem?.address,
          ordinalsAddress: ordinalsAddressItem?.address,
          stacksAddress: stacksAddressItem?.address
        });
      } else {
        if (response.error.code === RpcErrorCode.USER_REJECTION) {
          
          console.log("User rejected the connection request");
        } else {
          
          console.error("Error connecting to wallet:", response.error);
        }
      }
    } catch (err: any) {
      alert(err.error?.message || "An unknown error occurred");
      setWallet(prev => ({
        ...prev,
        isLoading: false,
        error: err.message || "Failed to connect to wallet"
      }));
    }
  };


  const disconnectWallet = async () => {
    setWallet(prev => ({ ...prev, isLoading: true }));
    
    try {
      const response = await request('wallet_disconnect', null);
      
      if (response.status === 'success') {
        setWallet({
          isConnected: false,
          isLoading: false,
          paymentAddress: undefined,
          ordinalsAddress: undefined,
          stacksAddress: undefined
        });
      } else {
        throw new Error(response.error?.message || "Failed to disconnect");
      }
    } catch (err: any) {
      setWallet(prev => ({
        ...prev,
        isLoading: false,
        error: err.message || "Failed to disconnect from wallet"
      }));
    }
  };

  return (
    <div className="flex  justify-center gap-4 mt-4">
      {!wallet.isConnected ? (
        <Button 
          onClick={Connect_To_Wallet}
          disabled={wallet.isLoading}
          className="px-10 py-3 bg-blue-600 text-white rounded-3xl"
        >
          {wallet.isLoading ? "Connecting..." : "Connect Wallet"}
        </Button>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="font-medium">Connected Addresses:</p>
            {wallet.paymentAddress && (
              <p>Payment: <code>{wallet.paymentAddress}</code></p>
            )}
            {wallet.ordinalsAddress && (
              <p>Ordinals: <code>{wallet.ordinalsAddress}</code></p>
            )}
            {wallet.stacksAddress && (
              <p>Stacks: <code>{wallet.stacksAddress}</code></p>
            )}
          </div>
          
          <Button 
            onClick={disconnectWallet}
            disabled={wallet.isLoading}
            variant="destructive"
            className="px-10 py-4"
          >
            {wallet.isLoading ? "Disconnecting..." : "Disconnect Wallet"}
          </Button>
        </div>
      )}

      {wallet.error && (
        <div className="text-red-500 text-sm p-2 rounded bg-red-50">
          {wallet.error}
          {wallet.error.includes("extension") && (
            <a 
              href="https://www.hiro.so/wallet/install-web" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline block mt-1"
            >
              Download Wallet
            </a>
          )}
        </div>
      )}
    </div>
  );
}