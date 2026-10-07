# Physical Machine 1: Control Plane Node (Master Server)

## 🖥️ Hardware / Node Role
* **Node Name**: `cluster-devops-control-plane`
* **Type**: Master / Control Plane Server
* **Default IP Subnet**: `172.18.0.2`

## 🧠 What Runs On This Physical Machine?
This physical machine hosts the **Kubernetes Control Brain**:
1. **`kube-apiserver`**: The central entry point for all `kubectl` commands and API requests.
2. **`etcd`**: The master database storing cluster configuration, secrets, and the `web-lab` namespace.
3. **`kube-scheduler`**: The decision engine that assigns application pods to physical worker nodes.
4. **`kube-controller-manager`**: Monitors cluster health and ensures desired state matches actual state.

## 🌐 How It Connects & Talks to Worker Machines
* **Control Channel**: Communicates with `worker-node-1` and `worker-node-2` over HTTPS (port 6443).
* **Kubelet Communication**: Sends pod scheduling commands to `kubelet` running on port 10250 of each worker machine.
* **Taint Security**: Has a default taint (`node-role.kubernetes.io/control-plane:NoSchedule`) to prevent application workloads from consuming control plane hardware resources.

---

## 🛠️ Commands Reference (Run on Control Plane Machine)

### 1. Create the 3-Node Cluster
```bash
kind create cluster --name cluster-devops --config control-plane-node/cluster-config.yaml
```

### 2. Create the Global Namespace
```bash
kubectl apply -f control-plane-node/namespace.yaml
```

### 3. Check All Physical Nodes Status & IP Addresses
```bash
kubectl get nodes -o wide
```

### 4. Check All Pods Running Across All Machines
```bash
kubectl get pods -n web-lab -o wide
```

### 5. Check All Services & Exposed Ports
```bash
kubectl get svc -n web-lab
```

### 6. Delete the Cluster
```bash
kind delete cluster --name cluster-devops
```
