const AuthCard = ({ eyebrow, title, description, children, footer }) => {
  return (
    <div className="w-full rounded-[2rem] border border-[#dccfb8] bg-[#fff9ef] p-6 shadow-[0_35px_80px_rgba(77,56,24,0.10)] sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#5d8a37]">
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-xl font-serif text-3xl leading-tight text-[#2a241d] sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-7 text-[#5c5347] sm:text-base">
            {description}
          </p>
        </div>
        <div className="hidden h-14 w-14 items-center justify-center rounded-[1.25rem] border border-[#dccfb8] bg-white text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-[#5d8a37] sm:flex">
          Auth
        </div>
      </div>

      <div className="mt-8">{children}</div>

      {footer ? (
        <div className="mt-8 border-t border-[#eadfca] pt-5 text-sm text-[#5c5347]">{footer}</div>
      ) : null}
    </div>
  );
};

export default AuthCard;
