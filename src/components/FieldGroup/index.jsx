import React, { useState, useCallback, useEffect } from 'react'

export const FieldGroup = ({
  heading,
  toggleable = true,
  enabled = false,
  toggleHandler = () => null,
  children,
}) => {
  const [collapsed, setCollapsed] = useState(() => (toggleable ? !enabled : false))
  const onToggle = useCallback(() => {
    toggleHandler(!collapsed)
  }, [collapsed, toggleHandler])
  useEffect(() => {
    const newCollapsedState = !enabled
    newCollapsedState !== collapsed && setCollapsed(newCollapsedState)
  }, [collapsed, enabled])
  return (
    <div>
      {toggleable && (
        <div>
          <input type="checkbox" id="toggle" name="toggle" onClick={onToggle} checked={!collapsed} />
          <label htmlFor="toggle">{heading}</label>
        </div>
      )}
      {!collapsed && children}
    </div>
  )
}
