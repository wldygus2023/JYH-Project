#!/bin/bash

# 프로젝트 디렉토리로 이동
cd /home/ubuntu/JYH

# 최신 코드로 업데이트
git pull origin main

# Docker 컨테이너 재시작
docker-compose up -d --build
