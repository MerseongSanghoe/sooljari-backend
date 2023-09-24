# 서버 조작 기초

## 서버 구축

- 기본적인 ubuntu + node + npm + nginx의 설치는 되어있다고 가정함  
   [cafe24cloud.md](./cafe24cloud.md) 참고

1. 현재 repo pull
2. /.env 파일 작성 ([.env.example](../.env.example) 참고)
3. /.db 폴더 생성
4. npm 초기설정 및 필요한 툴 설치

```sh
npm i
npm run build
sudo npm i -g pm2
```

## 서버 구동

```sh
# mysql 서버 구동
docker compose up -d
docker ps

# strapi 서버 구동
# pm2.json의 설정으로 시작함
pm2 start pm2.json
pm2 ps
```

자세한 내용은 [pm2.md](./pm2.md)나 [mysql.md](./mysql.md) 참고

## 서버 종료

```sh
# strapi 서버 종료
pm2 ps
pm2 stop <processId>

# mysql 서버 종료
docker compose down
```
