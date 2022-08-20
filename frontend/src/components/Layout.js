import React, { useEffect, useState } from 'react'
import './Layout.css'
import Web3 from 'web3'
import contract from '../blockchain/lottery'

const Layout = () => {
  const [error, seterror] = useState('')
  const [successmsg, setsuccessmsg] = useState()
  const [inventory, setinventory] = useState('')
  const [mybalance, setmybalance] = useState('')
  const [buycount, setbuycount] = useState('')
  const [web3, setweb3] = useState(null)
  const [address, setaddress] = useState(null)
  const [tokencontract, settokencontract] = useState(null)

  useEffect(() => {
    if(tokencontract) getInventoryHandler()
    if(tokencontract && address) getMyBalanceHandler()
  }, [tokencontract, address])

  const getInventoryHandler = async () => {
    const inventory = await tokencontract.methods.gettokenBalance().call()
    setinventory(inventory)
  }

  const getMyBalanceHandler = async () => {
    // const accounts = await web3.eth.getAccounts();
    const balance = await tokencontract.methods.donutBalances(address).call()
    setmybalance(balance)
  }

  const updateCount = async (e) => {
    // e.preventDefault()
    // console.log(e.target.value)
    setbuycount(e.target.value)
  }

  const buyHandler = async () => {
    try{
      // console.log('buy',buycount)
      // const accounts = await web3.eth.getAccounts();
      await tokencontract.methods.purchase(buycount).send({
        from: address,
        value: web3.utils.toWei('0.001', 'ether') * buycount
      })
      setsuccessmsg(`${buycount}purchase successful`)
      if(tokencontract) getInventoryHandler()
      if(tokencontract && address) getMyBalanceHandler()
    }
    catch(err){
      seterror(err.message)
    }

  }

  const connectWalletHandler = async () => {
    console.log('connect')
    seterror('')
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const web = new Web3(window.ethereum)
        setweb3(web)
        const accounts = await web3.eth.getAccounts();
        setaddress(accounts[0])
        const kk = contract(web3);
        settokencontract(kk)
      } catch (error) {
        //console.log(error.message)
        seterror(error.message)
      } 
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  return (
    <div>
      <button onClick={connectWalletHandler}>Connect Wallet</button>
      <div>inventory: {inventory}</div>
      <div>my balance: {mybalance}</div>

      <form>
        {/* <label>Buy</label> */}
        <input onChange={updateCount} type="type" placeholder='enter amount'/>
        <input type="button" onClick={buyHandler} value="Buy"/>
      </form>

      <p>{error}</p>
      <p>{successmsg}</p>
    </div>
    
  )
}

export default Layout