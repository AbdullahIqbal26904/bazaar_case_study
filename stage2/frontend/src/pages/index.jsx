import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', hash_password: '' });
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log(credentials)
      const res = await axios.post(`${API}/api/auth/login`, credentials);
      console.log(res.data)
      localStorage.setItem('token', res.data.token);
      if (res.data) {
        router.push('/dashboard');
      }
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-xl w-96 shadow-xl">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Store Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Username"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          />
          <input
            type="password"
            className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, hash_password: e.target.value })}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}