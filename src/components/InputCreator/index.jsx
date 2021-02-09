import React, { useMemo } from 'react'
import { get } from 'lodash'
import { FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
// import styles from './InputCreator.module.scss'
import { useAddNewRowHandler, useGetActionElements, useOnChangeHandler, useRemoveRowHandler } from "./hooks";

const InputCreator = ({ fieldPrefix = 'prefix', fieldsConf, actions }) => {
  const { control, errors } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldPrefix,
  })
  const fieldNames = useMemo(() => Object.keys(fieldsConf || {}), [fieldsConf])
  const ifActionsExist = useMemo(() => Boolean(actions && Object.keys(actions).length), [actions])
  const colSize = useMemo(() => Math.floor((ifActionsExist ? 10 : 12) / fieldNames.length), [
    fieldNames,
    ifActionsExist,
  ])
  const onChangeHandler = useOnChangeHandler()
  const addNewRowHandler = useAddNewRowHandler({ append, fieldNames })
  const removeRowHandler = useRemoveRowHandler(remove)
  const getActionElems = useGetActionElements({
    fields,
    actions,
    addNewRowHandler,
    removeRowHandler,
  })
  return (
    <>
      {fields.map((field, rowId) => (
        <Row key={field.id}>
          {fieldNames.map((name, colId) => (
            <Col
              key={`${fieldPrefix}.${field.id}.${colId.toString()}`}
              size={fieldsConf[name].colSize || (colSize)}
            >
              <Controller
                rules={{ validate: fieldsConf[name].validate }}
                name={`${fieldPrefix}[${rowId}].${name}`}
                control={control}
                defaultValue={field[name]}
                render={({ onChange, value }) => (
                  <>
                    {/* You can use any third-party or custom Inputs, the result will be the same */}
                    <FormGroup>
                      <Label for={name}>{fieldsConf[name].label}</Label>
                      <Input
                          value={value}
                          type={fieldsConf[name].type}
                          name={name}
                          placeholder={fieldsConf[name].placeholder}
                          onChange={onChangeHandler(onChange)}
                      />
                      <div slot="error-message">
                        {String(get(errors, `${fieldPrefix}[${rowId}].${name}.message`, ''))}
                      </div>
                    </FormGroup>
                  </>
                )}
              />
            </Col>
          ))}
          {ifActionsExist && (
            <Col size={2}>
              {getActionElems(rowId)}
            </Col>
          )}
        </Row>
      ))}
    </>
  )
}

export default InputCreator
