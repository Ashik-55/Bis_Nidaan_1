import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import VerifyProduct from './pages/VerifyProduct';
import DataMatrixGenerator from './pages/DataMatrixGenerator';
import ProductGenerator from './pages/ProductGenerator';
import Standards from './pages/Standards';
import Compliance from './pages/Compliance';
import Assistant from './pages/Assistant';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public landing page */}
        <Route path="/" element={<Home />} />

        {/* Dashboard layout routes */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/verify" element={<VerifyProduct />} />
          <Route path="/data-matrix" element={<DataMatrixGenerator />} />
          <Route path="/product-generator" element={<ProductGenerator />} />
          <Route path="/standards" element={<Standards />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
