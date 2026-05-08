const inputClasses =
  'mt-2 w-full rounded-[1.2rem] border border-[#d7ccb7] bg-white px-4 py-3 text-sm text-[#2a241d] outline-none transition placeholder:text-[#8a7f70] focus:border-[#5d8a37] focus:ring-4 focus:ring-[#5d8a37]/15';

const AuthField = ({ label, id, helperText, className = '', ...props }) => {
  return (
    <label htmlFor={id} className={`block text-sm font-medium text-[#54483a] ${className}`}>
      <span className="text-[0.72rem] uppercase tracking-[0.18em] text-[#6e644f]">{label}</span>
      <input id={id} className={inputClasses} {...props} />
      {helperText ? <p className="mt-2 text-xs leading-5 text-[#7b715f]">{helperText}</p> : null}
    </label>
  );
};

export default AuthField;
