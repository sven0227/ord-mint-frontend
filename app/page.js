'use client'

import DeployPage from '@/components/DeployPage'
import Header from '@/components/Header'
import MintPage from '@/components/MintPage'
import TextInscriptionPage from '@/components/TextInscriptionPage'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { deployUrl, getOrderUrl } from '@/utils/apiRoutes'

export default function Home () {
  const [connected, setConnected] = useState(false)
  const [address, setAddress] = useState('')
  const [orderList, setOrderList] = useState([])
  const [vaultAddress, setVaultAddress] = useState(
    'tb1psjevj4md2jc6m5kxtxetr5dnqhmywm4krtzv9tw2lnutu7l4fxnqftl77p'
  )
  const [feeConstants, setFeeConstants] = useState({
    static_fee: 10000,
    dynamic_fee: 500
  })

  useEffect(() => {
    const fetchOrderList = async () => {
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
    const interval = setInterval(() => {
      fetchOrderList()
    }, 10000)
    fetchOrderList()
    return () => {
      clearInterval(interval)
    }
  }, [])

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
        inscription_receiver_address: address
      }
      console.log('handleDeploy body :>> ', body)
      const { data } = await axios.post(deployUrl, body)
      console.log('handleDeploy :>> ', data)
    } catch (error) {
      console.log('handleDeploy :>> ', error)
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
      <div className='flex flex-row justify-around m-20'>
        <div className='basis-1/3'>
          <DeployPage
            connected={connected}
            orderList={orderList}
            handleDeploy={handleDeploy}
          />
        </div>
        <div className='basis-1/3'>
          <MintPage />
        </div>
        <div className='basis-1/3'>
          <TextInscriptionPage />
        </div>
      </div>
    </main>
  )
}
