import React, { useState, useEffect } from "react";
import "./App.css";
import Main from "./Main";
import Converted from "./Converted";
import { Route, Switch, useHistory } from "react-router-dom";
import { convertDate } from "./tools/convertDate";
import localForage from "localforage";

const apiKey = "apiKey=321de7bcdde76fe02cf6";

function App() {
  const history = useHistory();
  const [countryList, setCountryList] = useState([]);
  const [conversionsList, setConversionsList] = useState([]);

  async function fetchData() {
    const response = await fetch(
      "https://free.currconv.com/api/v7/currencies?&" + apiKey
    );
    if (response.status >= 200 && response.status <= 299) {
      response
        .json()
        .then((response) =>
          setCountryList(Object.values(response.results).map((x) => x.id))
        );
    } else {
      alert(
        "Nie udało się wykonać żądanej operacji, ponieważ nie znaleziono zasobu powiązanego z żądaniem"
      );
    }
  }

  useEffect(() => {
    fetchData();

    localForage
      .getItem("savedConversions")
      .then((value) => {
        if (value !== null) console.log(value);
        //       setConversionsList(value);
      })
      .catch(() => {
        alert("Błąd odczytu histori");
      });
  }, []);

  useEffect(() => {
    if (conversionsList.length !== 0 && window.location.hash !== "#/converted")
      history.push("/converted");
  }, [conversionsList, history]);

  function handleCleanHistory() {
    setConversionsList([]);
    localForage.setItem("savedConversions", []);
  }

  const handleSubmit = async (values) => {
    const apiCall =
      "https://free.currconv.com/api/v7/convert?q=" +
      values.exchangingFromCurrency +
      "_" +
      values.exchangingToCurrency +
      "&compact=ultra&" +
      apiKey;
    const response = await fetch(apiCall);
    if (response.status === 200 || response.status === 304) {
      response.json().then((res) => {
        const exchangeRate =
          res[
            values.exchangingFromCurrency + "_" + values.exchangingToCurrency
          ];
        const calculatedAmount = (values.amountToChange * exchangeRate).toFixed(
          2
        );
        const conversionDate = convertDate(new Date());
        const newConversionsList = conversionsList.concat({
          conversionDate,
          calculatedAmount,
          ...values,
        });
        localForage.setItem("savedConversions", newConversionsList);
        setConversionsList(newConversionsList);
      });
    } else {
      alert(
        "Nie udało się wykonać żądanej operacji, ponieważ nie znaleziono zasobu powiązanego z żądaniem"
      );
    }
  };

  return (
    <div className="App">
      Konwerter walut
      <Main listOfCurrencies={countryList.sort()} onSubmit={handleSubmit} />
      <Switch>
        <Route
          path="/converted"
          exact
          render={(props) => (
            <Converted
              myConversions={conversionsList}
              cleanHistory={handleCleanHistory}
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
