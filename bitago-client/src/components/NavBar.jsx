import { NavLink } from 'react-router-dom';
import logo from '../assets/img/nubdexchange_logo.png';

const primaryLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Products', to: '/products' },
];

const accountLinks = [
  { label: 'Sign In', to: '/auth/signin' },
  { label: 'Sign Up', to: '/auth/signup' },
];

const primaryNavLinkClassName = ({ isActive }) =>
  [
    'rounded-full border-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition',
    isActive
      ? 'border-zinc-900 bg-zinc-900 text-zinc-50'
      : 'border-transparent text-zinc-500 hover:border-zinc-900 hover:bg-zinc-50 hover:text-zinc-900',
  ].join(' ');

const accountNavLinkClassName = ({ isActive }) =>
  [
    'rounded-full border-2 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2',
    isActive
      ? 'border-zinc-900 bg-zinc-900 text-zinc-50'
      : 'border-zinc-300 bg-zinc-50 text-zinc-700 hover:border-zinc-900 hover:text-zinc-900',
  ].join(' ');

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-zinc-900 bg-zinc-100/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3">
          <img src={logo} alt="BulldogEx" className="h-9 w-9 rounded-full border-2 border-zinc-900 bg-zinc-50 object-contain" />
          <div className="space-y-0.5">
            <p className="text-xl font-bold text-zinc-900">BulldogEx Shop</p>
          </div>
        </NavLink>

        <div className="flex items-center gap-2">
          <nav aria-label="Primary navigation" className="hidden items-center gap-2 md:flex">
            {primaryLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={primaryNavLinkClassName}
                aria-label={`Go to ${link.label} page`}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <nav aria-label="Authentication navigation" className="flex items-center gap-2">
            {accountLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={accountNavLinkClassName}
                aria-label={`Go to ${link.label} page`}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
