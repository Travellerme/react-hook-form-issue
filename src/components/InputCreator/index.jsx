import React, { useMemo } from 'react'
import { get } from 'lodash'
import { FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { useOnChangeHandler } from "./hooks";

const InputCreator = ({ fieldPrefix = 'prefix', fieldsConf, actions }) => {
  const { control, errors } = useFormContext()
  const { fields } = useFieldArray({
    control,
    name: fieldPrefix,
  })
  const fieldNames = useMemo(() => Object.keys(fieldsConf || {}), [fieldsConf])
  const colSize = useMemo(() => Math.floor(12 / fieldNames.length), [
    fieldNames,
  ])
  const onChangeHandler = useOnChangeHandler()
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
                      <div slot="error-message" className="alert-danger">
                        {String(get(errors, `${fieldPrefix}[${rowId}].${name}.message`, ''))}
                      </div>
                    </FormGroup>
                  </>
                )}
              />
            </Col>
          ))}
        </Row>
      ))}
    </>
  )
}

export default InputCreator
