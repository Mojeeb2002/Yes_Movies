import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  Clock,
  Calendar,
  Globe2,
  PlayCircle,
} from "lucide-react";
import Spinner from "./Spinner";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [watchProviders, setWatchProviders] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const API_BASE_URL = "https://api.themoviedb.org/3";
  const API_KEY = import.meta.env.VITE_TMBD_API_KEY;

  const API_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const [movieResponse, creditsResponse, watchResponse] =
          await Promise.all([
            fetch(`${API_BASE_URL}/movie/${id}`, API_OPTIONS),
            fetch(`${API_BASE_URL}/movie/${id}/credits`, API_OPTIONS),
            fetch(`${API_BASE_URL}/movie/${id}/watch/providers`, API_OPTIONS),
          ]);

        if (!movieResponse.ok || !creditsResponse.ok || !watchResponse.ok) {
          throw new Error("Failed to fetch movie details");
        }

        const movieData = await movieResponse.json();
        const creditsData = await creditsResponse.json();
        const watchData = await watchResponse.json();

        setMovie({
          ...movieData,
          cast: creditsData.cast.slice(0, 5),
          director: creditsData.crew.find(
            (person) => person.job === "Director"
          ),
        });

        // Get US providers or fall back to first available region
        const providers =
          watchData.results.US || Object.values(watchData.results)[0];
        setWatchProviders(providers);
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to load movie details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (isLoading) return <Spinner />;
  if (error)
    return <div className="text-red-500 text-center mt-8">{error}</div>;
  if (!movie) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="relative">
        {/* Backdrop Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-[60vh] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 pt-8">
          <Link
            to="/"
            className="inline-flex items-center text-white hover:text-gray-300 mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Movies
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Poster */}
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full md:w-80 rounded-lg shadow-xl"
            />

            {/* Movie Info */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>

              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-2" />
                  <span>{movie.vote_average.toFixed(1)}/10</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-gray-400 mr-2" />
                  <span>{movie.runtime} min</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                </div>
                <div className="flex items-center">
                  <Globe2 className="w-5 h-5 text-gray-400 mr-2" />
                  <span>{movie.original_language.toUpperCase()}</span>
                </div>
              </div>

              <p className="text-lg mb-6">{movie.overview}</p>

              {/* Watch Providers */}
              {watchProviders && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 flex items-center">
                    <PlayCircle className="w-6 h-6 mr-2" />
                    Where to Watch
                  </h3>
                  <div className="space-y-4">
                    {watchProviders.flatrate && (
                      <div>
                        <h4 className="text-sm text-gray-400 mb-2">
                          Streaming
                        </h4>
                        <div className="flex flex-wrap gap-4">
                          {watchProviders.flatrate.map((provider) => (
                            <div
                              key={provider.provider_id}
                              className="text-center"
                            >
                              <img
                                src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                                alt={provider.provider_name}
                                className="w-12 h-12 rounded-lg"
                                title={provider.provider_name}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {watchProviders.rent && (
                      <div>
                        <h4 className="text-sm text-gray-400 mb-2">
                          Available for Rent
                        </h4>
                        <div className="flex flex-wrap gap-4">
                          {watchProviders.rent.map((provider) => (
                            <div
                              key={provider.provider_id}
                              className="text-center"
                            >
                              <img
                                src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                                alt={provider.provider_name}
                                className="w-12 h-12 rounded-lg"
                                title={provider.provider_name}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {watchProviders.buy && (
                      <div>
                        <h4 className="text-sm text-gray-400 mb-2">
                          Available to Buy
                        </h4>
                        <div className="flex flex-wrap gap-4">
                          {watchProviders.buy.map((provider) => (
                            <div
                              key={provider.provider_id}
                              className="text-center"
                            >
                              <img
                                src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                                alt={provider.provider_name}
                                className="w-12 h-12 rounded-lg"
                                title={provider.provider_name}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Genres */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Cast */}
              {movie.cast && movie.cast.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Cast</h3>
                  <div className="flex flex-wrap gap-4">
                    {movie.cast.map((actor) => (
                      <div key={actor.id} className="text-center">
                        <img
                          src={
                            actor.profile_path
                              ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                              : "https://via.placeholder.com/185x278?text=No+Image"
                          }
                          alt={actor.name}
                          className="w-24 h-24 rounded-full object-cover mb-2"
                        />
                        <p className="text-sm font-medium">{actor.name}</p>
                        <p className="text-xs text-gray-400">
                          {actor.character}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Director */}
              {movie.director && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">Director</h3>
                  <p>{movie.director.name}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
