import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import MainForm from "./MainForm";
import { apiKey } from "./api/apiKey";
import { convertDate } from "./tools/convertDate";
import localForage from "localforage";
import { getLocalForage } from "./tools/getLocalForage";

function Converter(props) {
  const history = useHistory();
  const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    async function fetchCountryList() {
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
    fetchCountryList();
  }, []);

  const handleSubmit = (transaction) => {
    const conversionDate = convertDate(new Date());
    getLocalForage().then((conversionsList) => {
      const newConversionsList = conversionsList.concat({
        conversionDate,
        ...transaction,
      });
      localForage
        .setItem("savedConversions", newConversionsList)
        .then((result) => history.push("/history"));
    });
  };

  const handleOpenHistory = () => {
    history.push("/history");
  };
  return (
    <MainForm
      listOfCurrencies={countryList.sort()}
      onSubmit={handleSubmit}
      openHistory={handleOpenHistory}
    />
  );
}
export default Converter;
