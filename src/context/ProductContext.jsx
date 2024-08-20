import { createContext, useReducer, useContext, useEffect } from "react";
import axios from "axios";

const ProductContext = createContext();

const initialState = {
  products: [],
  filteredProducts: [],
  categories: [],
  currentPage: 1,
  totalPages: 1,
  itemsPerPage: 5,
  sort: "asc",
  category: "",
};

const productReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        filteredProducts: action.payload,
      };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "SET_TOTAL_PAGES":
      return { ...state, totalPages: action.payload };
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };
    case "SET_SORT":
      return { ...state, sort: action.payload };
    case "SET_ITEMS_PER_PAGE":
      return { ...state, itemsPerPage: action.payload };
    case "SET_CATEGORY":
      const filteredProducts = state.products.filter(
        (product) =>
          action.payload === "" || product.category === action.payload,
      );
      return {
        ...state,
        category: action.payload,
        filteredProducts,
        totalPages: Math.ceil(filteredProducts.length / state.itemsPerPage),
        currentPage: 1,
      };
    default:
      return state;
  }
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/products?limit=${state.itemsPerPage}&sort=${state.sort}`,
        );
        dispatch({ type: "SET_PRODUCTS", payload: response.data });
        dispatch({
          type: "SET_TOTAL_PAGES",
          payload: Math.ceil(response.data.length / state.itemsPerPage),
        });
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://fakestoreapi.com/products/categories",
        );
        dispatch({ type: "SET_CATEGORIES", payload: response.data });
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, [state.itemsPerPage, state.sort]);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
