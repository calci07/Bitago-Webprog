import Button from '../components/Button';

const ArticlePage = () => {
  // URLs for online Shrek images. Be aware these may change!
  const articleHeroImageUrl = 'https://media.nbclosangeles.com/2021/10/TLMD-Shrek.jpg?quality=85&strip=all&resize=1200%2C675';
  const onionScienceImageUrl = 'https://assets.promediateknologi.id/crop/0x0:0x0/1200x0/webp/photo/p3/75/2024/07/10/210903-shrek-ew-955a-d091c2-2954574688.jpg'; // Re-use onion image
  const dragonTreatyImageUrl = 'https://www.cartoonbrew.com/wp-content/uploads/2024/07/shrek5.jpg';
  const pussSwordImageUrl = 'https://www.hollywoodreporter.com/wp-content/uploads/2024/07/Shrek-Everett-H-2024.jpg?w=1296&h=730&crop=1';
  const talkingDonkeyImageUrl = 'https://saccityexpress.com/wp-content/uploads/2025/05/558406E8-6925-47C5-A2A5-0D8618D16859.jpeg';

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