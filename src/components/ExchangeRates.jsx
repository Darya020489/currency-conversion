import Flex from "./Flex";
import "../styles/ExchangeRates.css";
import { useEffect, useState } from "react";
import axios from "axios";

function ExchangeRates() {
  const currencyList = [
    { sign: "USD", id: Math.random() },
    { sign: "RUB", id: Math.random() },
    { sign: "PLN", id: Math.random() },
    { sign: "UAH", id: Math.random() },
    { sign: "KZT", id: Math.random() },
    { sign: "EUR", id: Math.random() },
    { sign: "GBP", id: Math.random() },
    { sign: "BTC", id: Math.random() },
    { sign: "JPY", id: Math.random() },
    { sign: "CNY", id: Math.random() },
  ];

  const listString = currencyList.map((currency) => currency.sign).join();

  const [ratesList, setRatesList] = useState([]);
  
  const [selectedCurrency, setSelectedCurrency] = useState(navigator.language === "ru-RU" ? "RUB" : "USD");

  const URL = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${listString}&tsyms=${selectedCurrency}`;

  const sendRequest = async () => {
    try {
      let { data } = await axios.get(URL);
      return data;
    } catch (error) {
      console.error("Ошибка: " + error);
    }
  };

  const changeSelectedСurrency = (e) => {
    setSelectedCurrency(e.target.value);
  };

  useEffect(() => {
    let tempArr = [];
    sendRequest().then((data) => {
      tempArr = Object.entries(data).map((item) => ({
        name: item[0],
        value:
          selectedCurrency === "BTC"
            ? item[1][selectedCurrency].toFixed(8)
            : item[1][selectedCurrency].toFixed(3),
        id: Math.random(),
      }));
      setRatesList(tempArr);
    });
  }, [selectedCurrency]);

  return (
    <section className="exchange">
      {listString.length ? (
        <Flex align="flex-start">
          <label className="exchange__label" htmlFor="name">
            Select currency:
          </label>

          <select
            className="exchange__select"
            name="Type of currency"
            id="name"
            value={selectedCurrency}
            onChange={changeSelectedСurrency}
          >
            {currencyList.map((currency) => (
              <option
                className="exchange__option"
                key={currency.id}
                value={currency.sign}
              >
                {currency.sign}
              </option>
            ))}
          </select>
          <div className="currency-block">
            {ratesList.map((currency) => (
              <div className="currency-block__item" key={currency.id}>
                <div className="currency-block__name">{currency.name}</div>
                <span></span>
                <div className="currency-block__value">{currency.value}</div>
              </div>
            ))}
          </div>
        </Flex>
      ) : (
        <Flex justify="space-around">
          <div>Загрузка...</div>
        </Flex>
      )}
    </section>
  );
}

export default ExchangeRates;
