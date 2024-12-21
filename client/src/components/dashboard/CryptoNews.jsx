// import React, { useEffect, useState } from "react";

// // Crypto News Component
const CryptoNews = () => {}
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch crypto news using a public API (Crypto News API or News API)
//     const fetchNews = async () => {
//       try {
//         const response = await fetch(
//           "https://cryptonews-api.com/api/v1/category?section=general&items=5&token=YOUR_API_KEY"
//         );
//         const data = await response.json();
//         setNews(data.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching news:", error);
//         setLoading(false);
//       }
//     };

//     fetchNews();
//   }, []);

//   return (
//     <div className="bg-gray-800 p-6 rounded-lg shadow-md">
//       <h3 className="text-xl font-semibold text-green-500 mb-4">Crypto News</h3>
//       {loading ? (
//         <p className="text-white">Loading news...</p>
//       ) : (
//         <ul className="space-y-4">
//           {news.map((article) => (
//             <li key={article.id} className="border-b border-gray-700 pb-4">
//               <a
//                 href={article.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-lg text-green-500 hover:underline"
//               >
//                 {article.title}
//               </a>
//               <p className="text-gray-400 text-sm mt-1">Source: {article.source_name}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

export default CryptoNews;
