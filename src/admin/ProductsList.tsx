import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance'; // Adjust the import based on your file structure

const ProductsList = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await axiosInstance.get('/products'); // Adjust your API endpoint
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-4">Products List</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="py-2 px-4 border-b">Product Name</th>
                            <th className="py-2 px-4 border-b">Category</th>
                            <th className="py-2 px-4 border-b">Price</th>
                            <th className="py-2 px-4 border-b">Stock Available</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product:any) => (
                            <tr key={product.id} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b">{product.productName}</td>
                                <td className="py-2 px-4 border-b">{product.category}</td>
                                <td className="py-2 px-4 border-b">${product.price}</td>
                                <td className="py-2 px-4 border-b">{product.stockAvailable}</td>
                                <td className="py-2 px-4 border-b">
                                    <button
                                        className="text-blue-500 hover:underline"
                                        onClick={() => {/* Add your edit functionality here */ }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="ml-2 text-red-500 hover:underline"
                                        onClick={() => {/* Add your delete functionality here */ }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {products.length === 0 && (
                            <tr>
                                <td className="text-center py-4">No products found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductsList;
