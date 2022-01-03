import { useEffect, useState } from "react";
import SvgEdit from "./component/svg-edit";
import "./App.css";
import axios from "axios";
function App() {
  const [svgDefaultJson, setSvgDefaultJson] = useState({});
  useEffect(() => {
    axios.get("/mock/SvgDefaultJson.json").then((res) => {
      setSvgDefaultJson(res.data);
    });
  }, []); 
  return (
    <div className="App">
      <SvgEdit svg_default_json={svgDefaultJson}></SvgEdit>
    </div>
  );
}

export default App;
