const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8083;
const SERVICE_NAME = process.env.SERVICE_NAME || "backend-2-analytics";

app.use(cors());
app.use(express.json());

// Dummy analytics metrics data
const analytics = {
  totalDeployments: 142,
  clusterUptime: "99.98%",
  activeNodes: 3,
  requestsPerSecond: 1250,
  cpuUsagePct: 24.5,
  memoryUsagePct: 42.1
};

app.get("/health", (req, res) => {
  res.json({ status: "healthy", service: SERVICE_NAME });
});

app.get("/api/analytics", (req, res) => {
  res.json({
    service: SERVICE_NAME,
    timestamp: new Date().toISOString(),
    metrics: analytics
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`${SERVICE_NAME} listening on port ${PORT}`);
});
