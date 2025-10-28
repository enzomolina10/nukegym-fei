import React from "react";

const NewsCard = ({ article }) => {
  // Formatea la fecha de publicación
  const publishedDate = new Date(article.publishedAt);

  // Determina si el título o descripción son largos
  const isLongTitle = article.title?.length > 50;
  const isLongDescription = article.description?.length > 150;


  const handleReadMore = () => {
    window.open(article.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5 mb-4 border-l-4 border-orange-500 transition-all duration-300 hover:shadow-lg">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        {/* Imagen de la noticia */}
        {article.urlToImage && (
          <div className="w-full md:w-48 h-48 flex-shrink-0 overflow-hidden rounded-lg">
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
        )}

        {/* Contenido principal */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-3">
            
            <div className="flex-1 min-w-0">
              <h3
                className={`font-semibold text-gray-800 break-words ${
                  isLongTitle ? "text-base" : "text-lg"
                }`}
              >
                {article.title}
              </h3>

              {article.description && (
                <p
                  className={`text-gray-600 mt-2 break-words ${
                    isLongDescription ? "text-sm" : "text-base"
                  }`}
                >
                  {article.description}
                </p>
              )}

              {/* Botón para leer más */}
              <button
                onClick={handleReadMore}
                className="mt-3 bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                Leer más
              </button>
            </div>
          </div>
        </div>

        <div className="text-right flex-shrink-0 md:ml-4">
          <div className="bg-gray-50 rounded-lg px-3 py-2">
            <small className="text-gray-700 font-medium block">
              {publishedDate.toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </small>
            <small className="text-gray-500 block mt-1">
              {publishedDate.toLocaleTimeString("es-ES", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
