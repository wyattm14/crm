"use client";

import { useState } from "react";

interface ProductService {
  id: string;
  name: string;
  type: "product" | "service";
  description: string;
  benefits: string[];
  price?: string;
  category?: string;
}

export default function ProductsServices() {
  const [products, setProducts] = useState<ProductService[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    type: "product" as "product" | "service",
    description: "",
    benefits: [""],
    price: "",
    category: ""
  });

  const addProduct = () => {
    if (newProduct.name.trim() && newProduct.description.trim()) {
      const product: ProductService = {
        id: Date.now().toString(),
        name: newProduct.name.trim(),
        type: newProduct.type,
        description: newProduct.description.trim(),
        benefits: newProduct.benefits.filter(b => b.trim()),
        price: newProduct.price.trim() || undefined,
        category: newProduct.category.trim() || undefined
      };
      setProducts([...products, product]);
      setNewProduct({
        name: "",
        type: "product",
        description: "",
        benefits: [""],
        price: "",
        category: ""
      });
      setShowAddForm(false);
    }
  };

  const removeProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const addBenefit = () => {
    setNewProduct(prev => ({
      ...prev,
      benefits: [...prev.benefits, ""]
    }));
  };

  const removeBenefit = (index: number) => {
    setNewProduct(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
    }));
  };

  const updateBenefit = (index: number, value: string) => {
    setNewProduct(prev => ({
      ...prev,
      benefits: prev.benefits.map((benefit, i) => i === index ? value : benefit)
    }));
  };



  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-white">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Products & Services</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your company&apos;s products and services</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">


          {/* Products/Services List */}
          {products.length > 0 ? (
            <div className="space-y-4">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          product.type === 'product' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {product.type.charAt(0).toUpperCase() + product.type.slice(1)}
                        </span>
                        {product.category && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {product.category}
                          </span>
                        )}
                      </div>
                      {product.price && (
                        <p className="text-sm text-gray-600 mb-3">
                          <span className="font-medium">Price:</span> {product.price}
                        </p>
                      )}
                      <p className="text-sm text-gray-700 mb-3">{product.description}</p>
                      {product.benefits.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Key Benefits:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {product.benefits.map((benefit, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                                         <button
                       onClick={() => removeProduct(product.id)}
                       className="text-red-600 hover:text-red-800 text-sm"
                     >
                       Remove
                     </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products or services yet</h3>
              <p className="text-gray-500 mb-6">
                Add your products and services to showcase what your company offers.
              </p>
                             <button
                 onClick={() => setShowAddForm(true)}
                 className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
               >
                 Add Your First Product/Service
               </button>
            </div>
          )}
        </div>
      </div>

      {/* Add Product/Service Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">Add New Product/Service</h3>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Product or service name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    value={newProduct.type}
                    onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value as "product" | "service" })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="product">Product</option>
                    <option value="service">Service</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Software, Consulting, Hardware"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <input
                    type="text"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., $99/month, $500, Contact for quote"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    rows={3}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Describe what this product/service does..."
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Key Benefits
                  </label>
                  <div className="space-y-2">
                    {newProduct.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={benefit}
                          onChange={(e) => updateBenefit(index, e.target.value)}
                          className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder={`Benefit ${index + 1}`}
                        />
                        {newProduct.benefits.length > 1 && (
                          <button
                            onClick={() => removeBenefit(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={addBenefit}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      + Add Benefit
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-2">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addProduct}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Add Product/Service
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 