import React, { FormEvent, useState } from 'react'
import { useStore } from 'effector-react'
import { $auth } from '../../../store/auth/store'
import { closeModal } from '../../../store/modals/events'
import { nextTick } from '../../../helpers/next-tick'

import ModalWrapper from '../wrapper'
import UIButton from '../../ui/button'
import UIInput from '../../ui/input'

import './_index.scss'

function SendTransactionModal () {
  const id = 'send_transaction'
  const accounts = useStore($auth).accounts
  const [to, setTo] = useState('')
  const [value, setValue] = useState('')

  const toField = React.createRef()

  const send = (e: FormEvent) => {
    e.preventDefault()
    console.log('send')
    window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: accounts[0],
          to,
          value,
          gasPrice: '0x09184e72a000',
          gas: '0x2710'
        }
      ]
    })
      .then((txHash: any) => console.log(txHash))
      .catch((error: any) => console.error(error))
  }

  const onOpen = () => {
    nextTick(() => {
      (toField.current as any)?.focus()
    })
  }

  return (
    <ModalWrapper id={id} heading="Send transaction" onOpen={onOpen} onConfirm={send}>
      {/* <div className="modal-subtitle"></div> */}
      <div className="modal-content">
        <form onSubmit={send}>
          <UIInput value={accounts[0]} readOnly={true}>
            from
          </UIInput>
          <UIInput ref={toField} value={to} onInput={(e: React.ChangeEvent<HTMLInputElement>) => setTo(e.target.value)}>
            to
          </UIInput>
          <UIInput value={value} onInput={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}>
            value
          </UIInput>
          <UIInput value="">
            gasPrice
          </UIInput>
          <UIInput value="">
            gas
          </UIInput>
        </form>
      </div>
      <div className="modal-buttons buttons">
        <UIButton size="small" onClick={send}>Send</UIButton>
        <UIButton size="small" theme="light" onClick={() => closeModal(id)}>Cancel</UIButton>
      </div>
    </ModalWrapper>
  )
}

export default SendTransactionModal
