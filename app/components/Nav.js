// 'use client'

import React, { useEffect } from 'react'
import { useMoralis } from 'react-moralis'

const Nav = () => {
  const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnabledLoading } = useMoralis()

  useEffect(() => {
    console.log('yes')
    if (isWeb3Enabled) {
      return
    }else if (localStorage.getItem('connected')) {
      enableWeb3()
    }
    console.log(isWeb3Enabled)
  }, [isWeb3Enabled])

  useEffect(() => {
    Moralis.onAccountChanged((accounts) => {
      console.log(`accounts changed to ${accounts}`)
      if (accounts == null) {
        localStorage.removeItem('connected')
        deactivateWeb3()
        console.log('deactivated....')
      }
    })
  })

  const enable = async () => {
    if (typeof window !== 'undefined') {
      await enableWeb3()
      localStorage.setItem("connected", "injected")
    }

  }
  return (

    <>
      {isWeb3Enabled ? <button>Connected to {account.slice(0, 6)}...{account.slice(account.length - 4)}</button> : <button onClick={enable} style={{ border: "2px solid white" }} disabled={isWeb3EnabledLoading} type='button'> Connect</button>}

    </>

  )
}

export default Nav