import { useState } from "react";
import opusLyre from "../../assets/opusLyre.svg";
import { Link } from "react-router-dom";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="pointer-events-none fixed bottom-0 z-10 h-[200px] w-screen bg-gradient-to-b from-transparent to-black/50" />
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 md:hidden p-2 rounded-full hover:scale-110 active:scale-95 transition-transform"
        aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
      >
        {isOpen ? (
          <div className="w-20 h-20 relative flex items-center justify-center">
            <div className="w-12 h-1 bg-white absolute rotate-45"></div>
            <div className="w-12 h-1 bg-white absolute -rotate-45"></div>
          </div>
        ) : (
          <img src={opusLyre} alt="Menu" className="w-20 h-20" />
        )}
      </button>

      <div
        className={`fixed inset-0 bg-[#0E1420] z-40 md:hidden flex flex-col items-center justify-center space-y-8 transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <Link
          to="/users"
          onClick={() => setIsOpen(false)}
          className="md:text-base text-white transition-all duration-300 group-hover/nav:opacity-50 hover:!opacity-100 text-2xl font-bold"
        >
          Users
        </Link>
        <Link
          to="/users/new"
          onClick={() => setIsOpen(false)}
          className="md:text-base text-white transition-all duration-300 group-hover/nav:opacity-50 hover:!opacity-100 text-2xl font-bold"
        >
          Add a user
        </Link>
        <Link
          to="/stats"
          onClick={() => setIsOpen(false)}
          className="md:text-base text-white transition-all duration-300 group-hover/nav:opacity-50 hover:!opacity-100 text-2xl font-bold"
        >
          Stats
        </Link>
      </div>
    </>
  );
};

export default MobileMenu;