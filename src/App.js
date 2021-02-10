import * as Joi from 'joi'
import './App.css';
import {useState} from "react";
import {FieldGroup} from "./components/FieldGroup";
import InputCreator from "./components/InputCreator";
import {FormProvider, useForm} from "react-hook-form";

const conf = {
    "fieldsConf": {
        "quantity": {
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
        defaultValues: {
            productsCart: [{ quantity: '', productReferences: '' }],
            productsCart2: [{ quantity: '', productReferences: '' }]
        }
    })
    const {
        formState: { isValid },
    } = form
    console.log('isValid',isValid)
    return (
        <div className="App">
                <FormProvider {...form}>
                    <FieldGroup
                        description='Description'
                        collapsed={!expanded.productsCart}
                        toggleHandler={() =>console.log('setExpanded1') || setExpanded({ productsCart: !expanded.productsCart, productsCart2: false})}
                        heading={'Heading'}
                    >
                        <InputCreator fieldPrefix="productsCart" {...conf} />
                    </FieldGroup>
                    <FieldGroup
                        collapsed={!expanded.productsCart2}
                        toggleHandler={() => console.log('setExpanded2') || setExpanded({ productsCart2: !expanded.productsCart2, productsCart: false })}
                        heading={'Heading2'}
                    >
                        <InputCreator fieldPrefix="productsCart2" {...conf} />
                    </FieldGroup>
                </FormProvider>
                <div className="alert-danger"><b>isValid: {isValid.toString()}</b></div>

        </div>
    );
}

export default App;
