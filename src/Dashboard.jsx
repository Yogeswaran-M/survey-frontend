import { useEffect, useState } from "react";
import API from "./api";

export default function Dashboard() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    const token = localStorage.getItem("adminToken");

    const res = await API.get("/api/admin/results", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setResults(res.data);
  };

  return (
    <div>
      <h2>Election Results</h2>

      <table border="1">
        <thead>
          <tr>
            <th>District</th>
            <th>Constituency</th>
            <th>Party</th>
          </tr>
        </thead>

        <tbody>
          {results.map((r, i) => (
            <tr key={i}>
              <td>{r.district}</td>
              <td>{r.constituency}</td>
              <td>{r.party}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}