import Button from '../components/Button';

const HomePage = () => {
  // URLs for online Shrek images. Be aware these may change!
  const mainHeroImageUrl = 'https://raw.githubusercontent.com/swamp-tales/assets/main/hero_shrek.jpg';
  const donkeyImageUrl = 'https://raw.githubusercontent.com/swamp-tales/assets/main/donkey.jpg';
  const fionaImageUrl = 'https://raw.githubusercontent.com/swamp-tales/assets/main/fiona_ogre.jpg';
  const pussImageUrl = 'https://raw.githubusercontent.com/swamp-tales/assets/main/puss_in_boots.jpg';

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-[#5D8A37] bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5D8A37]">
              Swamp Greetings
            </p>
            <h1 className="max-w-xl text-4xl font-extrabold leading-tight text-zinc-900 sm:text-5xl">
              Welcome to the Swamp Chronicles
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              Dive deep into the story of Shrek, the unconventional hero who proved that true beauty is on the inside (and that onions have layers). Discover his adventures, his unlikely friends, and his fight for acceptance.
            </p>
            <div className="mt-6">
              <Button to="/about" variant="primary">
                Learn About the Ogre
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border-2 border-dashed border-[#C5D8B8] bg-[#F1F6EC]"> {/* A light green-dashed area */}
            <div className="flex min-h-65 items-center justify-center rounded-[1.25rem] bg-[#E1EDD9]">
              {/* SHREK HERO IMAGE */}
              <img
                src={mainHeroImageUrl} // Replace this with your own high-fidelity URL
                alt="Shrek portrait"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-[#5D8A37] bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5D8A37]">
            Ogre Metrics
          </p>
          <h2 className="mt-2 text-3xl font-bold text-zinc-900">Essential statistics from the fairytale world</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border-2 border-[#5D8A37] bg-[#F1F6EC] p-5">
            <p className="text-3xl font-extrabold text-zinc-900">01</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-600">
              Swamp (Perfectly Private)
            </p>
          </div>
          <div className="rounded-3xl border-2 border-[#5D8A37] bg-[#F1F6EC] p-5">
            <p className="text-3xl font-extrabold text-zinc-900">03</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-600">
              Unlikely Allies (Donkey, Puss, Dragon)
            </p>
          </div>
          <div className="rounded-3xl border-2 border-[#5D8A37] bg-[#F1F6EC] p-5">
            <p className="text-3xl font-extrabold text-zinc-900">02</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-600">
              True Loves (Onions and Fiona)
            </p>
          </div>
          <div className="rounded-3xl border-2 border-[#5D8A37] bg-[#F1F6EC] p-5">
            <p className="text-3xl font-extrabold text-zinc-900">12</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-600">
              Fairytale Creatures Evicted
            </p>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-[#5D8A37] bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5D8A37]">
            Swamp Tales
          </p>
          <h2 className="mt-2 text-3xl font-bold text-zinc-900">Key figures from the story</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-3xl border-2 border-[#5D8A37] bg-[#F1F6EC] p-4">
            <div className="overflow-hidden rounded-[1.25rem] bg-[#E1EDD9]">
              {/* DONKEY IMAGE */}
              <img
                src={donkeyImageUrl} // Replace this with your own high-fidelity URL
                alt="Donkey"
                className="aspect-4/3 w-full object-cover"
              />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-zinc-900">The Donkey Partnership</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              A detailed look at the loyal, talkative sidekick who could never find a friend but found an ogre. His impact on the quest.
            </p>
            <Button className="mt-4" variant="primary">Read His Story</Button>
          </article>

          <article className="rounded-3xl border-2 border-[#5D8A37] bg-[#F1F6EC] p-4">
            <div className="overflow-hidden rounded-[1.25rem] bg-[#E1EDD9]">
              {/* FIONA IMAGE */}
              <img
                src={fionaImageUrl} // Replace this with your own high-fidelity URL
                alt="Princess Fiona"
                className="aspect-4/3 w-full object-cover"
              />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-zinc-900">Fiona's Secret</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Uncovering the truth of the princess who was more than she appeared. Her curse, her growth, and her finding true love with the ogre.
            </p>
            <Button className="mt-4" variant="primary">Fiona's Journey</Button>
          </article>

          <article className="rounded-3xl border-2 border-[#5D8A37] bg-[#F1F6EC] p-4">
            <div className="overflow-hidden rounded-[1.25rem] bg-[#E1EDD9]">
              {/* PUSS IN BOOTS IMAGE */}
              <img
                src={pussImageUrl} // Replace this with your own high-fidelity URL
                alt="Puss in Boots"
                className="aspect-4/3 w-full object-cover"
              />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-zinc-900">Puss in Boots: Friend or Foe?</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              From an assassin to a friend, this swordsman with a captivating meow brought swagger and skill to the ogre's quest.
            </p>
            <Button className="mt-4" variant="primary">Puss's Tales</Button>
          </article>
        </div>
      </section>
    </div>
  );
};

export default HomePage;