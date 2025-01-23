import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.svg";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809')] bg-repeat">
      <header className="bg-black/80 text-white p-4">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            <img src={logo} alt="Opus Major" className="h-8" />
          </Link>
          <div className="space-x-4">
            <Link
              to="/users"
              className={`hover:text-yellow-400 transition-colors ${
                location.pathname === "/users" ? "text-yellow-400" : ""
              }`}
            >
              Utilisateurs
            </Link>
            <Link
              to="/users/new"
              className={`hover:text-yellow-400 transition-colors ${
                location.pathname === "/users/new" ? "text-yellow-400" : ""
              }`}
            >
              Nouveau
            </Link>
            <Link
              to="/users/stats"
              className={`hover:text-yellow-400 transition-colors ${
                location.pathname === "/users/stats" ? "text-yellow-400" : ""
              }`}
            >
              Statistiques
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
