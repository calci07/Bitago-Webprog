import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

const inputClasses =
  'mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-zinc-50';

const actionButtonClassName = 'w-full rounded-xl py-3 text-[11px] tracking-[0.2em]';

const SignInPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email') ?? '').trim();
    const password = String(formData.get('password') ?? '').trim();

    if (!email || !password) {
      setError('Enter your email address and password before continuing.');
      return;
    }

    setError('');
    navigate('/');
  };

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Log In</h1>
      <p className="mt-3 text-sm leading-6 text-zinc-600">
        Access your store account to review orders, saved items, and pickup details.
      </p>
      <nav aria-label="Authentication page links" className="mt-5 flex items-center gap-3 text-sm text-zinc-600">
        <span className="font-medium">Auth pages:</span>
        <Link
          to="/auth/signin"
          aria-current="page"
          aria-label="Current page, Sign In"
          className="font-semibold text-zinc-900 underline decoration-2 underline-offset-4"
        >
          Sign In
        </Link>
        <Link
          to="/auth/signup"
          aria-label="Go to Sign Up page"
          className="font-semibold text-zinc-700 underline decoration-2 underline-offset-4 transition hover:text-zinc-900"
        >
          Sign Up
        </Link>
      </nav>

      <form className="mt-8 space-y-5" noValidate onSubmit={handleSubmit}>
        {error ? (
          <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        ) : null}
        <div>
          <label htmlFor="signin-email" className="text-sm font-medium text-zinc-700">
            Email Address
          </label>
          <input
            id="signin-email"
            name="email"
            type="text"
            placeholder="student@email.com"
            autoComplete="email"
            aria-required="true"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="signin-password" className="text-sm font-medium text-zinc-700">
            Password
          </label>
          <input
            id="signin-password"
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            aria-required="true"
            className={inputClasses}
          />
          <p className="mt-2 text-xs leading-5 text-zinc-500">
            It must be a combination of minimum 8 letters, numbers, and symbols.
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 text-sm">
          <label htmlFor="remember-me" className="flex items-center gap-2 text-zinc-600">
            <input id="remember-me" type="checkbox" className="h-4 w-4 rounded border-zinc-300 accent-zinc-900" />
            <span>Remember me</span>
          </label>
          <button type="button" className="font-medium text-zinc-700 transition hover:text-zinc-900">
            Forgot Password?
          </button>
        </div>

        <Button type="submit" variant="primary" className={actionButtonClassName}>
          Log In
        </Button>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button type="button" variant="secondary" className={actionButtonClassName}>
            Log In with Google
          </Button>
          <Button type="button" variant="secondary" className={actionButtonClassName}>
            Log In with Apple
          </Button>
        </div>
      </form>

      <div className="mt-8 border-t border-zinc-200 pt-6 text-sm text-zinc-600">
        No account yet?{' '}
        <Link
          to="/auth/signup"
          aria-label="Go to Sign Up page"
          className="font-semibold text-zinc-900 transition hover:text-zinc-600"
        >
          Sign Up
        </Link>
      </div>
    </>
  );
};

export default SignInPage;
