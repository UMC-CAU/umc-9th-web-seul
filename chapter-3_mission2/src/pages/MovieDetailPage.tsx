import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  genres: { id: number; name: string }[];
}

export default function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetail = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get<MovieDetail>(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        setMovie(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetail();
  }, [movieId]);

  if (isLoading) return <div className="flex justify-center items-center h-screen text-xl">로딩 중...</div>;
  if (isError) return <div className="text-red-500 text-center mt-10">영화 정보를 불러오지 못했습니다.</div>;
  if (!movie) return null;

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* 배경 이미지 */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      />

      {/* 내용 */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 포스터 */}
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-xl shadow-lg"
        />

        {/* 정보 */}
        <div className="col-span-2 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
          <p className="text-gray-300 text-sm mb-2">
            개봉일: {movie.release_date} • 러닝타임: {movie.runtime}분
          </p>
          <p className="text-yellow-400 font-semibold mb-2">
            평점 ⭐ {movie.vote_average.toFixed(1)}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="bg-[#dda5e3]/30 px-3 py-1 rounded-full text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>
          <p className="text-gray-200 leading-relaxed">{movie.overview}</p>

          {/* 뒤로가기 버튼 */}
          <button
            onClick={() => navigate(-1)}
            className="mt-8 px-6 py-2 rounded-lg bg-[#b2dab1] text-black font-semibold hover:bg-[#a0cda0] transition-all"
          >
            ← 목록으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}
