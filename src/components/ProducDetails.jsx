import { Navigate, useNavigate, useParams } from "react-router-dom";
import useProductDetails from "../hooks/useProductDetails";
import Header from "./Header.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const ProductDetails = () => {
  const { id } = useParams();
  const { product, loading, error } = useProductDetails(id);
  const navigate = useNavigate();
  const { state } = useAuth();

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">Memuat...</div>
    );
  if (error) return <div>{error}</div>;

  if (!state.token) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Header />
      <section className="bg-white antialiased flex flex-col space-y-8">
        <div className="max-w-screen-xl mt-6 p-4 mx-auto 2xl:px-0">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
              <img className="w-5/6" src={product.image} alt={product.title} />
            </div>

            <div className="mt-6 sm:mt-8 lg:mt-0">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                {product.title}
              </h1>
              <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                  ${product.price}
                </p>
              </div>
              <p className="text-md my-4">Kategori: {product.category}</p>

              <hr className="my-4 border-gray-200" />

              <p className="mb-6 text-gray-600">
                Rating:{" "}
                <span className="text-yellow-500">{product.rating.rate}</span>
              </p>
              <p className="mb-6 text-gray-600">
                Jumlah Review: {product.rating.count}
              </p>
              <p className="mb-6 text-gray-500">{product.description}</p>
              <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 bg-gray-900 text-white"
              >
                Kembali
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
