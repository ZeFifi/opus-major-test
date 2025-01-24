import { Link } from "react-router-dom";

const links = [
  { to: "/users", label: "Users" },
  { to: "/users/new", label: "Add a user" },
  { to: "/users/stats", label: "Stats" },
];

const Navigation = () => {
  return links.map((link) => (
    <Link
      key={link.to}
      to={link.to}
      className="text-white transition-all duration-300 
        md:text-base md:hover:text-yellow-400
        text-2xl font-bold"
    >
      {link.label}
    </Link>
  ));
};

export default Navigation;
