#!/bin/bash
#microservices..
  #apis4atp..
  #git clone --quiet https://github.com/solutionsanz/apis4atp >>/tmp/noise.out && cd apis4atp
  kubectl create namespace apis4gifts
  kubectl create -f kubernetes/apis4gifts-dpl.yaml
  kubectl create -f kubernetes/apis4gifts-svc.yaml
  kubectl create -f kubernetes/apis4gifts-ing.yaml
