# Physical Machine 2: Worker Node 1 (Compute Server 1)

## 🖥️ Hardware / Node Role
* **Node Name**: `cluster-devops-worker`
* **Type**: Compute Worker Node
* **Default IP Subnet**: `172.18.0.3`

## 📦 What Runs On This Physical Machine?
This single physical server hosts the **`app-1` microservice**:
* **Application**: `app-1` (running 1 replica of `nginx:1.27-alpine`)
* **Service**: `app-1-service` (exposing Port 8081)
* **Configuration**: `app-1-config` & `app-1-secret`

## 🌐 How This Physical Machine Communicates
1. **With Control Plane**: `kubelet` agent running on this machine listens on port 10250 for instructions from `control-plane-node`.
2. **With Worker Node 2 (`worker-node-2`)**:
   * Uses **Kube-Proxy** and **CNI (Container Network Interface)** virtual bridge network (`10.244.x.x`).
   * `app-1` running on this machine can talk to `app-2` or `app-3` on Worker Node 2 over the internal DNS:
     - `http://app-2-service:8082`
     - `http://app-3-service:8083`

---

## 🛠️ Commands Reference (Worker Machine 1 & App 1 Operations)

### 1. Deploy App 1 Workload to Worker Node 1
```bash
kubectl apply -f worker-node-1/app-1/
```

### 2. Verify App 1 is Running on Worker Node 1 (`cluster-devops-worker`)
```bash
kubectl get pods -n web-lab -l app=app-1 -o wide
```

### 3. Check App 1 Environment Variables & Loaded Configs
```bash
kubectl exec -it -n web-lab deploy/app-1 -- env
```

### 4. Check App 1 Logs
```bash
kubectl logs -n web-lab -l app=app-1
```

### 5. Test Communication: Send HTTP Request from App 1 to App 2 (on Worker Machine 3)
```bash
kubectl exec -it -n web-lab deploy/app-1 -- wget -qO- http://app-2-service:8082
```

### 6. Test Communication: Send HTTP Request from App 1 to App 3 (on Worker Machine 3)
```bash
kubectl exec -it -n web-lab deploy/app-1 -- wget -qO- http://app-3-service:8083
```

### 7. Remove App 1 Workload
```bash
kubectl delete -f worker-node-1/app-1/
```
