import React from "react";
import { Form, Field } from "react-final-form";
import "./Main.css";

function Main(props) {
  return (
    <Form
      onSubmit={props.onSubmit}
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
                <label>Kwota do zamiany</label>
                <input {...input} type="text" placeholder="Wpisz kwotę" />
                <span className="error">{meta.error}</span>
              </div>
            )}
          </Field>
          <div>
            <label>Waluta bazowa</label>
            <Field
              name="exchangingFromCurrency"
              component="select"
              initialValue="PLN"
            >
              {props.listOfCurrencies.map((currencies) => (
                <option key={currencies} value={currencies}>
                  {currencies}
                </option>
              ))}
            </Field>
          </div>
          <div>
            <label>Waluta po zamianie</label>
            <Field
              name="exchangingToCurrency"
              component="select"
              initialValue="USD"
            >
              {props.listOfCurrencies.map((currencies) => (
                <option key={currencies} value={currencies}>
                  {currencies}
                </option>
              ))}
            </Field>
          </div>
          <button type="submit">Konwertuj</button>
        </form>
      )}
    />
  );
}
export default Main;
