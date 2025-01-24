import { ReactNode } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import MobileMenu from "./MobileMenu";
import Navigation from "../navigation/Navigation";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1637825891028-564f672aa42c')] bg-repeat">
    <header className="bg-black/80 text-white p-4">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/">
          <img src={logo} alt="Opus Major" className="h-8" />
        </Link>
        <div className="hidden md:flex space-x-6">
          <Navigation />
        </div>
      </nav>
    </header>

    <main className="max-w-7xl mx-auto p-4 mt-8">
      <div>{children}</div>
    </main>

    <MobileMenu />
  </div>
);

export default Layout;
