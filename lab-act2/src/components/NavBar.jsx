import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/shrek.jpg';

const Navbar = () => {
  return (
    <nav className="border-b border-zinc-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center gap-3">
          
          <img
            src="https://i.redd.it/ebd200mjenm91.jpg" 
            alt="The Swamp Chronicles Logo"
            className="h-10 w-10 rounded-full border-2 border-[#5D8A37] object-cover" // A green border
          />
          <span className="text-2xl font-bold tracking-tight text-zinc-900">
            The Swamp Chronicles
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-semibold text-zinc-700 transition hover:text-[#5D8A37] ${
                isActive ? 'text-[#5D8A37]' : ''
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-sm font-semibold text-zinc-700 transition hover:text-[#5D8A37] ${
                isActive ? 'text-[#5D8A37]' : ''
              }`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/articles"
            className={({ isActive }) =>
              `text-sm font-semibold text-zinc-700 transition hover:text-[#5D8A37] ${
                isActive ? 'text-[#5D8A37]' : ''
              }`
            }
          >
            Articles
          </NavLink>
        </div>
      
      </div>
    </nav>
  );
};

export default Navbar;