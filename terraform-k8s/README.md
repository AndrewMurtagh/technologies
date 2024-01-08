

## Get a cluster going
```
brew install kind
curl https://raw.githubusercontent.com/hashicorp/learn-terraform-deploy-nginx-kubernetes-provider/main/kind-config.yaml --output kind-config.yaml
kind create cluster --name terraform-learn --config kind-config.yaml
kind get clusters
kubectl cluster-info --context kind-terraform-learn
```

## Authenticate with the cluster

This should use a provider-specific mechanism (like `aws eks get-token`), but here we use certs.

grab the certs
```
kubectl config view --minify --flatten --context=kind-terraform-learn
```

kubectl get deployments



## k8s notes

container management system at scale
handles failover, canary deployments

**what it providers**
- Service discovery and load balancing: can expose containers using DNS or IP address
- Storage - can mount storage system (local or public cloud provider)
- Rollouts and rollbacks
- Bin packing - k8s is provided with a cluster of nodes. you tell k8s how much CPU and memory a container needs and k8s decides how best to distribute them.
- Self-healing - k8s detects failed containers, marks them as unavailable to clients and restarts them
- Secret and config management: you can store passwords, tokens, SSH keys, etc. and expose them to containers without having to rebuild them.
- Batch execution of jobs
- Horizontal scaling: manually or based on metrics like CPU usage
- Dual stack networking
ity Add features to your Kubernetes cluster without changing upstream source code.

**what it does not do**
- Application building and CI/CD
- Does not provide application-specific services (message passing, data processing, databases, etc.)
- Does not provide logging, metrics or 


**components**
A clusters contains nodes onto which containers (pods) are run.
Alongside that is a control plane, with various subcomponents, that manages the nodes. The control plane is usually run on multiple machines.


**-Control plane**
The control plane makes decisions about scheduling pods, reacting to events in the cluster, etc.
The components can be run on any machine, usually a separate machine (or multiple) is dedicated to running just control plane components without any pods

- **kube-apiserver:** The component that exposes the frontend API for controlling the cluster. Can be horizontally scaled.
- **etd:** A consistent and highly-available key-value store used to store all info for the cluster. This should always be backed up.
- **kube-scheduler:** This watches for new Pods that are created, as well as monitoring the nodes. It then assigns a node for the new pod to run on. It makes choices based on resource requirements, user-defined constraints, affinity, data locality, deadlines, etc
- **kube-controller-manager:** This runs various controller processes (they are actually a single binary). There are many controllers with different purposes.
    - Node controller: watches nodes and responds to when one goes down.
    - Job controller: Watches for one-off jobs, creates a Pod, runs them to completion.
    - EndpointSlice controller: Creates EndpointSlice objects (a link between services and pods)
- **cloud-controller-manage:** This introduces cloud-specific logic.

**-Nodes**
These run on each node to provide the k8s runtime environment and maintain Pods.

- **kubelet:** This takes a set of PodSpecs and ensures the correct containers are running and healthy on the node.
- **kube-proxy:** A network proxy that maintains netowrking rules on the node to allow communication from clients to the pods. It uses the OS packet filtering layer if available, otherwise it reroutes traffic itself.
- **Container runtime:** The runtime for containers (containerd, CRI-O, etc.).

**-Addons**

You can bolt on features to the cluster like: DNS, Web UI, logging, different networking, etc.

**K8s API**
The main HTTP API used to control a cluster. CLIs use the API extensively.






## TODO
nginx ingress
prometheus
kafka
elasticsearch
postgres
node
go
grpc
redis
object storage