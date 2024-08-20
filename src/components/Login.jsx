import useLogin from "../hooks/useLogin";

const Login = () => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    handleLogin,
    isLoading,
    error,
  } = useLogin();

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center space-y-4">
      {error && <span className="text-sm text-red-600 mt-2">{error}</span>}
      <div className={`mt-7 max-w-sm mx-auto border rounded-xl shadow`}>
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className={`block text-2xl font-bold text-gray-900`}>
              Halo Pengguna!
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Selamat datang, silahkan masuk untuk melanjutkan!.
            </p>
          </div>

          <div className="mt-5">
            <form onSubmit={handleLogin}>
              <div className="grid gap-y-4">
                <div>
                  <label htmlFor="username" className="block text-xs mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <input
                      id="username"
                      name="username"
                      value={username}
                      type="text"
                      required
                      className={`px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6`}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Username: mor_2314"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center">
                    <label htmlFor="password" className="block text-xs mb-2">
                      Kata Sandi
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      value={password}
                      name="password"
                      className={`px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-xs focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6`}
                      required
                      aria-describedby="password-error"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Kata Sandi: 83r5^_"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className={`w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none ${
                    isLoading ? "cursor-not-allowed" : ""
                  }`}
                  disabled={isLoading}
                >
                  Masuk ke Dashboard
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
