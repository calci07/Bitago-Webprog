import { Link } from 'react-router-dom';

const sharedLinkClassName =
  'text-sm text-zinc-300 transition hover:text-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950';

const Footer = () => {
  return (
    <footer className="border-t-2 border-zinc-900 bg-zinc-950 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <p className="font-display text-xl font-bold text-zinc-50">BulldogEx Shop</p>
          <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-300">
            Campus essentials curated for class, commute, and study life.
            Built with a simple flow and clear product details.
          </p>
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-400">
            NU Student Marketplace
          </p>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-400">Explore</p>
          <nav aria-label="Footer explore links" className="mt-3 flex flex-col gap-2">
            <Link to="/" className={sharedLinkClassName}>Home</Link>
            <Link to="/about" className={sharedLinkClassName}>About</Link>
            <Link to="/products" className={sharedLinkClassName}>Products</Link>
          </nav>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-400">Account</p>
          <nav aria-label="Footer account links" className="mt-3 flex flex-col gap-2">
            <Link to="/auth/signin" className={sharedLinkClassName}>Sign In</Link>
            <Link to="/auth/signup" className={sharedLinkClassName}>Sign Up</Link>
            <Link to="/products" className={sharedLinkClassName}>Start Shopping</Link>
          </nav>
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-6xl flex-col gap-2 border-t border-zinc-800 pt-5 text-xs text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} BulldogEx Shop. All rights reserved.</p>
        <Link to="/products" className={sharedLinkClassName}>
          Browse catalog
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
