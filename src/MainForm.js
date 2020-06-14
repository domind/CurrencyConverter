import React, { useState, useEffect } from "react";
import { Form, Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import "./MainForm.css";
import { defaultCurrencyFrom, defaultCurrencyTo } from "./api/defaults";
import { Button, Row, Col } from "react-bootstrap";
import { apiKey } from "./api/apiKey";

function MainForm(props) {
  const [amountToChange, setAmountToChange] = useState("");
  const [currencyFrom, setCurrencyFrom] = useState(defaultCurrencyFrom);
  const [currencyTo, setCurrencyTo] = useState(defaultCurrencyTo);
  const [value, setValue] = useState("");
  const [exchangeRate, setExchangeRate] = useState("");

  useEffect(() => {
    setValue((amountToChange * exchangeRate).toFixed(2));
  }, [amountToChange, exchangeRate]);

  useEffect(() => {
    const handleCurrencyChange = async () => {
      const apiCall =
        "https://free.currconv.com/api/v7/convert?q=" +
        currencyFrom +
        "_" +
        currencyTo +
        "&compact=ultra&" +
        apiKey;

      const response = await fetch(apiCall);
      if (response.status === 200 || response.status === 304) {
        response.json().then((res) => {
          const exchangeRate = res[currencyFrom + "_" + currencyTo];
          setExchangeRate(exchangeRate);
        });
      } else {
        alert(
          "Nie udało się wykonać żądanej operacji, ponieważ nie znaleziono zasobu powiązanego z żądaniem"
        );
      }
    };
    handleCurrencyChange();
  }, [currencyFrom, currencyTo]);

  const handleSubmit = (values) => {
    const transaction = { ...values, calculatedAmount: value };
    props.onSubmit(transaction);
  };
  return (
    <>
      <Row>
        <Col>
          <Form
            onSubmit={handleSubmit}
            validate={(values) => {
              const errors = {};
              if (!values.amountToChange) {
                errors.amountToChange = "Wpisz wartość";
              } else if (isNaN(values.amountToChange)) {
                errors.amountToChange = "Nieprawidłowa wartość";
              }
              return errors;
            }}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field name="amountToChange">
                  {({ input, meta }) => (
                    <div>
                      <div>
                        <input
                          {...input}
                          type="text"
                          placeholder="Wpisz kwotę"
                        />
                        <Field
                          name="exchangingFromCurrency"
                          component="select"
                          value={currencyFrom}
                          initialValue={currencyFrom}
                        >
                          {props.listOfCurrencies.map((currencies) => (
                            <option key={currencies} value={currencies}>
                              {currencies}
                            </option>
                          ))}
                        </Field>
                        <OnChange name="exchangingFromCurrency">
                          {(value, previous) => {
                            setCurrencyFrom(value);
                          }}
                        </OnChange>
                      </div>

                      <p className="error">
                        {meta.error ? meta.error : <br />}
                      </p>
                    </div>
                  )}
                </Field>
                <OnChange name="amountToChange">
                  {(value, previous) => {
                    setAmountToChange(value);
                  }}
                </OnChange>
                <Field name="exchangedAmount">
                  {({ input, meta }) => (
                    <div>
                      <div>
                        <input
                          {...input}
                          type="text"
                          placeholder="Wynik"
                          value={value}
                        />
                        <Field
                          name="exchangingToCurrency"
                          component="select"
                          value={currencyTo}
                          initialValue={currencyTo}
                        >
                          {props.listOfCurrencies.map((currencies) => (
                            <option key={currencies} value={currencies}>
                              {currencies}
                            </option>
                          ))}
                        </Field>
                        <OnChange name="exchangingToCurrency">
                          {(value, previous) => {
                            setCurrencyTo(value);
                          }}
                        </OnChange>
                      </div>

                      <span className="error">{meta.error}</span>
                    </div>
                  )}
                </Field>
                <br />
                <br />
                <Row>
                  <Col>
                    <Button type="submit">Konwertuj</Button>
                  </Col>
                  <Col>
                    <Button onClick={() => props.openHistory()}>
                      Otwórz historię
                    </Button>
                  </Col>
                </Row>
              </form>
            )}
          />
        </Col>
      </Row>
    </>
  );
}
export default MainForm;
