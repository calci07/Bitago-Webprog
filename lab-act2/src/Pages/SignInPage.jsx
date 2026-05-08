import { Link, useNavigate } from 'react-router-dom';
import AuthCard from '../components/AuthCard';
import AuthField from '../components/AuthField';
import Button from '../components/Button';

const actionButtonClassName = 'w-full px-6 py-3 text-[0.72rem] uppercase tracking-[0.2em]';

const SignInPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/', { replace: true });
  };

  return (
    <AuthCard
      eyebrow="Sign in"
      title="Welcome back to The Swamp Chronicles."
      description="Access your saved reads, personalized updates, and the latest stories from the swamp in just a few clicks."
      footer={
        <>
          New to The Swamp Chronicles?{' '}
          <Link className="font-semibold text-[#3f6223] transition hover:text-[#2f4a19]" to="/auth/signup">
            Create your account.
          </Link>
        </>
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <AuthField
          autoComplete="email"
          id="signin-email"
          label="Email Address"
          placeholder="you@example.com"
          required
          type="email"
        />

        <AuthField
          autoComplete="current-password"
          helperText="Enter the password linked to your account."
          id="signin-password"
          label="Password"
          placeholder="Enter your password"
          required
          type="password"
        />

        <div className="flex flex-col gap-3 text-sm text-[#5c5347] sm:flex-row sm:items-center sm:justify-between">
          <label className="inline-flex items-center gap-3">
            <input className="h-4 w-4 rounded border-[#c9bda9] accent-[#5d8a37]" type="checkbox" />
            <span>Keep me signed in on this device</span>
          </label>
          <Link className="font-semibold text-[#3f6223] transition hover:text-[#2f4a19]" to="/">
            Back to homepage
          </Link>
        </div>

        <Button className={actionButtonClassName} type="submit" variant="primary">
          Log In
        </Button>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button className={actionButtonClassName} type="button" variant="surface">
            Continue with Google
          </Button>
          <Button className={actionButtonClassName} type="button" variant="surface">
            Continue with Apple
          </Button>
        </div>
      </form>
    </AuthCard>
  );
};

export default SignInPage;
