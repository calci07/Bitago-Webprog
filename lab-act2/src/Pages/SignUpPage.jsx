import { Link } from 'react-router-dom';
import AuthCard from '../components/AuthCard';
import AuthField from '../components/AuthField';
import Button from '../components/Button';

const nameFields = [
  {
    autoComplete: 'given-name',
    id: 'signup-first-name',
    label: 'First Name',
    placeholder: 'Shrek',
    required: true,
    type: 'text',
  },
  {
    autoComplete: 'family-name',
    id: 'signup-last-name',
    label: 'Last Name',
    placeholder: 'Ogre',
    required: true,
    type: 'text',
  },
];

const actionButtonClassName = 'w-full px-6 py-3 text-[0.72rem] uppercase tracking-[0.2em]';

const SignUpPage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <AuthCard
      eyebrow="Create profile"
      title="Start an account built for fairytale readers."
      description="The sign-up page expands the form just enough for registration while keeping the same reusable card, field, and button structure as the sign-in view."
      footer={
        <>
          Already have an account?{' '}
          <Link className="font-semibold text-[#3f6223] transition hover:text-[#2f4a19]" to="/auth/signin">
            Sign in here.
          </Link>
        </>
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          {nameFields.map((field) => (
            <AuthField key={field.id} {...field} />
          ))}
        </div>

        <AuthField
          autoComplete="email"
          id="signup-email"
          label="Email Address"
          placeholder="you@swampmail.com"
          required
          type="email"
        />

        <AuthField
          autoComplete="new-password"
          helperText="Use letters, numbers, and symbols to build a stronger password."
          id="signup-password"
          label="Password"
          placeholder="Create a secure password"
          required
          type="password"
        />

        <label className="flex items-start gap-3 rounded-[1.4rem] border border-[#eadfca] bg-white/70 px-4 py-4 text-sm leading-6 text-[#5c5347]">
          <input className="mt-1 h-4 w-4 rounded border-[#c9bda9] accent-[#5d8a37]" required type="checkbox" />
          <span>
            I agree to receive account updates and understand this is a front-end demo flow for the lab activity.
          </span>
        </label>

        <Button className={actionButtonClassName} type="submit" variant="primary">
          Create Account
        </Button>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button className={actionButtonClassName} type="button" variant="surface">
            Sign Up with Google
          </Button>
          <Button className={actionButtonClassName} type="button" variant="surface">
            Sign Up with Apple
          </Button>
        </div>
      </form>
    </AuthCard>
  );
};

export default SignUpPage;
