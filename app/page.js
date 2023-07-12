'use client'

import DeployPage from '@/components/DeployPage'
import Header from '@/components/Header'
import MintPage from '@/components/MintPage'
import TextInscriptionPage from '@/components/TextInscriptionPage'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import {
  deployUrl,
  getOrderUrl,
  mintUrl,
  textInscribeUrl
} from '@/utils/apiRoutes'

export default function Home () {
  const [connected, setConnected] = useState(false)
  const [address, setAddress] = useState(null)
  const [receiverAddress, setReceiverAddress] = useState('')
  const [orderList, setOrderList] = useState([])
  const [vaultAddress, setVaultAddress] = useState(
    'tb1psjevj4md2jc6m5kxtxetr5dnqhmywm4krtzv9tw2lnutu7l4fxnqftl77p'
  )
  const [feeConstants, setFeeConstants] = useState({
    static_fee: 546,
    dynamic_fee: 500 + 1000
  })

  useEffect(() => {
    const interval = setInterval(() => {
      fetchOrderList()
    }, 10000)
    fetchOrderList()
    setReceiverAddress(address)
    return () => {
      clearInterval(interval)
    }
  }, [address])

  const fetchOrderList = async () => {
    if (!address) return
    try {
      console.log('object')
      const { data } = await axios.post(getOrderUrl, {
        btc_sender_address: address
      })
      console.log('fetchOrderList :>> ', data)
      const sortedOrder = data.data.sort((a, b) => b.timestamp - a.timestamp)
      setOrderList(sortedOrder)
    } catch (error) {
      console.log('error :>> ', error)
      return []
    }
  }

  const handleConnect = async () => {
    if (window.unisat) {
      await window.unisat.switchNetwork('testnet')
      const addresses = await window.unisat.getAccounts()
      setAddress(addresses[0])
      setConnected(true)
    }
  }

  const handleDeploy = async (tick, maxSupply) => {
    try {
      handleConnect()
      console.log('tick, maxSupply :>> ', tick, maxSupply)
      const fee = feeConstants.static_fee + feeConstants.dynamic_fee * 1 // feeRate on testnet
      const txid = await window.unisat.sendBitcoin(vaultAddress, fee)
      const body = {
        txid: txid,
        fee_rate: 1,
        token_tick: tick,
        max_supply: Number(maxSupply),
        btc_sender_address: address,
        inscription_receiver_address: receiverAddress
      }
      console.log('handleDeploy body :>> ', body)
      const { data } = await axios.post(deployUrl, body)
      fetchOrderList()
      console.log('handleDeploy :>> ', data)
    } catch (error) {
      console.log('handleDeploy :>> ', error)
    }
  }

  const handleMint = async (tick, mintAmount) => {
    try {
      handleConnect()
      console.log('tick, maxSupply :>> ', tick, mintAmount)
      const fee = feeConstants.static_fee + feeConstants.dynamic_fee * 1 // feeRate on testnet
      const txid = await window.unisat.sendBitcoin(vaultAddress, fee)
      const body = {
        txid: txid,
        fee_rate: 1,
        token_tick: tick,
        mint_amount: Number(mintAmount),
        btc_sender_address: address,
        inscription_receiver_address: receiverAddress
      }
      console.log('handleMint body :>> ', body)
      const { data } = await axios.post(mintUrl, body)
      fetchOrderList()
      console.log('handleMint :>> ', data)
    } catch (error) {
      console.log('handleMint error :>> ', error)
    }
  }

  const handleInscribeText = async text => {
    try {
      handleConnect()
      console.log('text :>> ', text)
      const fee = feeConstants.static_fee + feeConstants.dynamic_fee * 1 // feeRate on testnet
      const txid = await window.unisat.sendBitcoin(vaultAddress, fee)
      const body = {
        txid: txid,
        fee_rate: 1,
        inscription_text: text,
        btc_sender_address: address,
        inscription_receiver_address: receiverAddress
      }
      console.log('handleInscribeText body :>> ', body)
      const { data } = await axios.post(textInscribeUrl, body)
      fetchOrderList()
      console.log('handleInscribeText result:>> ', data)
    } catch (error) {
      console.log('handleInscribeText error :>> ', error)
    }
  }

  return (
    <main className='min-h-screen'>
      <Header
        connected={connected}
        address={address}
        setConnected={setConnected}
        setAddress={setAddress}
        handleConnect={handleConnect}
      />
      <section className='mx-10'>
        <div className='flex flex-col mx-40'>
          <label className='p-2'>Receiver address: </label>
          <input
            className='form-control'
            type='text'
            value={receiverAddress}
            onChange={e => setReceiverAddress(e.target.value)}
          />
        </div>
        <div className='flex flex-row justify-around mx-20'>
          <div className='w-1/3 md:w-full'>
            <DeployPage
              connected={connected}
              orderList={orderList}
              handleDeploy={handleDeploy}
            />
          </div>
          <div className='w-1/3 md:w-full'>
            <MintPage orderList={orderList} handleMint={handleMint} />
          </div>
          <div className='w-1/3 md:w-full'>
            <TextInscriptionPage
              orderList={orderList}
              handleInscribeText={handleInscribeText}
            />
          </div>
        </div>
      </section>
    </main>
  )
}
