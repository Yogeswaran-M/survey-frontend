import { useState } from "react";
import API from "./api.js";

export default function SurveyForm() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    mobile: "",
    place: "",
    district: "",
    party: ""
  });

  const submitVote = async () => {

    // ✅ Empty validation
    if (
      !form.name ||
      !form.age ||
      !form.mobile ||
      !form.place ||
      !form.district ||
      !form.party
    ) {
      alert("Fill all fields");
      return;
    }

    // ✅ Mobile validation (India)
    if (!/^[6-9]\d{9}$/.test(form.mobile)) {
      alert("Enter valid 10-digit mobile number");
      return;
    }

    try {
      const res = await API.post("/api/vote", form);
      alert("Vote submitted successfully");
      console.log(res.data);
    } catch (error) {
      if (error.response?.status === 400) {
        alert("This mobile number has already voted");
      } else {
        alert("Server error");
      }
      console.error(error);
    }
  };

  return (
    <div className="bg" style={{ padding: 20 }}>

      <img
        className="rounded-circle"
        style={{ width: "150px" }}
        src="/surya.jpeg"
        alt=""
      />
      <br /><br />

      <h2>Election Survey by VKR Surya</h2>
      <br />

      <input
        placeholder="Name"
        onChange={e => setForm({ ...form, name: e.target.value })}
      /><br /><br />

      <input
        type="number"
        placeholder="Age"
        onChange={e => setForm({ ...form, age: e.target.value })}
      /><br /><br />

      <input
        type="number"
        placeholder="Mobile Number"
        onChange={e => setForm({ ...form, mobile: e.target.value })}
      /><br /><br />

      <input
        placeholder="Your Place"
        onChange={e => setForm({ ...form, place: e.target.value })}
      /><br /><br />

      <select onChange={e => setForm({ ...form, district: e.target.value })}>
        <option value="">Select District</option>
        <option>Nagapattinam</option>
        <option>Thanjavur</option>
        <option>Thiruvarur</option>
      </select><br /><br />

      <select onChange={e => setForm({ ...form, party: e.target.value })}>
        <option value="">Select Party</option>
        <option>DMK</option>
        <option>AIADMK</option>
        <option>TVK</option>
        <option>NTK</option>
        <option>PJP</option>
        <option>Congress</option>
        <option>Others</option>
      </select><br /><br />

      <button onClick={submitVote}>Submit</button>
    </div>
  );
}