import * as Joi from 'joi'
import './App.css';
import {useState} from "react";
import {FieldGroup} from "./components/FieldGroup";
import InputCreator from "./components/InputCreator";
import {FormProvider, useForm} from "react-hook-form";

const conf = {
    "fieldsConf": {
        "quantity": {
            "colSize": 4,
            "type": "number",
            "required": true,
            "placeholder": "Enter quantity",
            "label": "Quantity",
            validate: (value) => Joi.number()
                .required()
                .min(1)
                .messages({
                  'number.base': 'Quantity is required',
                  'number.min': 'Please enter the minimal value',
                })
                .validate(value).error?.message
        },
        "productReferences": {
            "colSize": 6,
            "type": "text",
            "required": true,
            "placeholder": "Enter the Product ID",
            "label": "Product ID",
            validate: (value) => Joi.string()
              .required()
              .messages({
                'string.empty': 'Product ID is required',
              })
              .validate(value).error?.message
        }
    }
}

function App() {
    const [expanded, setExpanded] = useState(({
        productsCart: true,
        productsCart2: false
    }))
    const form = useForm({
        mode: 'onChange',
        defaultValues: { productsCart: [{ quantity: '', productReferences: '' }], productsCart2: [{ quantity: '', productReferences: '' }]  }
    })
    const {
        formState: { isValid },
    } = form
    console.log('isValid',isValid)
    return (
        <div className="App">
                <FormProvider {...form}>
                    <FieldGroup
                        isControlled
                        description='Description'
                        enabled={expanded.productsCart}
                        toggleHandler={(value) => setExpanded({ productsCart: !value, productsCart2: false })}
                        heading={'Heading'}
                        toggleable
                    >
                        <InputCreator fieldPrefix="productsCart" {...conf} />
                    </FieldGroup>
                    <FieldGroup
                        isControlled
                        enabled={expanded.productsCart2}
                        toggleHandler={(value) => setExpanded({ productsCart2: !value, productsCart: false })}
                        heading={'Heading2'}
                        toggleable
                    >
                        <InputCreator fieldPrefix="productsCart2" {...conf} />
                    </FieldGroup>
                </FormProvider>
                <div><b>isValid: {isValid.toString()}</b></div>

        </div>
    );
}

export default App;
