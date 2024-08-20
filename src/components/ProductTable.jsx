import React from "react";
import useProductList from "../hooks/useProductList.js";

const ProductTable = () => {
  const {
    products,
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
  } = useProductList();

  return (
    <div className="w-10/12 mx-auto">
      <div className="w-full flex justify-center space-x-7 mt-4">
        <label className="flex space-x-2">
          <span>Sort:</span>
          <select
            value={sort}
            onChange={handleSortChange}
            className="px-2 border shadow"
          >
            <option value="asc">ASC</option>
            <option value="desc">DESC</option>
          </select>
        </label>
        <label className="flex space-x-5">
          Show:
          <select
            value={itemsPerPage}
            onChange={handleLimitChange}
            className="px-2 border shadow ml-2"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </label>
        <label className="flex space-x-5">
          Category:
          <select
            value={category}
            onChange={handleCategoryChange}
            className="px-2 border shadow ml-2"
          >
            <option value="">All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
      </div>
      <table className="w-full my-8 divide-y divide-gray-300 px-4 py-2 shadow border border-gray-300">
        <thead>
          <tr>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-900 uppercase">
              ID
            </th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-900 uppercase">
              Image
            </th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-900 uppercase">
              Title
            </th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-900 uppercase">
              Price
            </th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-900 uppercase">
              Category
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {products.map((product) => (
            <tr key={product.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                {product.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                <img
                  src={product.image}
                  alt={product.title}
                  style={{ width: 50 }}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 truncate overflow-hidden">
                {product.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                {product.price}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                {product.category}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
