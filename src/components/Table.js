import React, { useState } from "react";
import TableLine from "./TableLine";
import ToTop from "./ToTop";
import { useSelector } from "react-redux";
import { isStableCoin } from "./Utils";

const Table = ({ coinsData }) => {
  const [rangeNumber, setRangeNumber] = useState(100);
  const [orderBy, setOrderBy] = useState("");
  const showStable = useSelector((state) => state.stableReducer.showStable);
  const showFavList = useSelector((state) => state.listReducer.showList);

  const tableHeader = [
    "prix",
    "Market",
    "volume",
    "1h",
    "1j",
    "1s",
    "1m",
    "6m",
    "1a",
    "ATH",
  ];

  return (
    <div className="table-container">
      <ul className="table-header">
        <div className="range-container">
          <span>
            Top
            <input
              type="text"
              value={rangeNumber}
              onChange={(e) => setRangeNumber(e.target.value)}
            ></input>
          </span>
          <input
            type="range"
            min="1"
            max="250"
            value={rangeNumber}
            onChange={(e) => setRangeNumber(e.target.value)}
          />
          <ToTop />
        </div>
        {tableHeader.map((el) => (
          <li key={el}>
            <input
              type="radio"
              name="header-el"
              id={el}
              defaultChecked={
                el === orderBy || el === orderBy + "reverse" ? true : false
              }
              onClick={() => {
                if (orderBy === el) {
                  setOrderBy(el + "reverse");
                } else {
                  setOrderBy(el);
                }
              }}
            />

            <label htmlFor={el}>{el}</label>
          </li>
        ))}
      </ul>
      {coinsData &&
        coinsData
          .slice(0, rangeNumber)
          .filter((coin) => {
            if (showStable) {
              return coin;
            } else {
              if (isStableCoin(coin.symbol)) {
                return coin;
              }
            }
          })

          .filter((coin) => {
            if (showFavList) {
              let list = window.localStorage.coinList.split(",");
              if (list.includes(coin.id)) {
                return coin;
              }
            } else {
              return coin;
            }
          })
          .sort((a, b) => {
            switch (orderBy) {
              case "prix":
                return b.current_price - a.current_price;
              case "prixreverse":
                return a.current_price - b.current_price;
              case "Market":
                return b.current_price - a.current_price;
              case "Marketreverse":
                return a.current_price - b.current_price;
              case "volume":
                return b.current_price - a.current_price;
              case "volumereverse":
                return a.current_price - b.current_price;
              case "1h":
                return b.current_price - a.current_price;
              case "1hreverse":
                return a.current_price - b.current_price;
              case "1j":
                return b.current_price - a.current_price;
              case "1jreverse":
                return a.current_price - b.current_price;
              case "1s":
                return b.current_price - a.current_price;
              case "1sreverse":
                return a.current_price - b.current_price;
              case "1m":
                return b.current_price - a.current_price;
              case "1mreverse":
                return a.current_price - b.current_price;
              case "6m":
                return b.current_price - a.current_price;
              case "6mreverse":
                return a.current_price - b.current_price;
              case "1a":
                return b.current_price - a.current_price;
              case "1areverse":
                return a.current_price - b.current_price;
              case "ATH":
                return b.current_price - a.current_price;
              case "ATHreverse":
                return a.current_price - b.current_price;
              default:
                null;
            }
          })
          .map((coin, index) => (
            <TableLine key={index} coin={coin} index={index} />
          ))}
    </div>
  );
};

export default Table;
