import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import localForage from "localforage";
import { getLocalForage } from "./tools/getLocalForage";
import "./History.css";
import { Col, Table, Button } from "react-bootstrap";
function History(props) {
  const history = useHistory();
  const [conversionsList, setConversionsList] = useState([]);
  const numberOfConversions = conversionsList.length;
  useEffect(() => {
    getLocalForage().then((conversionsList) => {
      setConversionsList(conversionsList);
    });
  });
  const previousConversions = conversionsList.map((conversion, index) => (
    <tr key={index}>
      <td className="dateColumn">{conversion.conversionDate}</td>
      <td>
        {conversion.amountToChange + " " + conversion.exchangingFromCurrency}
      </td>
      <td>
        {conversion.calculatedAmount + " " + conversion.exchangingToCurrency}
      </td>
    </tr>
  ));
  function cleanHistory() {
    setConversionsList([]);
    localForage.setItem("savedConversions", []);
  }
  return (
    <Col className="history mt-5 p-3  ">
      <div className="historyTitle">
        Historia
        <Button
          className="close"
          onClick={() => {
            history.push("/");
          }}
        >
          X
        </Button>
      </div>
      <Col className="tablePlaceholder">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th className="dateColumn">Data</th>
              <th>Przed konwersją</th>

              <th>Po konwersji</th>
            </tr>
          </thead>
          <tbody>
            {numberOfConversions !== 0 ? (
              previousConversions
            ) : (
              <tr>
                <td colSpan="3">Brak historii konwersji walut</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Col>
      <Button
        className="align-self-end"
        onClick={() => {
          cleanHistory();
        }}
      >
        Wyczyść historię
      </Button>
    </Col>
  );
}
export default History;
