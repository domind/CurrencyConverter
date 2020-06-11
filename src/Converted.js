import React from "react";
import { useHistory } from "react-router-dom";
function Converted(props) {
  console.log("Converted -> props", props);
  const history = useHistory();
  if (props.myConversions.length === 0) {
    history.push("/");
    return <div></div>;
  }
  console.log(
    "Converted -> props.myConversions.length",
    props.myConversions.length
  );

  return (
    <div>
      <h1>History</h1>
      <div>Wymiana{props.myConversions[0].amountToChange}</div>
      <div>{props.myConversions[0].exchangingFromCurrency}</div>
      <div>Po wymianie {props.myConversions[0].calculatedAmount}</div>
      <div>{props.myConversions[0].exchangingToCurrency}</div>
      <button
        onClick={() => {
          history.push("/");
        }}
      >
        Back
      </button>
    </div>
  );
}
export default Converted;
