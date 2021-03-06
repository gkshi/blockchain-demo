import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router5'

import Loader from '../../loader'

import './_index.scss'

interface ButtonOptions extends React.ButtonHTMLAttributes<any> {
  fullWidth?: boolean,
  loading?: boolean,
  size?: 'default' | 'small',
  theme?: 'default' | 'light' | 'danger',
  routeName?: string
}

const Button = forwardRef((props: ButtonOptions, ref) => {
  if (!ref) {
    ref = useRef()
  }

  const [buttonProps, setButtonProps] = useState({})
  const classList = `button -component -theme-${props.theme || 'default'} -size-${props.size || 'default'} ${props.fullWidth ? '-full-width' : ''} ${props.loading ? '-loading' : ''} ${props.disabled ? '-disabled' : ''}`

  const update = () => {
    (ref as any).current = {}

    const fieldProps = { ...props } as ButtonOptions
    delete fieldProps.fullWidth
    delete fieldProps.loading
    delete fieldProps.size
    delete fieldProps.theme
    delete fieldProps.routeName
    setButtonProps(fieldProps)
  }

  useEffect(() => {
    update()
  }, [props])

  return (
    <div className={classList}>
      {props.routeName
        ? <Link {...buttonProps} routeName={props.routeName}>
          { props.loading
            ? <div className="loader">
              <Loader />
            </div>
            : props.children }
      </Link>
        : <button {...buttonProps}>
        { props.loading && <div className="loader">
            <Loader />
          </div> }
          <div className="flex a-center">{props.children}</div>
      </button>}
    </div>
  )
})

export default Button
