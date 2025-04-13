// pages/index.js
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="h-[100px] w-[100%] bg-blue-400 p-4">
      <Head>
        <title>Inventory Dashboard</title>
      </Head>
      <main className="max-w-4xl mx-auto">
        <h1 className="text-lg font-bold mb-4">Welcome to Inventory Dashboard</h1>
        <div className="space-x-4">
          <Link href="/categories" className="text-blue-500 hover:underline">Manage Categories</Link>
          <Link href="/products" className="text-blue-500 hover:underline">Manage Products</Link>
        </div>
      </main>
    </div>
  );
}