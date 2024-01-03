'use client'

interface ButtonProps {
  active: string
  setActive: (value: string) => void
}

const ButtonSwitch = ({ active, setActive }: ButtonProps) => {

  return (
    <div className="relative flex items-center justify-between w-32">
      <button
        className={`w-16 py-1 text-center whitespace-nowrap ${active === 'movie' ? 'text-blue-500 font-semibold' : 'text-gray-500'}`}
        onClick={() => setActive('movie')}
      >
        Movie
      </button>
      <button
        className={`w-16 py-1 text-center whitespace-nowrap ${active === 'tv' ? 'text-blue-500 font-semibold' : 'text-gray-500'}`}
        onClick={() => setActive('tv')}
      >
        TV Series
      </button>
      <div className={`absolute bottom-0 h-0.5 bg-blue-500 transition-transform duration-300 ease-in-out transform ${active === 'movie' ? 'translate-x-0' : 'translate-x-16'}`} />
    </div>
  );
};

export default ButtonSwitch;