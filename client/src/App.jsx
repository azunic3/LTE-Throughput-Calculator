import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [inputs, setInputs] = useState({
    bandwidth: "",
    frequency: "",
    cyclicPrefix: "Normal",
    distance: "",
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const validateInputs = () => {
    const { bandwidth, frequency, distance } = inputs;
    
    if (bandwidth <= 0 || bandwidth > 100) {
      return "Bandwidth must be between 1 and 100 MHz.";
    }
    
    if (frequency < 400 || frequency > 6000) {
      return "Frequency must be between 400 MHz and 6000 MHz.";
    }

    if (distance <= 0 || distance > 100) {
      return "Distance must be between 0.1 km and 100 km.";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/calculate", inputs);
      setResult(response.data);
      
      setInputs({
        bandwidth: "",
        frequency: "",
        cyclicPrefix: "Normal",
        distance: "",
      });

    } catch (err) {
      setError("Error calculating throughput. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>LTE Throughput Calculator</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Bandwidth (MHz):</label>
          <input type="number" name="bandwidth" value={inputs.bandwidth} onChange={handleChange} required />
        </div>
        <div>
          <label>Frequency Band (MHz):</label>
          <input type="number" name="frequency" value={inputs.frequency} onChange={handleChange} required />
        </div>
        <div>
          <label>Cyclic Prefix Mode:</label>
          <select name="cyclicPrefix" value={inputs.cyclicPrefix} onChange={handleChange}>
            <option value="Normal">Normal</option>
            <option value="Extended">Extended</option>
          </select>
        </div>
        <div>
          <label>Distance (km):</label>
          <input type="number" name="distance" value={inputs.distance} onChange={handleChange} required />
        </div>
        <button type="submit">Calculate</button>
      </form>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="result">
          <h3>Results:</h3>
          <p>{result.message}</p>
          <p><strong>Throughput:</strong> {result.throughput} Mbps</p>
          <p className="note">
            <em>*Constants Used:</em><br />
            Transmission Power: 43 dBm<br />
            Noise + Interference: -110 dBm<br />
            Quality Threshold: -100 dBm<br />
            <br />
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
