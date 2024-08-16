import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import './ProductForm.css';

interface Category {
    id: string;
    name: string;
}

interface Subcategory {
    id: string;
    name: string;
    categoryId: string;
}

interface ProductFormData {
    productName: string;
    category: string;
    subcategory: string;
    price: number;
    discountPrice: number;
    productImages: File[];
    description: string;
    brand: string;
    stockAvailable: number;
    color: string;
    size: string;
}

const ProductForm: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
    const [formData, setFormData] = useState<ProductFormData>({
        productName: '',
        category: '',
        subcategory: '',
        price: 0,
        discountPrice: 0,
        productImages: [],
        description: '',
        brand: '',
        stockAvailable: 0,
        color: '',
        size: ''
    });

    useEffect(() => {
        // Fetch categories from API
        axios.get<Category[]>('/api/categories')
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    useEffect(() => {
        // Fetch subcategories based on category
        if (formData.category) {
            axios.get<Subcategory[]>(`/api/subcategories?categoryId=${formData.category}`)
                .then(response => setSubcategories(response.data))
                .catch(error => console.error('Error fetching subcategories:', error));
        }
    }, [formData.category]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            // setFormData(prevState => ({ ...prevState, productImages: Array.from(e.target.files) }));
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'productImages') {
                formData.productImages.forEach(file => data.append('productImages', file));
            } else {
                data.append(key, formData[key as keyof ProductFormData] as string | Blob);
            }
        });

        axios.post('/api/products', data)
            .then(response => {
                console.log('Product created successfully:', response.data);
                // Reset form or handle success state
            })
            .catch(error => console.error('Error creating product:', error));
    };

    return (
        <div className="product-form-container">
            <form onSubmit={handleSubmit} className="product-form">
                <h2>Create Product</h2>
                <label>
                    Product Name:
                    <input type="text" name="productName" value={formData.productName} onChange={handleChange} required />
                </label>
                <label>
                    Category:
                    <select name="category" value={formData.category} onChange={handleChange} required>
                        <option value="">Select a category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Subcategory:
                    <select name="subcategory" value={formData.subcategory} onChange={handleChange} required>
                        <option value="">Select a subcategory</option>
                        {subcategories.map(subcategory => (
                            <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Price:
                    <input type="number" name="price" value={formData.price} onChange={handleChange} required />
                </label>
                <label>
                    Discount Price:
                    <input type="number" name="discountPrice" value={formData.discountPrice} onChange={handleChange} />
                </label>
                <label>
                    Product Images:
                    <input type="file" name="productImages" multiple onChange={handleImageChange} required />
                </label>
                <label>
                    Description:
                    <textarea name="description" value={formData.description} onChange={handleChange} required />
                </label>
                <label>
                    Brand:
                    <input type="text" name="brand" value={formData.brand} onChange={handleChange} required />
                </label>
                <label>
                    Stock Available:
                    <input type="number" name="stockAvailable" value={formData.stockAvailable} onChange={handleChange} required />
                </label>
                <label>
                    Color:
                    <input type="text" name="color" value={formData.color} onChange={handleChange} required />
                </label>
                <label>
                    Size:
                    <input type="text" name="size" value={formData.size} onChange={handleChange} required />
                </label>
                <button type="submit">Create Product</button>
            </form>
        </div>
    );
};

export default ProductForm;
