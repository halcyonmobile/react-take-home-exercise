import { FiSun, FiMoon } from "react-icons/fi";

interface Props {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
}

const ThemeSwitch = ({ darkMode, setDarkMode }: Props) => {
  return (
    <div className="flex justify-end mb-4">
      <div className="flex items-center">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`relative inline-flex items-center h-8 rounded-full w-16 transition-colors duration-300 ${
            darkMode ? 'bg-gray-700' : 'bg-gray-300'
          }`}
        >
          <span
            className={`flex items-center justify-center k w-6 h-6 transform bg-white rounded-full transition-transform duration-300 ${
              darkMode ? 'translate-x-8' : 'translate-x-1'
            }`}
          >
            {darkMode ? <FiMoon className="text-gray-800" size={18} /> : <FiSun className="text-yellow-500" size={18} />}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ThemeSwitch;