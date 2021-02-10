import React, { useMemo } from 'react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { useOnChangeHandler } from "./hooks";

const InputCreator = ({ fieldPrefix = 'prefix', fieldsConf, actions }) => {
  const { control, errors } = useFormContext()
  const { fields } = useFieldArray({
    control,
    name: fieldPrefix,
  })
  const fieldNames = useMemo(() => Object.keys(fieldsConf || {}), [fieldsConf])
  const onChangeHandler = useOnChangeHandler()
  return (
    <>
      {fields.map((field, rowId) => (
        <li key={field.id}>
          {fieldNames.map((name, colId) => (
              <Controller
                key={`${fieldPrefix}.${field.id}.${colId.toString()}`}
                rules={{ validate: fieldsConf[name].validate }}
                name={`${fieldPrefix}[${rowId}].${name}`}
                control={control}
                defaultValue={field[name]}
                render={({ onChange, value }) => (
                  <>
                    {/* You can use any third-party or custom Inputs, the result will be the same */}
                    <div>
                      <input 
                          type={fieldsConf[name].type} 
                          name={name} placeholder={fieldsConf[name].placeholder} 
                          onChange={onChangeHandler(onChange)}
                      />
                      <label htmlFor={name}>{fieldsConf[name].label}</label>
                      <div slot="error-message" className="alert-danger">
                        {String(errors[fieldPrefix]?.[rowId]?.[name]?.message || '')}
                      </div>
                    </div>

                  </>
                )}
              />
          ))}
        </li>
      ))}
    </>
  )
}

export default InputCreator
