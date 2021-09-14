import { AuthState } from './types'
import { AuthDomain } from './domain'

import { getEthereumAccounts, setEthereumAccounts } from './events'

const initialState: AuthState = {
  accounts: []
}

export const $auth = AuthDomain.store<AuthState>(initialState)
  .on(setEthereumAccounts, (state, value) => {
    state = {
      ...state,
      accounts: value
    }
    return state
  })
  .on(getEthereumAccounts.done, (state, { result }) => {
    state = {
      ...state,
      accounts: result
    }
    setEthereumAccounts(result)
    return state
  })

export default { $auth }
