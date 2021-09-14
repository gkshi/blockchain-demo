import { AuthDomain } from './domain'
import { Accounts } from './types'

export const getEthereumAccounts = AuthDomain.effect<void, Accounts>().use(async () => {
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }).catch(() => [])
  return accounts
})

export const setEthereumAccounts = AuthDomain.event<Accounts>()
