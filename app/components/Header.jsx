import { FaSun } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="w-full py-4 bg-blue-900 text-white fixed top-0 left-0 z-50 shadow-md">
      <nav className="mx-auto flex justify-between items-center px-8">
        <div className="text-2xl font-bold text-primary">MacroSaaS</div>
        <ul className="flex space-x-8">
          <li>
            <a href="#macro-form" className="text-gray-300 hover:text-primary transition-all duration-300">
              Create Macro
            </a>
          </li>
          <li>
            <a href="#tutorial" className="text-gray-300 hover:text-primary transition-all duration-300">
              Tutorial
            </a>
          </li>
        </ul>
        <div className="flex items-center space-x-2">
          <FaSun className="text-gray-400 hover:text-primary transition-all duration-300" />
          <span className="text-gray-400">Coming Soon</span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
