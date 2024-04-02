export interface FieldConfig {
    name: string;
    label: string;
    type: string;
    validation?: (value: any) => string | undefined;
}
