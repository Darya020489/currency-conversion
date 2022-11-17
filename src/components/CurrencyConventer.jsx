import { useEffect, useState, useRef } from "react";
import Flex from "./Flex";
import "../styles/CurrencyConventer.css";
import axios from "axios";

function CurrencyConventer() {
  const [inputValue, setInputValue] = useState("");
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("RUB");
  const [convertRate, setConvertRate] = useState(0);
  const [resultAmount, setResultAmount] = useState("");

  const URL = `https://min-api.cryptocompare.com/data/price?fsym=${fromCurrency}&tsyms=${toCurrency}`;
  const ENTER_KEY_CODE = 13;

  const inputRef = useRef();

  const sendRequest = async () => {
    try {
      let { data } = await axios.get(URL);
      return data;
    } catch (error) {
      console.error("Ошибка: " + error);
    }
  };

  const calcAmount = (amount, convertRate) => {
    const res = (amount * convertRate).toFixed(2);
    setResultAmount(res);
  };

  const changeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const addNewCardByEnter = (e) => {
    if (e.keyCode === ENTER_KEY_CODE) {
      getData();
    }
  };

  const getData = () => {
    const sum = +inputValue.trim().split(" ")[0];
    const fromValue = inputValue.trim().split(" ")[1]?.toUpperCase();
    const toValue = inputValue.trim().split(" ")[3]?.toUpperCase();

    setAmount(sum);
    setFromCurrency(fromValue);
    setToCurrency(toValue);
  };

  useEffect(() => {
    sendRequest().then((data) => setConvertRate(data[toCurrency]));
  }, [URL]);

  useEffect(() => {
    calcAmount(amount, convertRate);
  }, [amount, convertRate]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <section className="convert">
      <Flex>
        <label className="convert__label" htmlFor="amount">
          Enter the text please
        </label>
        <input
          className="convert__input"
          type="text"
          id="amount"
          onChange={changeHandler}
          onKeyDown={addNewCardByEnter}
          ref={inputRef}
        />
        <button className="convert__btn" onClick={getData}>
          Convert
        </button>
      </Flex>
      {isFinite(resultAmount) && (
        <div className="convert__result">{`${resultAmount} ${toCurrency}`}</div>
      )}
    </section>
  );
}

export default CurrencyConventer;
