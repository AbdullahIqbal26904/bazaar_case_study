// pages/products/index.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Products() {
  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState({ name: '', description: '', category_id: '', price: '' });
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios.get(`${API}/api/products`,{headers: { Authorization: `Bearer ${token}` }})
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
    axios.get(`${API}/api/categories`)
      .then(res => setCategories(res.data.categories))
      .catch(err => console.error(err));
  }, []);

  const addProduct = async () => {
    try {
      const res = await axios.post(`${API}/api/products`, productForm);
      setProducts([...products, res.data.product]);
      setProductForm({ name: '', description: '', category_id: '', price: '' });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
          Product Manager
        </h1>
        
        {/* Add Product Form */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-8 shadow-xl">
          <div className="space-y-4">
            <input
              type="text"
              className="w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
              placeholder="Product Name"
              value={productForm.name}
              onChange={e => setProductForm({ ...productForm, name: e.target.value })}
            />
            <textarea
              className="w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all h-24"
              placeholder="Description"
              value={productForm.description}
              onChange={e => setProductForm({ ...productForm, description: e.target.value })}
            />
            <select
              className="w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 focus:ring-2 focus:ring-purple-500 focus:outline-none appearance-none transition-all"
              value={productForm.category_id}
              onChange={e => setProductForm({ ...productForm, category_id: e.target.value })}
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat.category_id} value={cat.category_id}>{cat.category_name}</option>
              ))}
            </select>
            <input
              type="number"
              className="w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
              placeholder="Price"
              value={productForm.price}
              onChange={e => setProductForm({ ...productForm, price: e.target.value })}
            />
            <button
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              onClick={addProduct}
            >
              Add Product
            </button>
          </div>
        </div>

        {/* Product List */}
        <div className="space-y-4">
          {products.map(p => (
            <div
              key={p.product_id}
              className="group bg-gray-800 rounded-xl p-5 hover:bg-gray-750 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-100 group-hover:text-purple-400 transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-gray-400 mt-1 text-sm">{p.description}</p>
                </div>
                <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  ${p.price}
                </span>
              </div>
              {p.category_name && (
                <div className="mt-3">
                  <span className="inline-block bg-gray-700 text-gray-300 px-2 py-1 rounded-md text-xs">
                    {p.category_name}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}