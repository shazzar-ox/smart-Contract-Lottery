// 'use client'

import { useWeb3Contract } from "react-moralis"
import { abi, contractAddres } from '../Constants/index'
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { ethers } from 'ethers'
import { useNotification } from "web3uikit"
const LotteryEntrance = () => {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    // chainId comes in bytes code.... chainId:chainIdHex renames the array to chainIdHex
    // console.log(parseInt(chainIdHex))
    const chainId = parseInt(chainIdHex)
    const cAddress = chainId in contractAddres ? contractAddres[chainId] : null
    const [enteranFee, setEnteranceFee] = useState(0)
    const [numPlayer, setNumPlayers] = useState(0)
    const [recentWinner, setRecentWinner] = useState(0)


    // enter raffle function
    const { runContractFunction: enterRaffle } = useWeb3Contract({ abi: abi, contractAddress: cAddress, functionName: 'enterRaffle', params: {}, msgValue: enteranFee })

    //  get enterance fee function
    const { runContractFunction: getEnteranceFee } = useWeb3Contract({ abi: abi, contractAddress: cAddress, functionName: 'getEnteranceFee', params: {} })

    // get number of players function
    const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({ abi: abi, contractAddress: cAddress, functionName: "getNumberOfPlayers", params: {} })

    // get recent winner
    const { runContractFunction: getRecentWinner, isLoading, isFetching } = useWeb3Contract({ abi: abi, contractAddress: cAddress, functionName: "getRecentWinner", params: {} })

    const dispatch = useNotification()

    const updateUi = async () => {
        console.log(abi, cAddress)
        const enteranceFeeFromContract = (await getEnteranceFee()).toString()
        const numPlayers = (await getNumberOfPlayers()).toString()
        const recentWinner = await getRecentWinner()
        setNumPlayers(numPlayers)
        setRecentWinner(recentWinner)
        setEnteranceFee(enteranceFeeFromContract)
        console.log(enteranceFeeFromContract)
    }
    // console.log(getEnteranceFee())
    useEffect(() => {
        if (isWeb3Enabled) {

            updateUi()
        }
    }, [isWeb3Enabled])

    const handleNewNotification = () => {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Tx Notification",
            position: "topR",
            icon: "bell"
        })
    }


    const handleSuccess = async (tx) => {
        await tx.wait(1)
        handleNewNotification(tx)
        updateUi()
    }

    const enterRaff = async () => {
        console.log()
        await enterRaffle({
            onSuccess: handleSuccess,
            onError: (error) => console.log(error)
        })
    }
    return (<>
        <div className="p-5">


            <h1>Hi! From Lottery Entrance</h1>

            {cAddress ?
                <div>
                    <button onClick={enterRaff} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md" disabled={isLoading || isFetching}>{isLoading || isFetching ? (<div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>) : <div>Enter Raffle</div>}</button>

                    <h1>This is lottery Entrance Fee: {ethers.formatUnits(enteranFee, "ether")} ETH</h1>
                    <h2>Number of Players: {numPlayer}</h2>
                    <h2>Recent winner: {recentWinner}</h2>
                </div>

                : <h1>No Raffle Address Found</h1>}
        </div>
    </>)

}

export default LotteryEntrance