import React, { useState } from 'react'
import { Search, TrendingUp, TrendingDown } from 'lucide-react'

function Market_price() {
  const [searchTerm, setSearchTerm] = useState('')

  const marketData = {
    vegetables: [
      {
        id: 1,
        name: 'Tomatoes',
        price: 25,
        unit: 'kg',
        trend: 'up',
        trendPercent: 5,
        image: 'tomatoes',
        bgColor: 'bg-red-500'
      },
      {
        id: 2,
        name: 'Potatoes',
        price: 18,
        unit: 'kg',
        trend: 'down',
        trendPercent: 3,
        image: 'potatoes',
        bgColor: 'bg-yellow-600'
      },
      {
        id: 3,
        name: 'Onions',
        price: 22,
        unit: 'kg',
        trend: 'up',
        trendPercent: 8,
        image: 'onions',
        bgColor: 'bg-purple-500'
      }
    ],
    fruits: [
      {
        id: 4,
        name: 'Apples',
        price: 120,
        unit: 'kg',
        trend: 'up',
        trendPercent: 10,
        image: 'apples',
        bgColor: 'bg-red-400'
      },
      {
        id: 5,
        name: 'Bananas',
        price: 40,
        unit: 'dozen',
        trend: 'down',
        trendPercent: 5,
        image: 'bananas',
        bgColor: 'bg-yellow-400'
      },
      {
        id: 6,
        name: 'Mangoes',
        price: 80,
        unit: 'kg',
        trend: 'up',
        trendPercent: 12,
        image: 'mangoes',
        bgColor: 'bg-orange-400'
      }
    ],
    grains: [
      {
        id: 7,
        name: 'Rice',
        price: 35,
        unit: 'kg',
        trend: 'up',
        trendPercent: 2,
        image: 'rice',
        bgColor: 'bg-gray-100'
      },
      {
        id: 8,
        name: 'Wheat',
        price: 28,
        unit: 'kg',
        trend: 'down',
        trendPercent: 4,
        image: 'wheat',
        bgColor: 'bg-yellow-700'
      },
      {
        id: 9,
        name: 'Pulses',
        price: 70,
        unit: 'kg',
        trend: 'up',
        trendPercent: 15,
        image: 'pulses',
        bgColor: 'bg-green-600'
      }
    ]
  }

  const ProductImage = ({ type, bgColor, className }) => {
    const images = {
      tomatoes: (
        <div className={`${className} ${bgColor} flex items-center justify-center relative overflow-hidden`}>
          <div className="flex space-x-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-8 h-8 bg-red-600 rounded-full relative">
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-500"></div>
              </div>
            ))}
          </div>
        </div>
      ),
      potatoes: (
        <div className={`${className} ${bgColor} flex items-center justify-center relative overflow-hidden`}>
          <div className="flex flex-wrap justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-6 h-4 bg-yellow-800 rounded-full transform rotate-12"></div>
            ))}
          </div>
        </div>
      ),
      onions: (
        <div className={`${className} ${bgColor} flex items-center justify-center relative overflow-hidden`}>
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-8 h-8 bg-purple-300 rounded-full relative">
                <div className="absolute top-1 left-1 w-6 h-6 bg-purple-400 rounded-full"></div>
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-3 bg-green-500"></div>
              </div>
            ))}
          </div>
        </div>
      ),
      apples: (
        <div className={`${className} ${bgColor} flex items-center justify-center relative overflow-hidden`}>
          <div className="flex space-x-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-10 h-10 bg-red-600 rounded-full relative">
                <div className="absolute -top-1 right-2 w-2 h-3 bg-green-500 rounded-full"></div>
                <div className="absolute top-2 left-2 w-2 h-2 bg-red-300 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      ),
      bananas: (
        <div className={`${className} ${bgColor} flex items-center justify-center relative overflow-hidden`}>
          <div className="transform -rotate-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`w-16 h-3 bg-yellow-600 rounded-full mb-1 transform rotate-${i * 5}`}></div>
            ))}
          </div>
        </div>
      ),
      mangoes: (
        <div className={`${className} ${bgColor} flex items-center justify-center relative overflow-hidden`}>
          <div className="flex space-x-2">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="w-12 h-10 bg-orange-600 rounded-full transform rotate-12 relative">
                <div className="absolute top-1 right-1 w-3 h-3 bg-orange-300 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      ),
      rice: (
        <div className={`${className} ${bgColor} flex items-center justify-center relative overflow-hidden border border-gray-300`}>
          <div className="w-20 h-12 bg-white rounded-lg flex items-center justify-center">
            <div className="flex flex-wrap gap-px">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="w-1 h-2 bg-gray-300 rounded-full"></div>
              ))}
            </div>
          </div>
        </div>
      ),
      wheat: (
        <div className={`${className} ${bgColor} flex items-center justify-center relative overflow-hidden`}>
          <div className="flex space-x-1">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-1 h-12 bg-yellow-900 rounded-full relative">
                <div className="absolute -top-1 left-0 w-2 h-3 bg-yellow-800 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      ),
      pulses: (
        <div className={`${className} ${bgColor} flex items-center justify-center relative overflow-hidden`}>
          <div className="grid grid-cols-6 gap-1">
            {[...Array(24)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-green-800 rounded-full"></div>
            ))}
          </div>
        </div>
      )
    }
    return images[type] || <div className={className}></div>
  }

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <ProductImage type={product.image} bgColor={product.bgColor} className="h-40 w-full" />
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>
        <div className="flex items-center justify-between mb-3">
          <div className="text-xl font-bold text-gray-800">
            ₹{product.price}
            <span className="text-sm text-gray-500 font-normal">/{product.unit}</span>
          </div>
          <div className={`flex items-center space-x-1 text-sm ${
            product.trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            {product.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span>{product.trendPercent}%</span>
          </div>
        </div>
        <button className="w-full bg-green-100 hover:bg-green-200 text-green-700 font-medium py-2 px-4 rounded-lg transition-colors">
          View Details
        </button>
      </div>
    </div>
  )

  const CategorySection = ({ title, products }) => (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Marketplace
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Current market prices for various vegetables and farm products.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for products..."
              className="w-full pl-10 pr-4 py-3 bg-white rounded-lg shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Categories */}
        <CategorySection title="Vegetables" products={marketData.vegetables} />
        <CategorySection title="Fruits" products={marketData.fruits} />
        <CategorySection title="Grains" products={marketData.grains} />
      </div>
    </div>
  )
}

export default Market_price