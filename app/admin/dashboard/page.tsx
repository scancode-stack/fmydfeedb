'use client';

import React, { useState } from 'react';
import {
  Users,
  ShoppingCart,
  BarChart3,
  Package,
  Bell,
  Search,
  Settings,
  LogOut,
  X,
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  /* PRODUCT MODAL STATE */
  const [showProductModal, setShowProductModal] = useState(false);
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState<File | null>(null);
  const [productImagePreview, setProductImagePreview] = useState('');

  /* SAVED PRODUCTS */
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Samsung Galaxy A35',
      category: 'Phones',
      price: '185000',
      description: 'Premium smartphone with excellent performance.',
      image: '/images/phone1.png',
    },
  ]);

  const stats = [
    {
      title: 'Total Survey Responses',
      value: '12,480',
      icon: <Users size={24} />,
    },
    {
      title: 'Marketplace Orders',
      value: '3,245',
      icon: <ShoppingCart size={24} />,
    },
    {
      title: 'Active Products',
      value: `${products.length}`,
      icon: <Package size={24} />,
    },
    {
      title: 'Monthly Revenue',
      value: '₦18.5M',
      icon: <BarChart3 size={24} />,
    },
  ];

  const menuItems = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: <BarChart3 size={20} />,
    },
    {
      id: 'orders',
      title: 'Orders',
      icon: <ShoppingCart size={20} />,
    },
    {
      id: 'products',
      title: 'Products',
      icon: <Package size={20} />,
    },
    {
      id: 'survey',
      title: 'Survey Responses',
      icon: <Users size={20} />,
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: <Settings size={20} />,
    },
  ];

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      setProductImage(file);
      setProductImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddProduct = () => {
    if (
      !productName.trim() ||
      !productCategory.trim() ||
      !productPrice.trim() ||
      !productDescription.trim() ||
      !productImagePreview
    ) {
      alert('Please fill all product fields including image');
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: productName,
      category: productCategory,
      price: productPrice,
      description: productDescription,
      image: productImagePreview,
    };

    setProducts((prev) => [...prev, newProduct]);

    setProductName('');
    setProductCategory('');
    setProductPrice('');
    setProductDescription('');
    setProductImage(null);
    setProductImagePreview('');
    setShowProductModal(false);

    alert('Product Added Successfully');
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="flex">
        {/* ================= SIDEBAR ================= */}
        <aside className="w-[280px] min-h-screen border-r border-black bg-white p-6 hidden lg:block">
          <div className="mb-10">
            <h1 className="text-2xl font-black uppercase tracking-tight">
              FMYD Admin
            </h1>
            <p className="text-sm mt-2">
              Marketplace + Survey Dashboard
            </p>
          </div>

          <nav className="space-y-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 font-semibold transition
                  ${
                    activeTab === item.id
                      ? 'bg-green-600 text-white'
                      : 'border border-black hover:bg-gray-50'
                  }`}
              >
                {item.icon}
                {item.title}
              </button>
            ))}
          </nav>

          <div className="mt-20">
            <button className="w-full flex items-center gap-3 px-4 py-3 border border-black hover:bg-red-50">
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </aside>

        {/* ================= MAIN CONTENT ================= */}
        <main className="flex-1 p-6 md:p-8">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-black uppercase">
                {menuItems.find((item) => item.id === activeTab)?.title}
              </h2>
              <p className="text-sm mt-2">
                Welcome back, Administrator
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border border-black px-4 py-2 w-[280px]">
                <Search size={18} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="ml-2 w-full outline-none text-sm"
                />
              </div>

              <button className="relative border border-black p-3">
                <Bell size={20} />
              </button>
            </div>
          </div>

          {/* ================= DASHBOARD ================= */}
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="border border-black p-6 bg-white"
                >
                  <div className="mb-4">{stat.icon}</div>

                  <h3 className="text-sm font-semibold">
                    {stat.title}
                  </h3>

                  <p className="text-3xl font-black mt-3">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* ================= ORDERS ================= */}
          {activeTab === 'orders' && (
            <div className="border border-black p-6">
              <h3 className="text-lg font-black uppercase mb-4">
                Orders Management
              </h3>

              <p className="text-sm">
                View, manage and track all marketplace orders here.
              </p>
            </div>
          )}

          {/* ================= PRODUCTS ================= */}
          {activeTab === 'products' && (
            <div className="border border-black p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-black uppercase">
                  Products Management
                </h3>

                <button
                  onClick={() => setShowProductModal(true)}
                  className="bg-green-600 text-white px-6 py-3 font-semibold"
                >
                  Add Product
                </button>
              </div>

              <div className="space-y-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="border border-black p-4"
                  >
                    <div className="flex flex-col md:flex-row gap-5">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full md:w-28 h-52 md:h-28 object-cover border border-black"
                      />

                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">
                          <div>
                            <h4 className="font-bold text-lg">
                              {product.name}
                            </h4>

                            <p className="text-sm">
                              {product.category}
                            </p>

                            <p className="text-sm mt-2">
                              {product.description}
                            </p>
                          </div>

                          <div className="font-black text-lg">
                            ₦{Number(product.price).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= SURVEY ================= */}
          {activeTab === 'survey' && (
            <div className="border border-black p-6">
              <h3 className="text-lg font-black uppercase mb-4">
                Survey Responses
              </h3>

              <p className="text-sm">
                All submitted survey responses will appear here.
              </p>
            </div>
          )}

          {/* ================= SETTINGS ================= */}
          {activeTab === 'settings' && (
            <div className="border border-black p-6">
              <h3 className="text-lg font-black uppercase mb-4">
                Settings
              </h3>

              <p className="text-sm">
                Configure admins, permissions and system settings.
              </p>
            </div>
          )}
        </main>
      </div>

      {/* ================= RESPONSIVE ADD PRODUCT MODAL ================= */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div
            className="
              bg-white
              w-full
              max-w-xl
              border
              border-black
              relative
              my-10
              max-h-[90vh]
              overflow-y-auto
            "
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setShowProductModal(false)}
              className="absolute top-5 right-5 z-10 bg-white"
            >
              <X size={24} />
            </button>

            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-black uppercase mb-6">
                Add Product
              </h2>

              <div className="space-y-4">
                {/* PRODUCT NAME */}
                <input
                  type="text"
                  placeholder="Product Name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full border border-black p-3 outline-none"
                />

                {/* CATEGORY */}
                <input
                  type="text"
                  placeholder="Category"
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  className="w-full border border-black p-3 outline-none"
                />

                {/* PRICE */}
                <input
                  type="number"
                  placeholder="Price"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  className="w-full border border-black p-3 outline-none"
                />

                {/* IMAGE UPLOAD */}
                <div>
                  <label className="block font-semibold mb-2">
                    Upload Product Image
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full border border-black p-3"
                  />

                  {productImagePreview && (
                    <div className="mt-4">
                      <img
                        src={productImagePreview}
                        alt="Preview"
                        className="
                          w-full
                          max-w-[220px]
                          h-auto
                          object-cover
                          border
                          border-black
                        "
                      />
                    </div>
                  )}
                </div>

                {/* DESCRIPTION */}
                <textarea
                  rows={5}
                  placeholder="Product Description"
                  value={productDescription}
                  onChange={(e) =>
                    setProductDescription(e.target.value)
                  }
                  className="w-full border border-black p-3 outline-none resize-none"
                />

                {/* SAVE BUTTON */}
                <button
                  onClick={handleAddProduct}
                  className="
                    w-full
                    bg-green-600
                    text-white
                    py-4
                    font-bold
                    uppercase
                    hover:bg-green-700
                    transition
                  "
                >
                  Save Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}