# 카페24 클라우드 사용

## 선택한 이유?

1. 저렴한 가격 (1코어 1GB 30GB용량 -> 시간당 5원, IP 개당 3원/시간)
2. 국내에서 운영함 -> 국내의 접속 속도가 빠름
3. 무난한 성능

단, 주의할점

1. 과금을 사용시간이 아닌 보유 시간으로 책정한다. (인스턴스를 끄더라도 과금은 유지된다.) -> 확인 필요
2. 하드웨어의 확장이 어렵다.

## 초기 설정

- OS: Ubuntu-22.04-LTS-230809
- 작성일: 23-09-15

### 1. 접속 설정

SSH키의 경우는 인스턴스 생성시 함께 생성하도록 권장한다. 만들 경우 개인키를 자동으로 다운받는다.

방화벽은 서버 생성 이후에 새로 만들며, 기본적으로 모든 포트가 막혀있는 상태이다.  
초기 ssh 사용을 위한 22포트는 반드시 열어줘야 하며, HTTP 80포트나 HTTPS 443포트는 재량껏 열도록 하자.

### 2. Strapi 사용을 위한 설정들

- Node, npm

https://github.com/nodesource/distributions

NodeSource를 통해 설치, 18버전(LTS) 깔았음  
npm은 자동설치

```sh
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg

NODE_MAJOR=18
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list

sudo apt-get update
sudo apt-get install nodejs -y
```

- git

```sh
sudo apt install git
```

### 3. 리버스 프록시를 위한 Nginx

- ubuntu 22.04
  https://velog.io/@mero/ubuntu-22.04%EC%97%90-Nginx-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0

```sh
sudo apt install nginx

sudo ufw app list
sudo ufw allow 'Nginx Full'
sudo ufw allow 'OpenSSH'
sudo ufw enable

sudo service nginx status
```

### 4. strapi 가져와서 켜기

```sh
git clone <git_addr>

cd sooljari-backend
npm i
```

그런데, 램이 너무 작아서 도중에 터지는 문제 발생  
스왑 메모리를 추가해 해결  
https://sangchul.kr/entry/%EB%A6%AC%EB%88%85%EC%8A%A4-ubuntu-2204-%EC%8A%A4%EC%99%91-%EB%A9%94%EB%AA%A8%EB%A6%ACswap-memory

```sh
swapon --show
free -h

sudo fallocate -l 16G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudp swapon /swapfile

sudo vi /etc/fstab
# /swapfile swap swap default 0 0
```

이후, .env 파일 옮겨줌

```sh
# strapi development 환경에서 실행
npm run develop

# http://localhost:1337/admin
```

### 5. strapi랑 nginx 붙이기

1. /etc/nginx/nginx.conf 에서 맨위 user root으로 변경
2. nginx 파일 수정

```nginx
# /etc/nginx/sites-available/default
server {
  listen 80 default_server;
  listen [::]:80 default_server;

  server_name _;

  location / {
    proxy_pass http://localhost:1337/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_redirect off;
  }
}
```

이후 strapi 켜면 잘 연결됨

### 5. sqlite DB의 직접 접근을 위한 방안

#4 이슈 참고 ([링크](https://github.com/MerseongSanghoe/sooljari-backend/issues/4))
