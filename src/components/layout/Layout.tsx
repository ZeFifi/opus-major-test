import { ReactNode } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809')] bg-repeat">
      <header className="bg-black/80 text-white p-4">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-2xl">
            <img src={logo} alt="Opus Major" className="h-8" />
          </Link>
          <div className="space-x-4 font-bold flex items-center group/nav">
            <Link
              to="/users"
              className="text-white transition-all duration-300 group-hover/nav:opacity-50 hover:!opacity-100"
            >
              Users
            </Link>
            <Link
              to="/users/new"
              className="text-white transition-all duration-300 group-hover/nav:opacity-50 hover:!opacity-100"
            >
              Add a user
            </Link>
            <Link
              to="/users/stats"
              className="text-white transition-all duration-300 group-hover/nav:opacity-50 hover:!opacity-100"
            >
              Stats
            </Link>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto p-4 mt-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
