import { useState } from "react";
import opusLyre from "../../assets/opusLyre.svg";
import Navigation from "../navigation/Navigation";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 md:hidden p-2 rounded-full hover:scale-110 active:scale-95 transition-transform"
        aria-label="Menu"
      >
        <img src={opusLyre} alt="Menu" className="w-10 h-10" />
      </button>

      <div
        className={`fixed inset-0 bg-black/95 z-40 md:hidden flex flex-col items-center justify-center space-y-8 transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <Navigation />
      </div>
    </>
  );
};

export default MobileMenu;
