import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';


interface Category {
    id: string;
    name: string;
    categoryId:string;
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
    photos?: File[];
    videos?: File[];
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
        photos: [],
        videos: [],
        description: '',
        brand: '',
        stockAvailable: 0,
        color: '',
        size: '',
    });
    const navigate = useNavigate();
    useEffect(() => {
        axiosInstance.get<Category[]>('/categories')
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    useEffect(() => {
        if (formData.category) {
            axiosInstance.get<Subcategory[]>(`/subcategories?categoryId=${formData.category}`)
                .then(response => setSubcategories(response.data))
                .catch(error => console.error('Error fetching subcategories:', error));
        }
    }, [formData.category]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData(prevState => ({
                ...prevState,
                productImages: Array.from(e.target.files!)
            }));
        }
    };
    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData(prevState => ({
                ...prevState,
                photos: Array.from(e.target.files!)
            }));
        }
    };

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData();
        // Object.entries(formData).forEach(([key, value]) => {
            Object.entries(formData).forEach(([key, value]) => {
                if (key === 'photos' && formData.photos) {
                    formData.photos.forEach((photo, index) => {
                        console.log('Appending photo:', photo);
                        data.append('photos', photo);
                    });
                } else if (key === 'videos') {
                    // formData.videos.forEach(video => data.append('videos', video));
                } else {
                    data.append(key, value.toString());
                }
            });
        // });
        console.log("form product daqt i", data, "----", formData)
        try {
            const response = await axios.post('http://localhost:4000/api/products/add', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/products-list'); 
           
        } catch (error) {
            console.error('Error uploading files:', error);
            alert('Error uploading files');
        }
        // axiosInstance.post('/products/add', data)
        //     .then(response => {
        //         console.log('Product created successfully:', response.data);
        //         // Reset form or handle success state
        //         setFormData({
        //             productName: '',
        //             category: '',
        //             subcategory: '',
        //             price: 0,
        //             discountPrice: 0,
        //             photos:[],
        //             description: '',
        //             brand: '',
        //             stockAvailable: 0,
        //             color: '',
        //             size: '',
        //         });
        //     })
        //     .catch(error => console.error('Error creating product:', error));
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
            <div className="max-w-3xl w-full bg-white shadow-md rounded-lg p-8">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Create New Product</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Product Name */}
                    <div>
                        <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
                            Product Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="productName"
                            name="productName"
                            type="text"
                            value={formData.productName}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter product name"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                            Category <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select a category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.categoryId}>{category.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Subcategory */}
                    <div>
                        <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 mb-1">
                            Subcategory <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="subcategory"
                            name="subcategory"
                            value={formData.subcategory}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select a subcategory</option>
                            {subcategories.map(subcategory => (
                                <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Price */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                            Price ($) <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="price"
                            name="price"
                            type="number"
                            min="0"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter price"
                        />
                    </div>

                    {/* Discount Price */}
                    <div>
                        <label htmlFor="discountPrice" className="block text-sm font-medium text-gray-700 mb-1">
                            Discount Price ($)
                        </label>
                        <input
                            id="discountPrice"
                            name="discountPrice"
                            type="number"
                            min="0"
                            value={formData.discountPrice}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter discount price"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows={4}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter product description"
                        ></textarea>
                    </div>

                    {/* Brand */}
                    <div>
                        <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
                            Brand <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="brand"
                            name="brand"
                            type="text"
                            value={formData.brand}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter brand name"
                        />
                    </div>

                    {/* Stock Available */}
                    <div>
                        <label htmlFor="stockAvailable" className="block text-sm font-medium text-gray-700 mb-1">
                            Stock Available <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="stockAvailable"
                            name="stockAvailable"
                            type="number"
                            min="0"
                            value={formData.stockAvailable}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter stock quantity"
                        />
                    </div>

                    {/* Color */}
                    <div>
                        <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
                            Color <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="color"
                            name="color"
                            type="text"
                            value={formData.color}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter color"
                        />
                    </div>

                    {/* Size */}
                    <div>
                        <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                            Size <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="size"
                            name="size"
                            type="text"
                            value={formData.size}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter size"
                        />
                    </div>

                    {/* Product Images */}
                    {/* <div>
                        <label htmlFor="productImages" className="block text-sm font-medium text-gray-700 mb-1">
                            Product Images <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md">
                            <div className="space-y-1 text-center">
                                <svg
                                    className="mx-auto h-12 w-12 text-gray-400"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 48 48"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M28 8H12a4 4 0 00-4 4v24a4 4 0 004 4h24a4 4 0 004-4V20"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M28 8L36 16M28 8l-8 8"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <div className="flex text-sm text-gray-600">
                                    <label
                                        htmlFor="productImages"
                                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                                    >
                                        <span>Upload a file</span>
                                        <input
                                            id="productImages"
                                            name="productImages"
                                            type="file"
                                            onChange={handleImageChange}
                                            multiple
                                            required
                                            className="sr-only"
                                        />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                        {formData.productImages.length > 0 && (
                            <ul className="mt-2">
                                {formData.productImages.map((file, index) => (
                                    <li key={index} className="text-sm text-gray-600">
                                        {file.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div> */}
                    <div>
                        <label htmlFor="photos" className="block text-sm font-medium text-gray-700 mb-1">
                            Product Photos <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="photos"
                            name="photos"
                            type="file"
                            onChange={handlePhotoChange}
                            multiple
                            required
                            className="block w-full text-sm text-gray-600"
                        />
                        {formData.photos && formData.photos.length > 0 && (
                            <ul className="mt-2">
                                {formData.photos.map((file, index) => (
                                    <li key={index} className="text-sm text-gray-600">
                                        {file.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Create Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
