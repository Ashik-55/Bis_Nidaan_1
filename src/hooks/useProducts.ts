import { useState, useEffect, useCallback } from 'react';
import type { Product } from '../types/Product';
import { products as staticProducts } from '../data/products';

const STORAGE_KEY = 'bis_nidaan_products';

export function useProducts() {
  const [generatedProducts, setGeneratedProducts] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const allProducts = [...staticProducts, ...generatedProducts];

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(generatedProducts));
    } catch {
      console.warn('Failed to persist products to localStorage');
    }
  }, [generatedProducts]);

  const addProduct = useCallback((product: Product) => {
    setGeneratedProducts(prev => {
      // Avoid duplicates by id
      const exists = prev.some(p => p.id === product.id);
      if (exists) return prev;
      return [product, ...prev];
    });
  }, []);

  const deleteProduct = useCallback((productId: string) => {
    setGeneratedProducts(prev => prev.filter(p => p.id !== productId));
  }, []);

  const getProductById = useCallback((id: string): Product | undefined => {
    return allProducts.find(p => p.id === id);
  }, [allProducts]);

  const clearGenerated = useCallback(() => {
    setGeneratedProducts([]);
  }, []);

  const bulkAdd = useCallback((products: Product[]) => {
    setGeneratedProducts(prev => {
      const existingIds = new Set(prev.map(p => p.id));
      const newOnes = products.filter(p => !existingIds.has(p.id));
      return [...newOnes, ...prev];
    });
  }, []);

  return {
    allProducts,
    staticProducts,
    generatedProducts,
    addProduct,
    deleteProduct,
    getProductById,
    clearGenerated,
    bulkAdd,
  };
}
