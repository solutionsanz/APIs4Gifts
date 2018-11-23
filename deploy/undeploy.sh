#!/bin/bash
#microservices..
  #apis4gifts..
  kubectl delete -f kubernetes/apis4atp-ing.yaml
  kubectl delete -f kubernetes/apis4atp-svc.yaml
  kubectl delete -f kubernetes/apis4atp-dpl.yaml
  kubectl delete namespace apis4atp