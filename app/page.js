'use client'
import Image from 'next/image'
import Nav from './components/Nav'
import EasyNav from './components/EasyNav'
import LotteryEntrance from './components/LotteryEntrance'
import { useMoralis } from 'react-moralis'
import { NotificationProvider } from 'web3uikit'


export default function Home() {
  const { enableWeb3, account } = useMoralis()

  return (
    <>
    <NotificationProvider>
      <EasyNav />

      <LotteryEntrance/>
      </NotificationProvider>
      {/* <Nav /> */}
      {/* <h1>hello  main</h1> */}
    </>
  )
}
