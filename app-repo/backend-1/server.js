const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8082;
const SERVICE_NAME = process.env.SERVICE_NAME || "backend-1-users";

app.use(cors());
app.use(express.json());

// Dummy users data
const users = [
  { id: 1, name: "Alex Rivera", role: "DevOps Lead", status: "Active" },
  { id: 2, name: "Sarah Chen", role: "Frontend Developer", status: "Active" },
  { id: 3, name: "Michael Vance", role: "Backend Architect", status: "Active" },
  { id: 4, name: "Elena Rostova", role: "Security Engineer", status: "Active" }
];

app.get("/health", (req, res) => {
  res.json({ status: "healthy", service: SERVICE_NAME });
});

app.get("/api/users", (req, res) => {
  res.json({
    service: SERVICE_NAME,
    timestamp: new Date().toISOString(),
    users: users
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`${SERVICE_NAME} listening on port ${PORT}`);
});
