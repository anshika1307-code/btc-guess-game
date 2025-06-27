"use client";
import React, { useEffect } from "react";
import { useAppKitAccount } from "@reown/appkit/react";

const Header = () => {
  const { isConnected } = useAppKitAccount();

  return (
    <div className="py-3  bg-black flex justify-end">
      <div className={`self-end max-w-fit rounded-full px-3 ${isConnected ? 'border-2 border-gray-600' : ''}`}>
        <appkit-button />
      </div>
    </div>
  );
};

export default Header;