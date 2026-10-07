const api_url = import.meta.env.VITE_API_URL
export const getProducts = async () => {
  const response = await fetch(api_url);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};
export default api_url;