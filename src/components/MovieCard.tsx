export default function MovieCard({ imgUrl, title, id, overview, vote_average,release_date, original_language }: {
  imgUrl: string;
  title: string;
  
  id: number;
  overview: string;
  vote_average: number;
  release_date: string;
  original_language: string; 

}) {
  
  

  return (
    <div className=" flex flex-col shrink-0 ">
      <div className="m-1">
        <button className="relative block w-full overflow-hidden rounded-sm shadow-md hover:shadow-xl transition-transform">
          <img
            src={imgUrl}
            alt={title}
            className="w-full aspect-[16/9] object-cover transition-transform duration-300 group-hover:scale-105"
          />

          
          {<div
            className="
              absolute bottom-0 left-0 right-0 h-20
              bg-gradient-to-t from-black/70 to-transparent
            "
          />}

          
          <div className="absolute bottom-2 left-2 text-white leading-5">
            <div className="font-bold text-base tracking-tight">
              {title}
            </div>
            
          </div>
        </button>
      </div>

     
      <div className="mt-3 flex items-center justify-start gap-2 text-sm w-full">
        <div className="text-black font-medium bg-gray-200 rounded-md px-2 py-1">{vote_average}/10</div>
        <div className="text-black font-medium bg-gray-200 rounded-md px-2 py-1">{release_date.slice(0, 4)}</div>
        <div className="text-black font-medium bg-gray-200 rounded-md px-2 py-1">{original_language}</div>
        
      </div>
      <div>
        <p className="text-white text-sm mt-2 line-clamp-3 mb-1">{}</p>
      </div>
    </div>
  );
}
