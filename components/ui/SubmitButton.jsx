'use client'

import { useFormStatus } from 'react-dom'
import { Button } from './button'

const Submit = ({ label, ...btnProps }) => {
  const { pending } = useFormStatus()

  return (
    <Button {...btnProps} type="submit">
      {label}
    </Button>
  )
}

export default Submit
