import Button from '../components/Button';

const AboutPage = () => {
  // URLs for online Shrek images. Be aware these may change!
  const aboutHeroImageUrl = 'https://raw.githubusercontent.com/swamp-tales/assets/main/shrek_portrait.jpg';
  const onionImageUrl = 'https://raw.githubusercontent.com/swamp-tales/assets/main/onions.jpg';
  const dragonImageUrl = 'https://raw.githubusercontent.com/swamp-tales/assets/main/dragon.jpg';
  const castleImageUrl = 'https://raw.githubusercontent.com/swamp-tales/assets/main/far_far_away.jpg';

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-[#5D8A37] bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden rounded-3xl border-2 border-dashed border-[#C5D8B8] bg-[#F1F6EC]">
            <div className="flex min-h-72 items-center justify-center rounded-[1.25rem] bg-[#E1EDD9]">
              {/* SHREK ABOUT HERO IMAGE */}
              <img
                src={aboutHeroImageUrl} // Replace this with your own high-fidelity URL
                alt="Shrek personal portrait"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5D8A37]">
              The Ogre Biography
            </p>
            <h1 className="max-w-xl text-4xl font-extrabold leading-tight text-zinc-900 sm:text-5xl">
              Meet Shrek: The Ogre Who Challenged a Kingdom.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              Shrek was a simple ogre living a happy, private life in his swamp. When the evil Lord Farquaad evicted all the fairytale creatures to his home, Shrek's quiet was shattered. His quest to find the perfect princess to rescue from a dragon would change his life, and the fairytale world, forever.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" variant="primary">
                Return to the Swamp
              </Button>
              <Button to="/articles">Swamp News</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-[#5D8A37] bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5D8A37]">
            Personal Facts
          </p>
          <h2 className="mt-2 text-3xl font-bold text-zinc-900">A detailed look into the ogre's profile</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border-2 border-[#5D8A37] bg-[#F1F6EC] p-5">
            <p className="text-3xl font-extrabold text-zinc-900">01</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-600">
              Beloved Swamp
            </p>
          </div>
          <div className="rounded-3xl border-2 border-[#5D8A37] bg-[#F1F6EC] p-5">
            <p className="text-3xl font-extrabold text-zinc-900">03</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-600">
              Passions (Onions, Privacy, Quiet)
            </p>
          </div>
          <div className="rounded-3xl border-2 border-[#5D8A37] bg-[#F1F6EC] p-5">
            <p className="text-3xl font-extrabold text-zinc-900">02</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-600">
              Foes Conquered (Farquaad, Prince Charming)
            </p>
          </div>
          <div className="rounded-3xl border-2 border-[#5D8A37] bg-[#F1F6EC] p-5">
            <p className="text-3xl font-extrabold text-zinc-900">01</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-600">
              True Love Found
            </p>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-[#5D8A37] bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5D8A37]">
              Ogre Values
            </p>
            <h2 className="mt-2 text-3xl font-bold text-zinc-900">The core of the onion</h2>

            <div className="mt-6 space-y-4">
              <article className="rounded-3xl border-2 border-[#5D8A37] bg-[#F1F6EC] p-5">
                <h3 className="text-xl font-semibold text-zinc-900">Privacy Above All</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  His home is his castle. Shrek's original and most powerful desire was to simply live in peace, a private ogre with no expectations, but the fairytale world would not allow it.
                </p>
              </article>

              <article className="rounded-3xl border-2 border-[#5D8A37] bg-[#F1F6EC] p-5">
                <h3 className="text-xl font-semibold text-zinc-900">Acceptance as a Fight</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  From being hunted to being a king, Shrek's entire journey was a fight for acceptance. He learned that being "just an ogre" was enough, and that true love is the ultimate victory.
                </p>
              </article>

              <article className="rounded-3xl border-2 border-[#5D8A37] bg-[#F1F6EC] p-5">
                <h3 className="text-xl font-semibold text-zinc-900">The Power of Friendship</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Through the loyalty of Donkey and Puss in Boots, Shrek discovered that even an ogre with many onion layers can find the true meaning of companionship, and that sometimes, a talking donkey is exactly what you need.
                </p>
              </article>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-[#5D8A37] bg-[#F1F6EC] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5D8A37]">
              Visual Gallery
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="overflow-hidden rounded-[1.25rem] bg-[#E1EDD9]">
                {/* ONION IMAGE */}
                <img
                  src={onionImageUrl} // Replace this with your own high-fidelity URL
                  alt="Onion Layers"
                  className="aspect-square w-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-[1.25rem] bg-[#E1EDD9]">
                {/* DRAGON IMAGE */}
                <img
                  src={dragonImageUrl} // Replace this with your own high-fidelity URL
                  alt="Dragon"
                  className="aspect-square w-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-[1.25rem] bg-[#E1EDD9]">
                {/* FAR FAR AWAY CASTLE IMAGE */}
                <img
                  src={castleImageUrl} // Replace this with your own high-fidelity URL
                  alt="Far Far Away Castle"
                  className="aspect-square w-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-[1.25rem] bg-[#E1EDD9]">
                {/* Empty placeholder to keep the layout */}
              </div>
            </div>
            <Button className="mt-5">Explore All Scenes</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;