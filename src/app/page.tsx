"use client";
import { Card } from "@/components/Card";
import { gql, useQuery } from "@apollo/client";
import CircularProgress from "@mui/material/CircularProgress";

const GET_FIRST_SIX_ELEMENTS = gql`
  query GetFirstSixMoviesAndTvShows {
    movies(first: 6) {
      nodes {
        id
        title
        advanced_custom_fields {
          gender
          releaseDate
          img {
            sourceUrl
          }
        }
      }
    }
    tvshows(first: 6) {
      nodes {
        id
        title
        advanced_custom_fields {
          gender
          releaseDate
          img {
            sourceUrl
          }
        }
      }
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_FIRST_SIX_ELEMENTS);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (error) return <p>Error: {error.message}</p>;

  const movies = data?.movies?.nodes;
  const tvshows = data?.tvshows?.nodes;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 mt-7">Filmes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((item: any) => (
          <Card
            key={item.id}
            id={item.id}
            title={item.title}
            releaseDate={item.advanced_custom_fields.releaseDate}
            poster={item.advanced_custom_fields.img.sourceUrl}
            genre={item.advanced_custom_fields.gender}
          />
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4 mt-16">Séries</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tvshows.map((item: any) => (
          <Card
            key={item.id}
            id={item.id}
            title={item.title}
            releaseDate={item.advanced_custom_fields.releaseDate}
            poster={item.advanced_custom_fields.img.sourceUrl}
            genre={item.advanced_custom_fields.gender}
          />
        ))}
      </div>
    </div>
  );
}
