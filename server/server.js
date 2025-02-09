const express = require("express");
const cors = require("cors");

const app = express();
const corsOptions = {
    origin: ["http://localhost:5173"],
};

app.use(express.json());
app.use(cors(corsOptions));

const calculateThroughput = (bandwidth, frequency, cyclicPrefix, distance) => {

    const TX_POWER = 43; 
    const NOISE_INTERFERENCE = -110; 
    const QUALITY_THRESHOLD = -100; 

    const pathLoss = 20 * Math.log10(distance) + 20 * Math.log10(frequency) + 32.45;

    const receivedPower = TX_POWER - pathLoss;

    if (receivedPower < QUALITY_THRESHOLD) {
        return { throughput: 0, message: "Signal too weak, no data transmission" };
    }

    const SINR = receivedPower - NOISE_INTERFERENCE;

    const modulationTable = [
        { sinr: 0, efficiency: 0.1523 },
        { sinr: 5, efficiency: 0.377 },
        { sinr: 10, efficiency: 0.6016 },
        { sinr: 15, efficiency: 0.877 },
        { sinr: 20, efficiency: 1.1758 },
        { sinr: 25, efficiency: 1.4766 }
    ];

    let efficiency = modulationTable.reduce((prev, curr) => (SINR >= curr.sinr ? curr : prev)).efficiency;

    const throughput = bandwidth * efficiency;

    return { throughput: throughput.toFixed(2)};
};

app.post("/api/calculate", (req, res) => {
    const { bandwidth, frequency, cyclicPrefix, distance } = req.body;

    if (!bandwidth || !frequency || !distance) {
        return res.status(400).json({ error: "Missing input values" });
    }

    const result = calculateThroughput(Number(bandwidth), Number(frequency), cyclicPrefix, Number(distance));
    res.json(result);
});

// Start Server
const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
