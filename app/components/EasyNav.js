'use client'
import React from 'react'
import { ConnectButton } from 'web3uikit'


const EasyNav = () => {
    return (<>
        <div className='p-5  border-b-2 flex'>
            <h1 className='py-4 px-4 font-bold text-3xl' >Decentralized Lottery</h1>
            {/* {console.log(Button)} */}
            <div className='ml-auto py-4 px-2'>
                <ConnectButton moralisAuth={false} />

            </div>
        </div>

    </>)
}
export default EasyNav