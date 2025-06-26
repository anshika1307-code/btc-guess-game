"use client";
import { useContext } from 'react';
import { AccountContext } from '@/contexts/AccountContext';
import { request, AddressPurpose, RpcErrorCode } from 'sats-connect';
import { setCookie, destroyCookie } from 'nookies';


export const useUser = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useUser must be used within an AccountContextProvider');
  }
  
  const { user, setUser } = context;

  const connectToWallet = async () => {
    setUser({
      
      isLoading: true,
      error: undefined
    });
    
    try {
      const response = await request('wallet_connect', null);
      
      if (response.status === 'success') {
        const paymentAddressItem = response.result.addresses.find(
          (address: { purpose: AddressPurpose }) => address.purpose === AddressPurpose.Payment
        );
        const ordinalsAddressItem = response.result.addresses.find(
          (address: { purpose: AddressPurpose }) => address.purpose === AddressPurpose.Ordinals
        );
        
        let balance = 0;
        if (paymentAddressItem?.address) {
          const balanceResponse = await request('getBalance', null);
          if (balanceResponse.status === 'success') {
            balance = Number(balanceResponse.result?.total);
          }
        }

        const updatedUser = {
            isConnected: true,
            isLoading: false,
            payment_address: paymentAddressItem?.address,
            ordinal_address: ordinalsAddressItem?.address,
            balance: balance,
            error: undefined
          };
          
          setUser(updatedUser);
          
          setCookie(null, 'userData', JSON.stringify(updatedUser), {
            maxAge: 30 * 24 * 60 * 60, // 30 days
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
          });
          
      } else {
        throw new Error(response.error.message || 'Failed to connect');
      }
    } catch (err: any) {
      setUser({
        isLoading: false,
        error: err.message || 'Failed to connect to wallet'
      });
      throw err;
    }
  };

  const disconnectWallet = async () => {
    setUser({
      
      isLoading: true
  });
    
    try {
      const response = await request('wallet_disconnect', null);
      
      if (response.status === 'success') {
        setUser({
          isConnected: false,
          isLoading: false,
          payment_address: undefined,
          ordinal_address: undefined,
          balance: undefined,
          error: undefined
        });
        destroyCookie(null, 'userData', { path: '/' });
      } else {
        throw new Error(response.error?.message || 'Failed to disconnect');
      }
    } catch (err: any) {
      setUser({
        isLoading: false,
        error: err.message || 'Failed to disconnect from wallet'
      });
      throw err;
    }
  };

  return {
    user,
    connectToWallet,
    disconnectWallet
  };
};