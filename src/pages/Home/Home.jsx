import React, { useEffect } from "react";
import "./Home.css";
import { useContext } from "react";
import { CoinContext } from "../../context/CoinContext.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";
const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, SetInput] = useState("");

  const inputHandler = (e) => {
    SetInput(e.target.value);
    if (e.target.value === "") {
      setDisplayCoin(allCoin);
    }
  };

  const searchHandler = async (e) => {
    e.preventDefault();
    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoin(coins);
  };
  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);
  return (
    <div className="home">
      <div className="hero">
        <h1>
          {" "}
          Larget <br /> Crypto MarketPlace
        </h1>
        <p>
          {" "}
          Welcome to the world's largest cryptocurrency marketplace . sign up to
          explore more about cryptos
        </p>
        <form onSubmit={searchHandler}>
          <input
            onChange={inputHandler}
            value={input}
            type="text"
            placeholder="Search Crypto.."
            required
            list="coinlist"
          />

         <datalist id="coinlist">
  {allCoin.map((item, index) => (
    <option key={index} value={item.name} />
  ))}
</datalist>

          <button type="submit"> Search </button>
        </form>
      </div>

      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>

          <p>Coin</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24h change</p>
          <p className="market-cap">Mkt Cap</p>
        </div>
        {displayCoin.slice(0, 10).map((item, index) => (
          <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
            <p>{item.market_cap_rank}</p>
            <div>
              <img src={item.image} alt={item.name} className="coin-image" />
              <span>{item.name}</span>
              <span className="symbol">{item.symbol.toUpperCase()}</span>
            </div>
            <p>
              {currency.symbol} {item.current_price.toLocaleString()}
            </p>
            <p
              className={item.price_change_percentage_24h > 0 ? "green" : "red"}
            >
              {" "}
              {Math.floor(item.price_change_percentage_24h * 100) / 100}
            </p>
            <p className="market-cap">
              {" "}
              {currency.symbol} {item.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
