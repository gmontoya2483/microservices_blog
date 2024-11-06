# Microservices with Node.js and React

POC of how to create a simple application using the microservices architecture and manually creating an EventBus.


### Run in dev mode

To run in dev mode use [Skaffold](https://skaffold.dev/).



```skaffold dev```

>NOTE: to close dev run ```CTRL+C```

### Load Balancer

Load balancer service is controlled by [ingress-nginx](https://kubernetes.github.io/ingress-nginx/)

### Updating the image used by a Deployment

- Make ab update to your code
- Build the image
- Push the image to docker hub  (or the artifactory you prefer)
- Run the command:   
    ```> kubectl rollout restart deployment [depl_name]```

### ingress-nginx controller

```> kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.12.0-beta.0/deploy/static/provider/cloud/deploy.yaml```
