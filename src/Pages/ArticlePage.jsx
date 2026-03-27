import Button from '../components/Button';

const ArticlePage = () => {
  // URLs for online Shrek images. Be aware these may change!
  const articleHeroImageUrl = 'https://raw.githubusercontent.com/swamp-tales/assets/main/shrek_eating.jpg';
  const onionScienceImageUrl = 'https://raw.githubusercontent.com/swamp-tales/assets/main/onions.jpg'; // Re-use onion image
  const dragonTreatyImageUrl = 'https://raw.githubusercontent.com/swamp-tales/assets/main/dragon_fire.jpg';
  const pussSwordImageUrl = 'https://raw.githubusercontent.com/swamp-tales/assets/main/puss_and_shrek.jpg';
  const talkingDonkeyImageUrl = 'https://raw.githubusercontent.com/swamp-tales/assets/main/donkey_portrait.jpg';

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-[#5D8A37] bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5D8A37]">
          The Swamp Times
        </p>
        <h1 className="max-w-xl text-4xl font-extrabold leading-tight text-zinc-900 sm:text-5xl">
          Swamp Feature: Onions, True Love, and A Donkey.
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
          Dive into our collection of feature articles from the forest floor, exploring everything from the science of onion layers to deep-dives into our favorite fairytale characters.
        </p>
        <div className="mt-6">
          <Button to="/">Return Home</Button>
        </div>
      </section>

      <section className="border-y-2 border-[#5D8A37] bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5D8A37]">
            Swamp News Features
          </p>
          <h2 className="mt-2 text-3xl font-bold text-zinc-900">Latest deep-dives from the fairytale world</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-3xl border-2 border-[#5D8A37] bg-[#F1F6EC] p-4">
            <div className="overflow-hidden rounded-[1.25rem] bg-[#E1EDD9]">
              {/* ONION ARTICLE IMAGE */}
              <img
                src={onionScienceImageUrl} // Replace this with your own high-fidelity URL
                alt="Shrek and ononion"
                className="aspect-square w-full object-cover"
              />
            </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#5D8A37]">
              Ogre Psychology
            </p>
            <h3 className="mt-2 text-xl font-semibold text-zinc-900">The Science of Onion Layers</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              A deep dive into ogre anatomy and emotional complexity. Are the layers real or metaphorical? A study on why ogres cry.
            </p>
            <Button className="mt-4">Read Now</Button>
          </article>

          <article className="rounded-3xl border-2 border-[#5D8A37] bg-[#F1F6EC] p-4">
            <div className="overflow-hidden rounded-[1.25rem] bg-[#E1EDD9]">
              {/* DRAGON ARTICLE IMAGE */}
              <img
                src={dragonTreatyImageUrl} // Replace this with your own high-fidelity URL
                alt="Dragon flying and breathing fire"
                className="aspect-square w-full object-cover"
              />
            </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#5D8A37]">
              Dragon Tales
            </p>
            <h3 className="mt-2 text-xl font-semibold text-zinc-900">The Far Far Away Treaty</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              How a once-dreaded, princess-guarding creature is now the city's protector. We explore the Dragon's journey to peace and acceptence.
            </p>
            <Button className="mt-4">Read Treaty</Button>
          </article>

          <article className="rounded-3xl border-2 border-[#5D8A37] bg-[#F1F6EC] p-4">
            <div className="overflow-hidden rounded-[1.25rem] bg-[#E1EDD9]">
              {/* PUSS ARTICLE IMAGE */}
              <img
                src={pussSwordImageUrl} // Replace this with your own high-fidelity URL
                alt="Puss in Boots with his sword and hat"
                className="aspect-square w-full object-cover"
              />
            </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#5D8A37]">
              Swamp News Interview
            </p>
            <h3 className="mt-2 text-xl font-semibold text-zinc-900">The 'Best Meow' Move</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              An exclusive interview with the legendary swordsman. Puss in Boots shares his most effective techniques, his iconic meow, and his true thoughts on a talking donkey.
            </p>
            <Button className="mt-4">View Meow</Button>
          </article>

          <article className="rounded-3xl border-2 border-[#5D8A37] bg-[#F1F6EC] p-4">
            <div className="overflow-hidden rounded-[1.25rem] bg-[#E1EDD9]">
              {/* DONKEY ARTICLE IMAGE */}
              <img
                src={talkingDonkeyImageUrl} // Replace this with your own high-fidelity URL
                alt="Donkey portrait smiling"
                className="aspect-square w-full object-cover"
              />
            </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#5D8A37]">
              Swamp Travels
            </p>
            <h3 className="mt-2 text-xl font-semibold text-zinc-900">Is Your Donkey Talking?</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              A humorous but helpful guide for all non-ogre travelers. We give you tips for a peaceful commute, how to manage a chatty sidekick, and when to start singing.
            </p>
            <Button className="mt-4">Find Silence</Button>
          </article>
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;