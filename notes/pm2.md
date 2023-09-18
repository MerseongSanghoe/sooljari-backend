# pm2

Docker 설정하기 너무 빡세서 선택함

```sh
# global로 설치
sudo npm install pm2 -g

# pm2.json의 설정으로 시작함
pm2 start pm2.json

# 프로세스 확인
pm2 ps
pm2 logs <process-id>

```
