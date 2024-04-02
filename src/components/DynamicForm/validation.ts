import { FieldConfig } from './types';
import * as Yup from 'yup';

export const validationSchema = (fields: FieldConfig[]) =>
    Yup.object().shape(
        fields.reduce((acc, field) => {
            acc[field.name] = field.validation || Yup.string().required(`${field.label} is required`);
            return acc;
        }, {} as Record<string, any>)
    );