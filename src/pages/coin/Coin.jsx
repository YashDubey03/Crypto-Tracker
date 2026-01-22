import React, { useState, useEffect, useContext } from "react";
import "./Coin.css";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext.jsx";
import LineChart from "../../components/linechart/LineChart.jsx";

const Coin = () => {
  const { coinId } = useParams();

  const [coinData, setCoinData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);

  const { currency } = useContext(CoinContext);

  const API_URL = import.meta.env.VITE_COINGECKO_API_URL;
  const API_KEY = import.meta.env.VITE_COINGECKO_API_KEY;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": API_KEY,
    },
  };

  // 🔹 Fetch coin details
  const fetchCoinData = async () => {
    try {
      const res = await fetch(`${API_URL}/coins/${coinId}`, options);
      const data = await res.json();
      setCoinData(data);
    } catch (error) {
      console.error("Coin data error:", error);
    }
  };

  // 🔹 Fetch historical chart data
  const fetchHistoricalData = async () => {
    try {
      const res = await fetch(
        `${API_URL}/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=30&interval=daily`,
        options,
      );
      const data = await res.json();
      setHistoricalData(data);
    } catch (error) {
      console.error("Chart data error:", error);
    }
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [coinId, currency]);

  // 🔄 Loader
  if (!coinData || !historicalData) {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }

  const currencyKey = currency.name.toLowerCase();

  return (
    <div className="coin">
      {/* 🔹 Coin Header */}
      <div className="coin-name">
        <img src={coinData?.image?.large} alt={coinData?.name} width="80" />
        <p>
          <b>
            {coinData.name} ({coinData.symbol.toUpperCase()})
          </b>
        </p>
      </div>

      {/* 🔹 Chart */}
      <div className="coin-chart">
        <LineChart historicalData={historicalData} />
      </div>

      {/* 🔹 Info */}
      <div className="coin-info">
        <ul>
          <li>Market Rank</li>
          <li>{coinData.market_cap_rank}</li>
        </ul>

        <ul>
          <li>Current Price</li>
          <li>
            {currency.symbol}
            {coinData.market_data.current_price[currencyKey]?.toLocaleString()}
          </li>
        </ul>

        <ul>
          <li>Market Cap</li>
          <li>
            {currency.symbol}
            {coinData.market_data.market_cap[currencyKey]?.toLocaleString()}
          </li>
        </ul>

        <ul>
          <li>24h High</li>
          <li>
            {currency.symbol}
            {coinData.market_data.high_24h[currencyKey]?.toLocaleString()}
          </li>
        </ul>

        <ul>
          <li>24h Low</li>
          <li>
            {currency.symbol}
            {coinData.market_data.low_24h[currencyKey]?.toLocaleString()}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Coin;
