import { products } from '../lib/products';
import Link from 'next/link';

export default function ProductDetail({ params }) {
  const product = products.find(p => p.id === parseInt(params.id));
  if (!product) {
    return <div className="container mx-auto px-4 py-8">Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="text-green-400 hover:underline mb-4 inline-block">
        ← Back to Store
      </Link>
      <div className="max-w-2xl mx-auto">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover rounded mb-4"
        />
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-2xl text-green-400 font-bold mb-6">{product.price}</p>
        <button
          onClick={() => alert('Payment processed! Thank you for your purchase.')}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}