import React, { useCallback } from 'react'

export const useOnChangeHandler = () =>
  useCallback((onChange) => (e) => onChange(e.target.value), [])

