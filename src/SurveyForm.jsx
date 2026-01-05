import { useEffect, useState } from "react";
import API from "./api.js";

// ✅ IMPORT DATA FILES
import districtsTN from "./data/districtsTN";
import districtConstituencies from "./data/districtConstituencies";

export default function SurveyForm() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    mobile: "",
    place: "",
    district: "",
    constituency: "",
    party: ""
  });

  useEffect(() => {
    fetch("https://election-backend-xw9v.onrender.com/api/vote");
    console.log("useEffect running");
  }, []);

  const submitVote = async () => {
    // ✅ EMPTY VALIDATION
    if (
      !form.name ||
      !form.age ||
      !form.mobile ||
      !form.place ||
      !form.district ||
      !form.constituency ||
      !form.party
    ) {
      alert("Fill all fields");
      return;
    }

    // ✅ MOBILE VALIDATION (INDIA)
    if (!/^[6-9]\d{9}$/.test(form.mobile)) {
      alert("Enter valid 10-digit mobile number");
      return;
    }

    try {
      const res = await API.post("/api/vote", form);
      alert("Vote submitted successfully");
      console.log(res.data);

      // optional reset
      setForm({
        name: "",
        age: "",
        mobile: "",
        place: "",
        district: "",
        constituency: "",
        party: ""
      });
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
    <div className="bg" style={{ padding: "10px" }}>
      <img
        className="rounded-circle"
        style={{ width: "150px", marginTop:"20px" }}
        src="/surya.jpeg"
        alt=""
      />
      <br /><br />

      <h2>Election Survey by VKR Surya</h2>
      <br />

      {/* NAME */}
      <input
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      <br /><br />

      {/* AGE */}
      <input
        type="number"
        placeholder="Age"
        value={form.age}
        onChange={e => setForm({ ...form, age: e.target.value })}
      />
      <br /><br />

      {/* MOBILE */}
      <input
        type="number"
        placeholder="Mobile Number"
        value={form.mobile}
        onChange={e => setForm({ ...form, mobile: e.target.value })}
      />
      <br /><br />

      {/* PLACE */}
      <input
        placeholder="Your Place"
        value={form.place}
        onChange={e => setForm({ ...form, place: e.target.value })}
      />
      <br /><br />

      {/* ✅ DISTRICT – ALL 38 DISTRICTS */}
      <select
        value={form.district}
        onChange={e =>
          setForm({
            ...form,
            district: e.target.value,
            constituency: "" // reset constituency
          })
        }
      >
        <option value="">Select District</option>
        {districtsTN.map((d, i) => (
          <option key={i} value={d}>
            {d}
          </option>
        ))}
      </select>
      <br /><br />

      {/* ✅ CONSTITUENCY – DEPENDENT */}
      <select
        value={form.constituency}
        disabled={!form.district}
        onChange={e =>
          setForm({ ...form, constituency: e.target.value })
        }
      >
        <option value="">Select Constituency</option>

        {form.district &&
          districtConstituencies[form.district]?.map((c, i) => (
            <option key={i} value={c}>
              {c}
            </option>
          ))}
      </select>
      <br /><br />

      {/* PARTY */}
      <select
        value={form.party}
        onChange={e => setForm({ ...form, party: e.target.value })}
      >
        <option value="">Select Party</option>
        <option>DMK</option>
        <option>AIADMK</option>
        <option>TVK</option>
        <option>BJP</option>
        <option>Congress</option>
        <option>NTK</option>
        <option>PMK</option>
        <option>VCK</option>
        <option>MDMK</option>
        <option>AMMK</option>
        <option>Others</option>
      </select>
      <br /><br />

      <button onClick={submitVote}>Submit</button>
      {/* <button className="btn btn-primary">Admin</button> */}

    </div>
    
  );
}