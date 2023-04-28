import "./App.css";
import { useReducer } from "react";

function App() {
  const [state, dispatch] = useReducer(
    //definition du const state
    (state, action) => {
      console.log(action);

      //switch pour les différents cas d'action ( gestions des boutons cliqué )
      switch (action.type) {
        case "Enter_number":
          return {
            ...state, // copie/mise a jour d'une seule propriété de l'objet state
            currentNumber: state.currentNumber + action.index,
          };
        case "Set_operator":
          return {
            currentNumber: "",
            storedNumber: state.currentNumber,
            operator: action.index,
          };
        //cas où on additionne toutes les données rentrées (storedNumber operator currentNumber)
        //ex : 12(storedNumber) +(operator) 8(currentNumber)
        case "Calculate":
          const current = parseFloat(state.currentNumber);
          const stored = parseFloat(state.storedNumber);
          switch (state.operator) {
            case "+":
              return {
                ...state, // copie/mise a jour d'une seule propriété de l'objet state
                currentNumber: stored + current, // addition des nombres stockés et actuels
                storedNumber: "", // suppression du nombre stocké apres calcul
              };
            case "-":
              return {
                ...state,
                currentNumber: stored - current,
                storedNumber: "",
              };
            case "*":
              return {
                ...state,
                currentNumber: stored * current,
                storedNumber: "",
              };
            default:
              return state;
          }
        case "Reset":
          return { currentNumber: "", storedNumber: "", operator: "" };
        default:
          return state;
      }
    },
    //definition du const dispatch
    {
      currentNumber: "", //le nombre actuel
      storedNumber: "", //ici on stock
      operator: "", // le signe d'opération choisis
    }
  );

  const handleNumberClick = (number) => {
    dispatch({ type: "Enter_number", index: number });
  };

  const handleOperatorClick = (operator) => {
    dispatch({ type: "Set_operator", index: operator });
  };

  const handleCalculateClick = () => {
    dispatch({ type: "Calculate" });
  };

  const handleResetClick = () => {
    dispatch({ type: "Reset" });
  };

  return (
    <div className="App">
      <input type="text" value={state.currentNumber} readOnly></input>
      <div className="topRow">
        <button onClick={() => handleNumberClick("7")}>7</button>
        <button onClick={() => handleNumberClick("8")}>8</button>
        <button onClick={() => handleNumberClick("9")}>9</button>
      </div>
      <div className="midRow">
        <button onClick={() => handleNumberClick("4")}>4</button>
        <button onClick={() => handleNumberClick("5")}>5</button>
        <button onClick={() => handleNumberClick("6")}>6</button>
      </div>
      <div className="bottomRow">
        <button onClick={() => handleNumberClick("1")}>1</button>
        <button onClick={() => handleNumberClick("2")}>2</button>
        <button onClick={() => handleNumberClick("3")}>3</button>
      </div>
      <div className="zeroRow">
        <button onClick={() => handleNumberClick("0")}>0</button>
      </div>
      <div className="operatorRow">
        <button onClick={() => handleOperatorClick("+")}>+</button>
        <button onClick={() => handleOperatorClick("-")}>-</button>
        <button onClick={() => handleOperatorClick("*")}>x</button>
      </div>
      <div className="equalRow">
        <button onClick={handleCalculateClick}>=</button>
        <button onClick={handleResetClick}>Reset</button>
      </div>
    </div>
  );
}

export default App;
