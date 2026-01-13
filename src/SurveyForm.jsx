import { useEffect, useState } from "react";
import API from "./api.js";
import translations from "./translations";

// DATA
import districtsTN from "./data/districtsTN";
import districtConstituencies from "./data/districtConstituencies";
import tnTamilMap from "./data/tnTamilMap"; // ✅ COMBINED MAP

export default function SurveyForm() {
  const [lang, setLang] = useState(
    localStorage.getItem("lang") || "en"
  );

  const t = translations[lang];

  const [form, setForm] = useState({
    name: "",
    age: "",
    mobile: "",
    district: "",
    constituency: "",
    party: ""
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("lang", lang);
    fetch("https://election-backend-xw9v.onrender.com/health");
  }, [lang]);

  const submitVote = async () => {
    if (
      !form.name ||
      !form.age ||
      !form.mobile ||
      !form.district ||
      !form.constituency ||
      !form.party
    ) {
      alert(t.fillAll);
      return;
    }

    //Age specific validation
    if (Number(form.age) < 18) {
      alert(t.agelimit);
      return;
    }

    if (!/^[6-9]\d{9}$/.test(form.mobile)) {
      alert(t.invalidMobile);
      return;
    }

    setLoading(true);

    try {
      await API.post("/api/vote", form);
      alert(
        lang === "ta"
          ? `நன்றி ${form.name}! உங்கள் பதில் வெற்றிகரமாக பதிவு செய்யப்பட்டது.`
          : `Thank you ${form.name}! Your response has been recorded successfully.`
      );

      setForm({
        name: "",
        age: "",
        mobile: "",
        district: "",
        constituency: "",
        party: ""
      });

    } catch (error) {
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      }
      else if (error.response?.status === 429) {
        alert(t.limit);
      }
      else if (error.response?.status === 409) {
        alert(t.duplicate);
      } else {
        alert(t.serverError);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-wrapper">
      <div className="survey-form" style={{ padding: "0px" }}>
        <img
          src="/Ylogo3.jpeg"
          alt=""
          style={{ width: "100px", marginTop: "60px", marginBottom: "10px" }}
        />

        {/* 🔤 LANGUAGE SWITCH */}
        <div className="lang-switch">
          <button onClick={() => setLang("en")}>EN</button>
          <button onClick={() => setLang("ta")}>தமிழ்</button>
        </div>



        {/* BRAND – ALWAYS ENGLISH */}
        <h3><b>YOYO <span className="corp">Corp</span></b></h3>

        <h6>{t.subtitle}</h6>
        <br />

        {/* NAME */}
        {/* NAME – English + Tamil letters only */}
        <input
          type="text"
          placeholder={t.name}
          value={form.name}
          onChange={e => {
            const value = e.target.value;

            // ✅ Allow only English + Tamil letters + space
            const nameRegex = /^[A-Za-z\u0B80-\u0BFF\s]*$/;

            if (nameRegex.test(value)) {
              setForm({ ...form, name: value });
            }
          }}
        />
        <br /><br />

        {/* AGE */}
        <input
          type="number"
          placeholder={t.age}
          value={form.age}
          onChange={e => setForm({ ...form, age: e.target.value })}
        />
        <br /><br />

        {/* MOBILE */}
        <input
          type="tel"
          inputMode="numeric"
          pattern="[6-9][0-9]{9}"
          placeholder={t.mobile}
          value={form.mobile}
          onChange={e => setForm({ ...form, mobile: e.target.value })}
        />
        <p className="disclaimer-note">{t.mobileNote}</p>

        {/* ✅ DISTRICT – TAMIL / ENGLISH LABEL */}
        <select
          value={form.district}
          onChange={e =>
            setForm({
              ...form,
              district: e.target.value,
              constituency: ""
            })
          }
        >
          <option value="">{t.district}</option>

          {districtsTN.map((d, i) => (
            <option key={i} value={d}>
              {lang === "ta"
                ? tnTamilMap.districts[d] || d
                : d}
            </option>
          ))}
        </select>
        <br /><br />

        {/* ✅ CONSTITUENCY – TAMIL / ENGLISH LABEL */}
        <select
          value={form.constituency}
          disabled={!form.district}
          onChange={e =>
            setForm({ ...form, constituency: e.target.value })
          }
        >
          <option value="">{t.constituency}</option>

          {form.district &&
            districtConstituencies[form.district]?.map((c, i) => (
              <option key={i} value={c}>
                {lang === "ta"
                  ? tnTamilMap.constituencies[c] || c
                  : c}
              </option>
            ))}
        </select>
        <br /><br />

        {/* PARTY – TAMIL / ENGLISH */}
        <select
          value={form.party}
          onChange={e => setForm({ ...form, party: e.target.value })}
        >
          <option value="">
            {lang === "ta" ? "கட்சியைத் தேர்ந்தெடுக்கவும்" : "Select Party"}
          </option>

          {[
            "DMK",
            "AIADMK",
            "TVK",
            "BJP",
            "Congress",
            "NTK",
            "PMK",
            "VCK",
            "MDMK",
            "AMMK",
            "Others"
          ].map(party => (
            <option key={party} value={party}>
              {lang === "ta"
                ? tnTamilMap.parties[party] || party
                : party}
            </option>
          ))}
        </select>
        <br /><br />

        <button onClick={submitVote} disabled={loading}>
          {loading
            ? (lang === "ta" ? "சமர்ப்பிக்கப்படுகிறது..." : "Submitting...")
            : t.submit}
        </button>

        <hr />

        {/* DISCLAIMER */}
        <div className="disclaimer-box">
          <h6>{t.disclaimerTitle}</h6>
          <p className="disclaimer-text">{t.disclaimerText}</p>

          <p className="disclaimer-support">
            {t.support}:{" "}
            <a href="mailto:yoyocorp.help.in@gmail.com">support@yoyocorp.in</a>
          </p>

          <p className="disclaimer-copy">
            © 2026 YOYO Corp. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}