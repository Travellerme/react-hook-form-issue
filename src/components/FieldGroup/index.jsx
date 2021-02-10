import React, { useCallback } from 'react'
import { v4 } from 'uuid'

export const FieldGroup = ({
  heading,
  collapsed = false,
  toggleHandler = () => null,
  children,
}) => {
  const onToggle = useCallback(() => {
    toggleHandler()
  }, [toggleHandler])
  const id = v4().substr(0,5)
  const fieldName = `toggle-${id}`
  return (
    <div>
      <div>
        <input type="checkbox" id={fieldName} name={fieldName} onChange={onToggle} checked={!collapsed} />
        <label htmlFor="toggle">{heading}</label>
      </div>
      {!collapsed && children}
    </div>
  )
}
