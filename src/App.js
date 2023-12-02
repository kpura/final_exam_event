import React, { useEffect, useState } from 'react';
import Product_Form from './components/Product_Form';
import Product_List from './components/Product_List';
import Category_Form from './components/Category_Form';
import Stock_Form from './components/Stock_Form';
import Stock_List from './components/Stock_List';
import TransactionManagement from './components/TransactionManagement';
import TransactionReport from './components/TransactionReport';
import Category_List from './components/Category_List';
import './App.css';
import { Button } from 'react-bootstrap';
import Chart from 'chart.js/auto';

const App = () => {
  const [products, setProducts] = useState(() => {
    const storedProducts = localStorage.getItem('products');
    return storedProducts ? JSON.parse(storedProducts) : [];
  });
  const [categories, setCategories] = useState(['Smartphones', 'Laptops', 'Computers', 'Wearables']);
  const [cart, setCart] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState('products');
  const [showTransactionReport, setShowTransactionReport] = useState(false);

  const handlePaymentCompleted = (completedTransactions) => {
    // Update the transactions state
    setTransactions([...transactions, ...completedTransactions]);

    // Set the flag indicating payment has been completed
    setShowTransactionReport(true);
  };

  useEffect(() => {
    // Check if payment has been completed and switch to the "reports" tab
    if (showTransactionReport) {
      setActiveTab('reports');
    }
  }, [showTransactionReport]);



  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const add_product = (product) => {
    const lastProductId = products.length > 0 ? products[products.length - 1].id : 'GZMGTZ-1000';
    const lastProductIdNumber = parseInt(lastProductId.match(/\d+/)[0]);
    const newProductId = `GZMGTZ-${lastProductIdNumber + 1}`;

    setProducts([...products, { ...product, id: newProductId }]);
  };

  const edit_product = (editedProduct) => {
    const updatedProducts = products.map((product) =>
      product.id === editedProduct.id ? editedProduct : product
    );
    setProducts(updatedProducts);
  };

  const delete_product = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    const updatedProductsIds = updatedProducts.map((product, index) => {
      return { ...product, id: `GZMGTZ-${index + 1001}` };
    });
    setProducts(updatedProductsIds);
  };

  const add_category = (category) => {
    setCategories([...categories, category]);
  };

  const delete_category = (category) => {
    const updatedCategories = categories.filter((c) => c !== category);
    setCategories(updatedCategories);
  };

  const update_category = (oldCategory, newCategory) => {
    const updatedCategories = categories.map((category) =>
      category === oldCategory ? newCategory : category
    );
    setCategories(updatedCategories);
  };

  const update_stock = (productId, newStock) => {
    const updatedProducts = products.map((p) =>
      p.id === productId ? { ...p, stock: newStock } : p
    );
    setProducts(updatedProducts);
  };

  const handleAddToCart = (productId) => {
    const productToAdd = products.find(product => product.id === productId);
    if (productToAdd) {
      setCart([...cart, productToAdd]);

  const updatedProducts = products.map(product =>
        product.id === productId ? { ...product, stock: product.stock - 1 } : product
      );
      setProducts(updatedProducts);
    }
  };

  return (
    <div>
      <header>
        <div className="container">
          <h1>GizmoGlitz</h1>
          <nav>
            <Button onClick={() => setActiveTab('products')}>Products</Button>&nbsp;
            <Button onClick={() => setActiveTab('stocks')}>Stocks</Button> &nbsp;
            <Button onClick={() => setActiveTab('transaction')}>Transaction</Button>&nbsp;
            <Button onClick={() => setActiveTab('reports')}>Reports</Button>&nbsp;
          </nav>
        </div>
      </header>

      <div className="container">
        {activeTab === 'products' && (
          <div>
            <h2>Product Management</h2>
            <Category_Form onSubmit={add_category} />
            <Category_List
              categories={categories}
              onDelete={delete_category}
              onUpdate={update_category}
            />
          </div>
        )}
        {activeTab === 'products' && (
          <div>
           <Product_Form onSubmit={add_product} categories={categories} />
            <Product_List
              products={products}
              categories={categories}
              onUpdate={edit_product}
              onDelete={delete_product}
            />
          </div>
        )}

        {activeTab === 'stocks' && (
          <div>
            <h2>Stocks Management</h2>
            <Stock_Form products={products} onUpdateStock={update_stock} />
            <Stock_List products={products} />
          </div>
        )}
        {activeTab === 'transaction' && (
        <div>
          <h2>Transaction Management</h2>
          <TransactionManagement
              products={products}
              setProducts={setProducts}
              handleAddToCart={handleAddToCart}
              transactions={transactions}
              setTransactions={setTransactions}
              onPaymentCompleted={handlePaymentCompleted}
            />
        </div>
        )}

        {activeTab === 'reports' && (
          <div>
            <h2>Transaction Report</h2>
            <TransactionReport transactions={transactions} products={products} />
          </div>
)}
      </div>  
    </div>
  );
};

export default App;