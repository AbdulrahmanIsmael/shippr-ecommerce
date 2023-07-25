export const fetchProducts = async () => {
  const products = await fetch('https://dummyjson.com/products?limit=100');

  try {
    const data = await products.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchCategories = async () => {
  const products = await fetch('https://dummyjson.com/products/categories');

  try {
    const data = await products.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchCategoryProducts = async category => {
  const products = await fetch(
    `https://dummyjson.com/products/category/${category}`
  );

  try {
    const data = await products.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
