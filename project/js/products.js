export const fetchProducts = async () => {
  const products = await fetch('https://dummyjson.com/products');

  try {
    const data = await products.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
