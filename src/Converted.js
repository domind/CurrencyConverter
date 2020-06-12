import React from "react";
import { useHistory } from "react-router-dom";
function Converted(props) {
  console.log("Converted -> props", props);
  const history = useHistory();
  const myConversions = props.myConversions;
  console.log("Converted -> myConversions", myConversions);
  const numberOfConversions = myConversions.length;
  console.log("Converted -> numberOfConversions", numberOfConversions);

  const previousConversions = myConversions.map((conversion, index) => (
    <tr key={index}>
      <td>{conversion.conversionDate}</td>
      <td>
        {conversion.amountToChange + " " + conversion.exchangingFromCurrency}
      </td>
      <td>
        {conversion.calculatedAmount + " " + conversion.exchangingToCurrency}
      </td>
    </tr>
  ));

  return (
    <div>
      {numberOfConversions !== 0 ? (
        <div>
          wynik{" "}
          {myConversions[numberOfConversions - 1].calculatedAmount +
            " " +
            myConversions[numberOfConversions - 1].exchangingToCurrency}
        </div>
      ) : (
        ""
      )}

      <h1>History</h1>
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Przed konwersją</th>

            <th>Po konwersji</th>
          </tr>
        </thead>
        <tbody>
          {props.myConversions.length !== 0 ? (
            previousConversions
          ) : (
            <tr>
              <td colSpan="3">Brak historii konwersji walut</td>
            </tr>
          )}
        </tbody>
      </table>

      <button
        onClick={() => {
          history.push("/");
        }}
      >
        Back
      </button>

      <button
        onClick={() => {
          props.cleanHistory();
        }}
      >
        Wyczyść historię
      </button>
    </div>
  );
}
export default Converted;
