import Link from 'next/link';
import { products } from './lib/products';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Gaming Store</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map(product => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <div className="border border-gray-700 rounded-lg p-4 hover:border-green-500 transition">
              <img
                src={product.image}
                alt={product.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-green-400 font-bold mb-4">{product.price}</p>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded">
                View Details
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}