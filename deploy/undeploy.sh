#!/bin/bash
#microservices..
  #apis4gifts..
  kubectl delete -f kubernetes/apis4gifts-ing.yaml
  kubectl delete -f kubernetes/apis4gifts-svc.yaml
  kubectl delete -f kubernetes/apis4gifts-dpl.yaml
  kubectl delete secret dhreg --namespace=apis4gifts
  kubectl delete namespace apis4gifts
