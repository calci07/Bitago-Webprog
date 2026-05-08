import { Link } from 'react-router-dom';

const Button = ({ children, to, variant = 'secondary', className = '', ...props }) => {
  const baseClasses =
    'inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition';
  
  const variants = {
    // A rich ogre green
    primary:
      'bg-[#5D8A37] text-white hover:bg-[#4A6E2B]',
    // A Donkey-like brown/grey
    secondary:
      'border-2 border-zinc-300 bg-zinc-100 text-zinc-700 hover:border-zinc-400 hover:bg-zinc-200',
    surface:
      'border border-[#d7ccb7] bg-white text-[#2a241d] hover:border-[#c0b49c] hover:bg-[#f8f1e4]',
  };

  const classes = `${baseClasses} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
