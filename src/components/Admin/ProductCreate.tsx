import React from 'react';
import DynamicForm, { Attribute } from '../../commonComponents/DynamicForm';

const ProductCreate: React.FC = () => {
    const templateResponse: Attribute[] = [
        {
            "_id": "66a383591577f5f7d1ebecb7",
            "SubCategoryId": "554",
            "AttributeConfig": {
                "IsRequired": true,
                "MinLength": 0,
                "MaxLength": 0,
            },
            "AttributeName": "color",
            "InputType": "SINGLE_SELECT",
            "PlaceHolder": "",
            "PositionIndex": 1,
            "AttributeId": "66a38d1e1577f5f7d1ebecbd",
            "AttributeOptions": [
                {
                    "Name": "Red",
                    "Value": "red",
                    "IsSelected": false
                },
                {
                    "Name": "Green",
                    "Value": "green",
                    "IsSelected": false
                }
            ]
        },
        {
            "_id": "66a38bbc1577f5f7d1ebecba",
            "SubCategoryId": "554",
            "AttributeName": "Ram",
            "AttributeId": "66a38d1e1577f5f7d1ebecbd",
            "PlaceHolder": "",
            "InputType": "TEXT",
            "PositionIndex": 2,
            "AttributeConfig": {
                "IsRequired": true,
                "MinLength": 0,
                "MaxLength": 6,
            },
            "AttributeOptions": []
        },
        {
            "_id": "66a38bbc1577f5f7d1ebecbb",
            "SubCategoryId": "554",
            "AttributeName": "Rom",
            "PlaceHolder": "",
            "AttributeId": "66a38d1e1577f5f7d1ebecbd",
            "InputType": "TEXT",
            "PositionIndex": 3,
            "AttributeConfig": {
                "IsRequired": true,
                "MinLength": 0,
                "MaxLength": 6,
            },
            "AttributeOptions": []
        },
        {
            "_id": "66a7224c6cf92eb14061b73c",
            "SubCategoryId": "554",
            "AttributeName": "os",
            "AttributeId": "ObjectId(\"66a7224c6cf92eb14061b739\")",
            "PlaceHolder": "",
            "InputType": "TEXT",
            "PositionIndex": 4,
            "AttributeConfig": {
                "IsRequired": true,
                "MinLength": 0,
                "MaxLength": 3,
            },
            "AttributeOptions": []
        },
        {
            "_id": "66a7224c6cf92eb14061b73d",
            "SubCategoryId": "554",
            "AttributeName": "size",
            "PlaceHolder": "",
            "AttributeId": "ObjectId(\"66a7224c6cf92eb14061b73a\")",
            "InputType": "TEXT",
            "PositionIndex": 5,
            "AttributeConfig": {
                "IsRequired": true,
                "MinLength": 0,
                "MaxLength": 6,
            },
            "AttributeOptions": []
        },
        {
            "_id": "66a7224c6cf92eb14061b73e",
            "SubCategoryId": "554",
            "AttributeName": "BluetoothVersion",
            "PlaceHolder": "",
            "AttributeId": "ObjectId(\"66a7224c6cf92eb14061b73b\")",
            "InputType": "TEXT",
            "PositionIndex": 6,
            "AttributeConfig": {
                "IsRequired": true,
                "MinLength": 0,
                "MaxLength": 6,
            },
            "AttributeOptions": []
        },
        {
            "_id": "66a7224c6cf92eb14061b73f",
            "SubCategoryId": "554",
            "AttributeName": "Features",
            "PlaceHolder": "",
            "AttributeId": "ObjectId(\"66a7224c6cf92eb14061b73c\")",
            "InputType": "MULTI_SELECT",
            "PositionIndex": 7,
            "AttributeConfig": {
                "IsRequired": true,
                "MinLength": 0,
                "MaxLength": 6,
            },
            "AttributeOptions": [
                {
                    "Name": "GPS",
                    "Value": "gps",
                    "IsSelected": false
                },
                {
                    "Name": "NFC",
                    "Value": "nfc",
                    "IsSelected": false
                },
                {
                    "Name": "Wifi",
                    "Value": "wifi",
                    "IsSelected": false
                }
            ]
        }
    ];

    const handleFormSubmit = (formData: Record<string, string | string[]>) => {
        console.log('Form Data:', formData);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h2>Create Product</h2>
            <DynamicForm attributes={templateResponse} onSubmit={handleFormSubmit} />
        </div>
    );
};

export default ProductCreate;
