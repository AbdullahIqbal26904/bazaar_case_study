// pages/categories/index.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const token = localStorage.getItem("token");
    useEffect(() => {
        axios.get(`${API}/api/categories`,{ headers: { Authorization: `Bearer ${token}` } })
            .then(res => setCategories(res.data.categories))
            .catch(err => console.error(err));
    }, []);

    const addCategory = async () => {
        try {
            const res = await axios.post(`${API}/api/categories/createCategory`, { category_name: categoryName },{ headers: { Authorization: `Bearer ${token}` } });
            setCategories([...categories, res.data.category]);
            setCategoryName('');
        } catch (error) {
            console.error(error);
        }
    };

    const deleteCategory = async (id) => {
        try {
            await axios.delete(`${API}/api/categories/${id}`,{ headers: { Authorization: `Bearer ${token}` } });
            setCategories(categories.filter(c => c.category_id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                    Categories Manager
                </h1>

                {/* Add Category Form */}
                <div className="bg-gray-800 rounded-xl p-6 mb-8 shadow-xl">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            className="w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
                            value={categoryName}
                            onChange={e => setCategoryName(e.target.value)}
                            placeholder="Enter category name"
                        />
                        <button
                            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl whitespace-nowrap"
                            onClick={addCategory}
                        >
                            Add Category
                        </button>
                    </div>
                </div>

                {/* Categories List */}
                <div className="space-y-4">
                    {categories.map(cat => (
                        <div
                            key={cat.category_id}
                            className="group bg-gray-800 rounded-xl p-5 hover:bg-gray-750 transition-all transform hover:scale-[1.01] shadow-lg hover:shadow-xl"
                        >
                            <div className="flex justify-between items-center">
                                <span className="text-gray-100 text-lg font-medium group-hover:text-purple-400 transition-colors">
                                    {cat.category_name}
                                </span>
                                <button
                                    className="text-red-400 hover:text-white hover:bg-red-500 p-2 rounded-full transition-colors duration-200"
                                    onClick={() => deleteCategory(cat.category_id)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {categories.length === 0 && (
                    <div className="text-center py-12 text-gray-400">
                        No categories found. Start by adding one!
                    </div>
                )}
            </div>
        </div>
    );
}