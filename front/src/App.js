import "./App.css";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import axios from "axios";

const columns = [
  {
    name: "Question",
    selector: (row) => row.question,
  },
  {
    name: "Segment Type",
    selector: (row) => row.segmentType,
  },
  {
    name: "Segment Description",
    selector: (row) => row.segmentDescription,
  },
  {
    name: "Answer",
    selector: (row) => row.answer,
  },
  {
    name: "Count",
    selector: (row) => row.count,
  },
  {
    name: "Percentage",
    selector: (row) => row.percentage,
  },
];

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/questions")
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <DataTable columns={columns} data={questions} />;
    </div>
  );
}

export default App;
