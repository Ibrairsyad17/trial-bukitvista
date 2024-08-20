import Logout from "./Logout.jsx";

const Header = () => {
  return (
    <header className={`w-full py-5 border-b shadow-sm bg-white`}>
      <div className="max-w-7xl mx-auto flex px-8 justify-between space-y-4 items-start lg:items-center lg:space-y-0">
        <a
          href="/dashboard"
          className="text-2xl font-bold text-gray-800 hover:underline"
        >
          Dashboard
        </a>
        <Logout />
      </div>
    </header>
  );
};

export default Header;
