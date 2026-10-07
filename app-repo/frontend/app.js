// Dynamically determine backend URLs or fall back to local ports
const BACKEND_1_URL = window.location.origin.includes(":8081") 
  ? "http://localhost:8082" 
  : "http://app-2-service:8082";

const BACKEND_2_URL = window.location.origin.includes(":8081") 
  ? "http://localhost:8083" 
  : "http://app-3-service:8083";

async function fetchUsers() {
  const tbody = document.getElementById("users-tbody");
  const tag = document.getElementById("backend1-tag");

  try {
    const res = await fetch(`${BACKEND_1_URL}/api/users`);
    if (!res.ok) throw new Error("API response error");
    const data = await res.json();
    
    tbody.innerHTML = data.users.map(u => `
      <tr>
        <td>#${u.id}</td>
        <td><strong>${u.name}</strong></td>
        <td>${u.role}</td>
        <td><span class="status-tag status-active">${u.status}</span></td>
      </tr>
    `).join("");

    tag.textContent = "Online (8082)";
    tag.classList.add("status-active");
  } catch (err) {
    console.warn("Backend 1 offline, displaying dummy fallback", err);
    tbody.innerHTML = `
      <tr><td>#1</td><td><strong>Alex Rivera</strong></td><td>DevOps Lead</td><td><span class="status-tag status-active">Active</span></td></tr>
      <tr><td>#2</td><td><strong>Sarah Chen</strong></td><td>Frontend Developer</td><td><span class="status-tag status-active">Active</span></td></tr>
      <tr><td>#3</td><td><strong>Michael Vance</strong></td><td>Backend Architect</td><td><span class="status-tag status-active">Active</span></td></tr>
    `;
    tag.textContent = "Standby";
  }
}

async function fetchAnalytics() {
  const tag = document.getElementById("backend2-tag");

  try {
    const res = await fetch(`${BACKEND_2_URL}/api/analytics`);
    if (!res.ok) throw new Error("API response error");
    const data = await res.json();
    const m = data.metrics;

    document.getElementById("metric-deployments").textContent = m.totalDeployments;
    document.getElementById("metric-uptime").textContent = m.clusterUptime;
    document.getElementById("metric-rps").textContent = `${m.requestsPerSecond}/s`;
    document.getElementById("metric-resource").textContent = `${m.cpuUsagePct}% / ${m.memoryUsagePct}%`;

    tag.textContent = "Online (8083)";
    tag.classList.add("status-active");
  } catch (err) {
    console.warn("Backend 2 offline, displaying dummy fallback", err);
    document.getElementById("metric-deployments").textContent = "142";
    document.getElementById("metric-uptime").textContent = "99.98%";
    document.getElementById("metric-rps").textContent = "1250/s";
    document.getElementById("metric-resource").textContent = "24.5% / 42.1%";
    tag.textContent = "Standby";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchUsers();
  fetchAnalytics();
});
