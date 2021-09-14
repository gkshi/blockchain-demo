import React, { useState } from 'react'
import { useStore } from 'effector-react'
import { $auth } from '../../store/auth/store'
import { openModal } from '../../store/modals/events'

import UIButton from '../../components/ui/button'

import './_index.scss'

function HomePage () {
  const accounts = useStore($auth).accounts
  const isMetaMask = () => {
    return window.ethereum.isMetaMask.toString()
  }

  const openSampleModal = () => {
    openModal('sample')
  }

  const isEthereum = () => !!window.ethereum

  return (
    <div className="page -home">
      <section>
        <div>home page</div>
      </section>

      {isEthereum()
        ? <section>
          <div>
            ethereum.isMetaMask: {isMetaMask()}
          </div>
          <div>
            <div>accounts: {accounts}</div>
          </div>
      </section>
        : <section>
        <div>metamask is not installed</div>
      </section>}

      <section>
        <div>
          <a href="#" onClick={openSampleModal}>open sample modal</a>
        </div>
      </section>
    </div>
  )
}

export default HomePage
