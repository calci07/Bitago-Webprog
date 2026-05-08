import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';

const authScenes = {
  signin: {
    eyebrow: 'Returning reader',
    title: 'Slip back into the swamp without losing the calm.',
    description:
      'A focused sign-in flow for readers who want quick access to saved stories, fairytale updates, and the latest ogre dispatches.',
    highlights: [
      {
        title: 'Focused form',
        copy:
          'The card stays compact and readable so the login action feels immediate on both desktop and mobile screens.',
      },
      {
        title: 'Reusable pieces',
        copy:
          'Shared layout, field, and card components keep the auth pages component-based instead of duplicating markup.',
      },
    ],
    metrics: [
      { value: '02', label: 'Auth Routes' },
      { value: '01', label: 'Navbar Entry' },
      { value: '100%', label: 'Shared Shell' },
    ],
  },
  signup: {
    eyebrow: 'Fresh account',
    title: 'Join the chronicle and build your own corner of the swamp.',
    description:
      'The sign-up view uses the same shell but opens up into a slightly broader form so new readers can register without leaving the site tone behind.',
    highlights: [
      {
        title: 'Clear onboarding',
        copy:
          'Grouped name fields, direct helper text, and a simple consent block make the registration flow easier to scan.',
      },
      {
        title: 'Consistent design',
        copy:
          'Both auth pages stay visually connected to the green-and-cream aesthetic already used across the existing site.',
      },
    ],
    metrics: [
      { value: '04', label: 'Primary Fields' },
      { value: '02', label: 'Secondary Actions' },
      { value: '01', label: 'Unified Theme' },
    ],
  },
};

const AuthLayout = () => {
  const location = useLocation();
  const currentScene = location.pathname.endsWith('/signup') ? authScenes.signup : authScenes.signin;

  const getTabClasses = ({ isActive }) =>
    `rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${
      isActive ? 'bg-white text-[#173322]' : 'text-white/75 hover:text-white'
    }`;

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,_#eef6e6,_#f8f3e8_52%,_#dde8d4)] px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-2.5rem)] max-w-6xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <aside className="relative overflow-hidden rounded-[2rem] border border-[#27482b] bg-[#173322] p-6 text-white shadow-[0_45px_100px_rgba(13,34,21,0.26)] sm:p-8">
          <div className="absolute right-[-4rem] top-[-3rem] h-44 w-44 rounded-full bg-[#a6d46a]/25 blur-3xl" />
          <div className="absolute bottom-[-6rem] left-[-1rem] h-56 w-56 rounded-full bg-[#f7d46a]/20 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />

          <div className="relative z-10 flex h-full flex-col">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Link to="/" className="inline-flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-[1.2rem] border border-white/15 bg-white/10 font-serif text-lg text-[#f6ecd8]">
                  SC
                </span>
                <span className="text-sm font-semibold uppercase tracking-[0.22em] text-[#d8ead2]">
                  The Swamp Chronicles
                </span>
              </Link>

              <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1">
                <NavLink to="/auth/signin" className={getTabClasses}>
                  Sign In
                </NavLink>
                <NavLink to="/auth/signup" className={getTabClasses}>
                  Sign Up
                </NavLink>
              </div>
            </div>

            <div className="mt-12 max-w-xl">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[#b9d89b]">
                {currentScene.eyebrow}
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-[#fff5df] sm:text-5xl">
                {currentScene.title}
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-7 text-[#d8e7d4] sm:text-base">
                {currentScene.description}
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {currentScene.highlights.map((highlight) => (
                <article
                  key={highlight.title}
                  className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b9d89b]">
                    {highlight.title}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[#edf5ec]">{highlight.copy}</p>
                </article>
              ))}
            </div>

            <div className="mt-auto grid gap-3 pt-10 sm:grid-cols-3">
              {currentScene.metrics.map((metric) => (
                <div key={metric.label} className="rounded-[1.4rem] border border-white/10 bg-black/10 p-4">
                  <p className="font-serif text-3xl text-[#fff5df]">{metric.value}</p>
                  <p className="mt-2 text-[0.68rem] uppercase tracking-[0.2em] text-[#d8ead2]">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <div className="flex items-center justify-center">
          <div className="w-full max-w-2xl">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
