"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";

export default function IndexPage() {
  const { user, connectToWallet, disconnectWallet } = useUser();
  // console.log("User ==>",user)
  return (
    <div className="flex justify-center gap-4 mt-4">
      {!user?.isConnected ? (
        <Button 
          onClick={connectToWallet}
          disabled={user?.isLoading}
          className="px-10 py-3 bg-blue-600 text-white rounded-3xl"
        >
          {user?.isLoading ? "Connecting..." : "Connect Wallet"}
        </Button>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="font-medium">Connected Addresses:</p>
            {user?.payment_address && (
              <p>Payment: {user.payment_address}</p>
            )}
            {user?.ordinal_address && (
              <p>Ordinals: {user.ordinal_address}</p>
            )}
            {user?.balance !== undefined && (
              <p>Balance: {user.balance} sats</p>
            )}
          </div>
          
          <Button 
            onClick={disconnectWallet}
            disabled={user?.isLoading}
            variant="destructive"
            className="px-10 py-4"
          >
            {user?.isLoading ? "Disconnecting..." : "Disconnect Wallet"}
          </Button>
        </div>
      )}

      {user?.error && (
        <div className="text-red-500 text-sm p-2 rounded bg-red-50">
          {user.error}
          {user.error.includes("extension") && (
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