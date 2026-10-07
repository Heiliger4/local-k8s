# Physical Machine 3: Worker Node 2 (Compute Server 2)

## 🖥️ Hardware / Node Role
* **Node Name**: `cluster-devops-worker2`
* **Type**: Compute Worker Node
* **Default IP Subnet**: `172.18.0.4`

## 📦 What Runs On This Physical Machine?
A single physical server can run **multiple application workloads**. This physical machine hosts **2 separate microservices**:
1. **`app-2`** (in `/app-2` folder): Exposed on `app-2-service` (Port 8082)
2. **`app-3`** (in `/app-3` folder): Exposed on `app-3-service` (Port 8083)

## 🌐 How This Physical Machine Communicates
1. **Internal Intra-Node Communication (App 2 ↔ App 3)**:
   * Since `app-2` and `app-3` live on the *same physical machine*, their traffic travels ultra-fast over the local Docker loopback/bridge interface (`10.244.2.x`).
2. **Inter-Node Communication (Worker 2 ↔ Worker 1)**:
   * `app-2` and `app-3` can send HTTP traffic across physical machines to `app-1` on Worker 1 via `http://app-1-service:8081`.
3. **Control Channel**:
   * Reports container status back to `control-plane-node` via `kubelet`.

---

## 🛠️ Commands Reference (Worker Machine 2 & App 2 / App 3 Operations)

### 1. Deploy App 2 Workload to Worker Node 2
```bash
kubectl apply -f worker-node-2/app-2/
```

### 2. Deploy App 3 Workload to Worker Node 2
```bash
kubectl apply -f worker-node-2/app-3/
```

### 3. Verify App 2 and App 3 are Running on Worker Node 2 (`cluster-devops-worker2`)
```bash
kubectl get pods -n web-lab -l 'app in (app-2, app-3)' -o wide
```

### 4. Check App 2 & App 3 Environment Variables
```bash
kubectl exec -it -n web-lab deploy/app-2 -- env
kubectl exec -it -n web-lab deploy/app-3 -- env
```

### 5. Check Logs for App 2 & App 3
```bash
kubectl logs -n web-lab -l app=app-2
kubectl logs -n web-lab -l app=app-3
```

### 6. Test Intra-Node Communication: Call App 3 from App 2 (Same Physical Server)
```bash
kubectl exec -it -n web-lab deploy/app-2 -- wget -qO- http://app-3-service:8083
```

### 7. Test Inter-Node Communication: Call App 1 from App 2 (Across Physical Servers to Worker 1)
```bash
kubectl exec -it -n web-lab deploy/app-2 -- wget -qO- http://app-1-service:8081
```

### 8. Remove App 2 and App 3 Workloads
```bash
kubectl delete -f worker-node-2/app-2/
kubectl delete -f worker-node-2/app-3/
```
