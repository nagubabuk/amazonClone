import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FieldConfig } from './types';
import { validationSchema } from './validation';
import { ObjectSchema } from 'yup';


interface DynamicFormProps {
    fields: FieldConfig[];
    onSubmit: (values: any) => void;
    validationSchema?: ObjectSchema<any>;
}
const DynamicForm:React.FC<DynamicFormProps> = ({fields,onSubmit})=>{
    return (
        <Formik
            initialValues={fields.reduce((acc, field) => {
                acc[field.name] = '';
                return acc;
            }, {} as any)}
            validationSchema={validationSchema(fields)}
            onSubmit={onSubmit}
        >
            {() => (
                <Form className="flex flex-col gap-4">
                    {fields.map((field) => (
                        <div key={field.name} className="flex flex-col">
                            <label htmlFor={field.name} className="font-bold">
                                {field.label}
                            </label>
                            <Field
                                name={field.name}
                                type={field.type}
                                className="p-2 border border-gray-300 rounded"
                            />
                            <ErrorMessage name={field.name} component="div" className="text-red-500" />
                        </div>
                    ))}
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    );
}

export default DynamicForm
