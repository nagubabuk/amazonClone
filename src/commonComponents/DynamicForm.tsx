import React, { useState, useEffect } from 'react';
import '../styles/DynamicForm.css';
import Multiselect from 'multiselect-react-dropdown';

type AttributeConfig = {
    IsRequired: boolean;
    MinLength: number;
    MaxLength: number;
};

type AttributeOption = {
    Name: string;
    Value: string;
    IsSelected: boolean;
};

export type Attribute = {
    _id: string;
    SubCategoryId: string;
    AttributeName: string;
    AttributeId:string;
    PlaceHolder: string;
    InputType: string;
    PositionIndex: number;
    AttributeConfig: AttributeConfig;
    AttributeOptions?: AttributeOption[];
};

type Props = {
    attributes: Attribute[];
    onSubmit: (formData: Record<string, string | string[]>) => void;
};

const DynamicForm: React.FC<Props> = ({ attributes, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, string | string[]>>({});
    const [selectedValues, setSelectedValues] = useState<Record<string, string[]>>({});
    useEffect(() => {
        const initialData: Record<string, string | string[]> = {};
        const initialSelectedValues: Record<string, string[]> = {};
        attributes.forEach(attr => {
            if (attr.InputType === 'MULTI_SELECT') {
                initialData[attr.AttributeName] = [];
                initialSelectedValues[attr.AttributeName] = [];
            } else {
                initialData[attr.AttributeName] = '';
            }
        });
        setFormData(initialData);
        setSelectedValues(initialSelectedValues);
    }, [attributes]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type, selectedOptions } = e.target as HTMLSelectElement & HTMLInputElement & HTMLTextAreaElement;
        console.log("typoee",type)
        if (type === 'select-multiple') {
            const selected = Array.from(selectedOptions as HTMLCollectionOf<HTMLOptionElement>);
            const values = selected.map(option => option.value);
            setFormData(prevData => ({
                ...prevData,
                [name]: values
            }));
            setSelectedValues(prev => ({
                ...prev,
                [name]: values
            }));
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("onSubmit(formData);", formData)
        onSubmit(formData);
    };
    const handleSelect = (selectedList: { Name: string; Value: string }[], selectedItem: { Name: string; Value: string }) => {
        const values = selectedList.map(option => option.Value);
        console.log(selectedList, selectedItem)

        setSelectedValues(prev => ({
            ...prev,
            [selectedItem.Name]: values
        }));
        setFormData(prevData => ({
            ...prevData,
            [selectedItem.Name]: values
        }));
    };
    const handleRemove = (selectedList: { Name: string; Value: string }[], removedItem: { Name: string; Value: string }) => {
        const values = selectedList.map(option => option.Value);
        setSelectedValues(prev => ({
            ...prev,
            [removedItem.Name]: values
        }));
        setFormData(prevData => ({
            ...prevData,
            [removedItem.Name]: values
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="dynamic-form">
            {attributes.map(attr => (
                <div key={attr._id} className="form-group">
                    <label htmlFor={attr.AttributeName} className="form-label">
                        {attr.AttributeName}
                    </label>
                    {attr.InputType === 'TEXT' && (
                        <input
                            type="text"
                            id={attr.AttributeName}
                            name={attr.AttributeName}
                            placeholder={attr.PlaceHolder}
                            required={attr.AttributeConfig.IsRequired}
                            minLength={attr.AttributeConfig.MinLength}
                            maxLength={attr.AttributeConfig.MaxLength}
                            value={formData[attr.AttributeName] as string}
                            onChange={handleChange}
                            className="form-input"
                        />
                    )}
                    {attr.InputType === 'RADIO' && attr.AttributeOptions && (
                        <div>
                            {attr.AttributeOptions.map(option => (
                                <label key={option.Value} className="form-radio-label">
                                    <input
                                        type="radio"
                                        name={attr.AttributeName}
                                        value={option.Value}
                                        checked={formData[attr.AttributeName] === option.Value}
                                        onChange={handleChange}
                                        className="form-radio-input"
                                    />
                                    {option.Name}
                                </label>
                            ))}
                        </div>
                    )}
                    {attr.InputType === 'MULTI_SELECT' && attr.AttributeOptions && (
                        // <select
                        //     id={attr.AttributeName}
                        //     name={attr.AttributeName}
                        //     multiple
                        //     required={attr.AttributeConfig.IsRequired}
                        //     value={formData[attr.AttributeName] || []}
                        //     onChange={handleChange}
                        //     className="form-multi-select"
                        // >
                        //     {attr.AttributeOptions.map(option => (
                        //         <option key={option.Value} value={option.Value}>
                        //             {option.Name}
                        //         </option>
                        //     ))}
                        // </select>
                        <Multiselect
                            options={attr.AttributeOptions.map(option => ({
                                Name: option.Name,
                                Value: option.Value
                            }))}
                            selectedValues={selectedValues[attr.AttributeName] ?
                                attr.AttributeOptions.filter(option => selectedValues[attr.AttributeName].includes(option.Value))
                                : []
                            }
                            onSelect={handleSelect}
                            onRemove={handleRemove}
                            displayValue="Name"
                            showCheckbox
                            placeholder={attr.PlaceHolder || 'Select options'}
                        />
                    )}
                    {attr.InputType === 'SINGLE_SELECT' && attr.AttributeOptions && (
                        <select
                            id={attr.AttributeName}
                            name={attr.AttributeName}
                            required={attr.AttributeConfig.IsRequired}
                            value={formData[attr.AttributeName] as string[]}
                            onChange={handleChange}
                            className="form-multi-select"
                        >
                            {attr.AttributeOptions.map(option => (
                                <option key={option.Value} value={option.Value}>
                                    {option.Name}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
            ))}
            <button type="submit" className="form-submit-button">
                Submit
            </button>
        </form>
    );
};

export default DynamicForm;
