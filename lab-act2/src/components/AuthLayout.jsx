import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';

const authScenes = {
  signin: {
    eyebrow: 'Welcome back',
    title: 'Your next story is waiting right where you left it.',
    description:
      'Sign in to revisit saved reads, catch the latest headlines from Far Far Away, and stay connected to every new chapter in the swamp.',
    highlights: [
      {
        title: 'Fast access',
        copy:
          'A clean sign-in flow gets readers back into their account quickly, whether they are checking in from desktop or mobile.',
      },
      {
        title: 'Reader-first experience',
        copy:
          'Saved articles, returning sessions, and a familiar experience make it easy to pick up the story without friction.',
      },
    ],
    metrics: [
      { value: '24/7', label: 'Account Access' },
      { value: 'Fresh', label: 'New Releases' },
      { value: 'Saved', label: 'Favorite Reads' },
    ],
  },
  signup: {
    eyebrow: 'New reader',
    title: 'Create your account and make the swamp your own.',
    description:
      'Join The Swamp Chronicles to save your favorite stories, follow the latest releases, and enjoy a smoother reading experience every time you return.',
    highlights: [
      {
        title: 'Save what you love',
        copy:
          'Build your personal reading list so the articles, characters, and updates you care about are always easy to find.',
      },
      {
        title: 'Stay in the loop',
        copy:
          'Get timely updates on fresh stories, featured posts, and the latest dispatches from the world of Far Far Away.',
      },
    ],
    metrics: [
      { value: '2 min', label: 'Typical Setup' },
      { value: 'Fresh', label: 'Story Alerts' },
      { value: 'Saved', label: 'Reading List' },
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
