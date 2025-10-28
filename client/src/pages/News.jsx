import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import NewsCard from "../components/News/NewsCard";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
  const API_URL = process.env.REACT_APP_NEWS_API_URL;

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        q: "bodybuilding OR powerlifting OR nutrition OR gym OR wellness OR gimnasio OR gym OR fisicoculturismo OR creatina OR proteina",
        from: "2025-10-01",
        to: "2025-10-31",
        sortBy: "popularity",
        apiKey: API_KEY,
        language: "es",
        pageSize: 10,
      };

      const response = await axios.get(API_URL, { params });

      if (response.data.status === "ok") {
        setNews(response.data.articles || []);
      } else {
        throw new Error("Error al obtener las noticias");
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setError(error.response?.data?.message || error.message);
      toast.error("Error al cargar las noticias de fitness");
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">

        <div
          className="bg-orange-50 border-l-8 border-orange-500 text-orange-700 p-4 mb-6"
        >
          <p className="font-bold">Últimas Noticias del Mundo Fitness</p>
          <p className="text-sm">
            Mantente informado con las últimas tendencias en entrenamiento,
            nutrición y bienestar.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
            <p className="text-gray-600">Cargando noticias...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <p className="font-bold">Error</p>
            <p>{error}</p>
            <button
              onClick={fetchNews}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Reintentar
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {news && news.length > 0 ? (
              news.map((article, index) => (
                <NewsCard key={`${article.url}-${index}`} article={article} />
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <span className="text-6xl mb-4 block">📰</span>
                <p className="text-gray-500 text-lg">
                  No hay noticias disponibles en este momento
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Intenta nuevamente más tarde
                </p>
                <button
                  onClick={fetchNews}
                  className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Recargar noticias
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
