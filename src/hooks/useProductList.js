import { useProduct } from "../context/ProductContext";

const useProductList = () => {
  const { state, dispatch } = useProduct();
  const {
    filteredProducts,
    categories,
    currentPage,
    itemsPerPage,
    totalPages,
    sort,
    category,
  } = state;

  const handlePageChange = (page) => {
    dispatch({ type: "SET_CURRENT_PAGE", payload: page });
  };

  const handleSortChange = (e) => {
    dispatch({ type: "SET_SORT", payload: e.target.value });
  };

  const handleLimitChange = (e) => {
    dispatch({ type: "SET_ITEMS_PER_PAGE", payload: parseInt(e.target.value) });
  };

  const handleCategoryChange = (e) => {
    dispatch({ type: "SET_CATEGORY", payload: e.target.value });
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return {
    products: currentProducts,
    categories,
    currentPage,
    itemsPerPage,
    totalPages,
    sort,
    category,
    handlePageChange,
    handleSortChange,
    handleLimitChange,
    handleCategoryChange,
  };
};

export default useProductList;
