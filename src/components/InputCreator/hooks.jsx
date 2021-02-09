import React, { useCallback } from 'react'
import { Button } from 'reactstrap';

export const useOnChangeHandler = () =>
  useCallback((onChange) => (e) => onChange(e.target.value), [])

export const useAddNewRowHandler = ({
  append,
  fieldNames,
}) =>
  useCallback(() => {
    append(
      (Array.isArray(fieldNames) ? fieldNames : []).reduce(
        (acc, name) => ({ ...acc, [name]: '' }),
        {}
      )
    )
  }, [fieldNames, append])

export const useRemoveRowHandler = (remove) =>
  useCallback(
    (rowId) => () => {
      remove(rowId)
    },
    [remove]
  )

export const useGetActionElements = ({
  fields,
  actions,
  addNewRowHandler,
  removeRowHandler,
}) =>
  useCallback(
    (rowId) => {
      const ifRowsMoreThanOne = fields.length > 1
      return (
        <>
          {actions?.plus && (
            <Button color="success" onClick={addNewRowHandler}>Add</Button>
          )}
          {ifRowsMoreThanOne && actions?.minus && (
            <Button color="danger" onClick={removeRowHandler(rowId)}>Remove</Button>
          )}
        </>
      )
    },
    [actions?.minus, actions?.plus, addNewRowHandler, fields.length, removeRowHandler]
  )
