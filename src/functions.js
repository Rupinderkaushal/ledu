import abi from './abis/SmartChefInitializable.json'
import bep20 from './abis/IBEP20.json'
import Web3 from 'web3'


const provider = new Web3.providers.HttpProvider(process.env.REACT_APP_RPC)

export const web3 = new Web3(provider)


const smartCHef = new web3.eth.Contract(
  abi.abi,
  '0xbc046d9cDD95E171E5cD62e57f6cB0f293bb8206'
)

const ledu = new web3.eth.Contract(bep20.abi,'0x73e7040B225bF6bB72F511e954e845CF4c218685')

const ethereum = window.ethereum


export async function stake(amt) {
    try {
        if (typeof ethereum !== "undefined" && ethereum !== "") {
          const tx = smartCHef.methods.deposit(amt).encodeABI()
          const transactionParameters = {
            to: '0xbc046d9cDD95E171E5cD62e57f6cB0f293bb8206',
            from: ethereum.selectedAddress,
            data: tx,
          }
          await ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
          })
        } else {
          console.log("Please install MetaMask!")
        }
      } catch (e) {
        console.log(e.message)
      }
}
export async function withdraw(amt) {
  try {
      if (typeof ethereum !== "undefined" && ethereum !== "") {
        const tx = smartCHef.methods.withdraw(amt).encodeABI()
        const transactionParameters = {
          to: '0xbc046d9cDD95E171E5cD62e57f6cB0f293bb8206',
          from: ethereum.selectedAddress,
          data: tx,
        }
        await ethereum.request({
          method: "eth_sendTransaction",
          params: [transactionParameters],
        })
      } else {
        console.log("Please install MetaMask!")
      }
    } catch (e) {
      console.log(e.message)
    }
}

export async function approve(input){
  try {
    if(String(input).match(/^(?!1$)\d+$/) === null) {
        window.alert('1 and . are invalid');
        return;
      }
    if (typeof ethereum !== "undefined" && ethereum !== "") {
      const tx = ledu.methods.approve('0xbc046d9cDD95E171E5cD62e57f6cB0f293bb8206','1000000000000000000000000000').encodeABI()
      const transactionParameters = {
        to: '0x73e7040B225bF6bB72F511e954e845CF4c218685',
        from: ethereum.selectedAddress,
        data: tx,
      }
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      })
    } else {
      console.log("Please install MetaMask!")
    }
  } catch (e) {
    console.log(e.message)
  }
}

export async function getStakedInfo(){
  if(typeof ethereum !=="undefined" && ethereum !==""){
    if(ethereum.selectedAddress != null){
      const info = await smartCHef.methods.userInfo(ethereum.selectedAddress).call()
      return [info.amount/(10**18),info.rewardDebt/(10**18)]
    }
  }
}

export async function getBalance(){
  
  if (typeof ethereum !== "undefined" && ethereum !== ""){
    if (ethereum.selectedAddress != null) {
      const balance = await ledu.methods.balanceOf(ethereum.selectedAddress).call()
      const allowance = await ledu.methods.allowance(ethereum.selectedAddress,'0xbc046d9cDD95E171E5cD62e57f6cB0f293bb8206').call()
      return [(balance/10**18),allowance]
    }
  }else{
    return "Wallet not Connected"
  }
  
}