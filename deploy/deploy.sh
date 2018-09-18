#!/bin/bash
#microservices..
  #apis4atp..
  #git clone --quiet https://github.com/solutionsanz/apis4atp >>/tmp/noise.out && cd apis4atp
  kubectl create namespace apis4gifts >>/tmp/noise.out
  kubectl create -f kubernetes/apis4gifts-dpl.yaml >>/tmp/noise.out
  kubectl create -f kubernetes/apis4gifts-svc.yaml >>/tmp/noise.out
  kubectl create -f kubernetes/apis4gifts-ing.yaml >>/tmp/noise.out
