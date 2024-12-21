import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const CryptoPrices = () => {
  const [prices, setPrices] = useState({});
  const [cryptoData, setCryptoData] = useState([]);
  const [cryptoImage, setCryptoImage] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState("bitcoin");

  const cryptoList = ["bitcoin", "ethereum", "ripple", "litecoin", "dogecoin", "cardano"];

  // Utility to capitalize cryptocurrency names
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  // Function to fetch cryptocurrency data
  const fetchCryptoData = useCallback(async (crypto) => {
    try {
      const [priceResponse, historyResponse, coinDetailsResponse] = await Promise.all([
        axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usd`),
        axios.get(`https://api.coingecko.com/api/v3/coins/${crypto}/market_chart?vs_currency=usd&days=7`),
        axios.get(`https://api.coingecko.com/api/v3/coins/${crypto}`),
      ]);

      // Debugging API responses
      console.log("Price Response:", priceResponse.data);
      console.log("History Response:", historyResponse.data);
      console.log("Coin Details Response:", coinDetailsResponse.data);

      // Update states with fetched data
      setPrices(priceResponse.data);
      setCryptoData(historyResponse.data.prices);
      setCryptoImage(coinDetailsResponse.data.image?.small || "");
    } catch (error) {
      console.error(`Error fetching data for ${crypto}:`, error);
    }
  }, []);

  // Update selected crypto every 10 seconds
  useEffect(() => {
    const fetchRandomCrypto = () => {
      const randomCrypto = cryptoList[Math.floor(Math.random() * cryptoList.length)];
      setSelectedCrypto(randomCrypto);
    };

    const interval = setInterval(fetchRandomCrypto, 10000);
    return () => clearInterval(interval);
  }, [cryptoList]);

  // Fetch data for the selected crypto
  useEffect(() => {
    fetchCryptoData(selectedCrypto);
  }, [selectedCrypto, fetchCryptoData]);

  // Chart configuration
  const chartData = {
    labels: cryptoData.map((point) => new Date(point[0]).toLocaleDateString()),
    datasets: [
      {
        label: `${capitalize(selectedCrypto)} Price (USD)`,
        data: cryptoData.map((point) => point[1]),
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="py-16 bg-white text-center flex flex-col items-center">
      <h2 className="text-3xl font-bold text-green-600 mb-8">Cryptocurrency Prices & Trends</h2>
      <div className="flex flex-col items-center text-start p-6 border border-gray-300 rounded-lg shadow-md mb-12">
        {cryptoImage ? (
          <img src={cryptoImage} alt={`${selectedCrypto} logo`} className="w-16 h-16 mb-4" />
        ) : (
          <p>Loading image...</p>
        )}
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">{capitalize(selectedCrypto)}</h3>
        <p className="text-lg text-gray-600">
          Current Price: ${prices[selectedCrypto]?.usd ?? "N/A"}
        </p>
      </div>
      <div className="w-full max-w-3xl mx-auto">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          {capitalize(selectedCrypto)} Price Trend (Last 7 Days)
        </h3>
        {cryptoData.length > 0 ? (
          <Line data={chartData} />
        ) : (
          <p>Loading chart data...</p>
        )}
      </div>
    </div>
  );
};

export default CryptoPrices;
