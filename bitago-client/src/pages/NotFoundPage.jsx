import Button from '../components/Button';
import { Link } from 'react-router-dom';

const quickLinks = [
  {
    title: 'Home',
    description: 'Return to the homepage and start browsing featured sections.',
    to: '/',
    action: 'Go Home',
  },
  {
    title: 'Products',
    description: 'Open the product catalog to view all campus essentials.',
    to: '/products',
    action: 'View Products',
  },
  {
    title: 'Sign In',
    description: 'Access your account to check saved items and order details.',
    to: '/auth/signin',
    action: 'Sign In',
  },
  {
    title: 'Sign Up',
    description: 'Create a new account for faster checkout and updates.',
    to: '/auth/signup',
    action: 'Sign Up',
  },
];

const NotFoundPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            404 Error
          </p>
          <h1 className="font-display text-5xl font-bold leading-tight text-zinc-900 sm:text-6xl">
            This page wandered off campus.
          </h1>
          <p className="mt-4 text-lg leading-7 text-zinc-600">
            The page you requested could not be found. Try one of the links below to get back on track.
          </p>
          <div className="mt-6 flex gap-3">
            <Button to="/">Back Home</Button>
            <Button to="/products">View Products</Button>
          </div>
          <p className="mt-5 text-sm text-zinc-600">
            Need account access?{' '}
            <Link to="/auth/signin" className="font-semibold text-zinc-900 underline underline-offset-2">
              Sign In
            </Link>{' '}
            or{' '}
            <Link to="/auth/signup" className="font-semibold text-zinc-900 underline underline-offset-2">
              Sign Up
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Quick Links
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-zinc-900">Explore the site</h2>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {quickLinks.map((link) => (
              <div key={link.to} className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4 shadow-sm">
                <h3 className="font-semibold text-zinc-900">{link.title}</h3>
                <p className="mt-1 text-sm leading-6 text-zinc-600">{link.description}</p>
                <Button to={link.to} className="mt-3">{link.action}</Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFoundPage;
