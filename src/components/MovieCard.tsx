export default function MovieCard({
  imgUrl,
  title,
  year,
}: {
  imgUrl: string;
  title: string;
  year: number;
}) {
  return (
    <button
      className="
        relative 
        overflow-hidden 
        
        shadow-md 
        hover:shadow-xl 
        transition 
        group
        w-full sm:w-1/2 md:w-1/3 lg:w-1/4
        lg:h-40
      "
    >
      <img
        src={imgUrl}
        alt={title}
        className="
          w-full h-45 object-contain
          transition-all duration-300 
          group-hover:scale-105
          hover:cursor-pointer hover:opacity-65
        "
      />

      {/* Gradient overlay */}
      <div
        className="
          absolute bottom-0 left-0 w-full 
          bg-gradient-to-t from-black/80 to-transparent
          p-4
        "
      >
        <p className="text-white font-semibold text-lg leading-tight">
          {title}
        </p>
        <p className="text-white/80 text-sm">{year}</p>
      </div>
    </button>
  );
}
