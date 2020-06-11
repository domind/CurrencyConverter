import React, { useState, useEffect } from "react";
import "./App.css";
import Main from "./Main";
import Converted from "./Converted";
import { Route, Switch, useHistory } from "react-router-dom";

function App() {
  const history = useHistory();
  const [countryList, setCountryList] = useState([]);
  const [conversion, setConversion] = useState({});
  const [conversionsList, setConversionsList] = useState([]);
  const [hasError, setErrors] = useState(false);

  async function fetchData() {
    const res = await fetch(
      "https://free.currconv.com/api/v7/currencies?&apiKey=321de7bcdde76fe02cf6"
    );
    res
      .json()
      //  .then(console.log(res))
      .then((res) =>
        setCountryList(Object.values(res.results).map((x) => x.id))
      )
      .catch((err) => setErrors(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (conversionsList.length !== 0) history.push("/converted");
  }, [conversionsList, history]);

  const handleSubmit = async (values) => {
    const apiCall =
      "https://free.currconv.com/api/v7/convert?q=" +
      values.exchangingFromCurrency +
      "_" +
      values.exchangingToCurrency +
      "&compact=ultra&apiKey=321de7bcdde76fe02cf6";
    console.log("handleSubmit -> apiCall", apiCall);
    const res2 = await fetch(apiCall);
    res2
      .json()
      .then((res2) => {
        const exchangeRate = Object.values(res2)[0];
        const calculatedAmount = values.amountToChange * exchangeRate;
        const allData = { exchangeRate, calculatedAmount, ...values };
        setConversionsList(conversionsList.concat(allData));
        console.log("tu jest ok?");
        setConversion(allData)
          .then(console.log("tu jest zle", conversion))
          .then(history.push("/converted"));
      })

      .catch((err) => setErrors(err));
  };
  console.log("App -> conversion", conversionsList);
  return (
    <div className="App">
      Konwerter walut
      <Switch>
        <Route
          path="/converted"
          exact
          render={(props) => <Converted myConversions={conversionsList} />}
        />{" "}
        <Route
          path="/"
          render={(props) => (
            <Main
              listOfCurrencies={countryList.sort()}
              onSubmit={handleSubmit}
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
