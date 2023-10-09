# Docker 설정

마이크로서비스를 위해 도커는 필요하다

## 도커란?

https://aws.amazon.com/ko/docker/

> Docker를 통해 애플리케이션을 신속하게 구축, 테스트 및 배포할 수 있습니다

> Docker는 애플리케이션을 신속하게 구축, 테스트 및 배포할 수 있는 소프트웨어 플랫폼입니다.  
> Docker는 소프트웨어를 컨테이너라는 표준화된 유닛으로 패키징하며, 이 컨테이너에는 라이브러리, 시스템 도구, 코드, 런타임 등 소프트웨어를 실행하는 데 필요한 모든 것이 포함되어 있습니다.  
> Docker를 사용하면 환경에 구애받지 않고 애플리케이션을 신속하게 배포 및 확장할 수 있으며 코드가 문제없이 실행될 것임을 확신할 수 있습니다.

요약하면, 실행 환경(OS, 설치된 프로그램, 환경변수 등)을 그대로 따라해주는 친구라고 보면 됨

## Docker 설치

- OS: Ubuntu-22.04-LTS-230809
- 작성일: 23-09-18

https://velog.io/@osk3856/Docker-Ubuntu-22.04-Docker-Installation

https://docs.docker.com/engine/install/linux-postinstall/

```sh
# TEST
sudo docker run hello-world
sudo docker ps
sudo docker logs <hello-world-container-id>
```

### Docker without sudo

```sh
sudo usermod -aG docker $USER
newgrp docker
```

## Dockerfile과 docker-compose

https://jojoldu.tistory.com/587

https://doitnow-man.tistory.com/entry/8-Dockerfile-%EA%B3%BC-Docker-composeyml

### Dockerfile

- base image 파일로 수정된 image 만드는 일련의 과정들을 정리해 놓은 파일 입니다.
- docker는 Dockerfile을 이용하여 손쉽게 동일한 이미지를 반복해서 만들수 있습니다.

### docker-compose.yml

- 연결된 다수의 container를 하나로 통합하여 관리 하는 도구
- docker-compose는 host level에서만 동작 합니다.
- docker swarm에 배포 하기 위해서는 docker stack deploy를 사용 해야 합니다.
- container실행 옵션을 미리 정의한 문서 입니다.
- docker-compose는 docker-compose.yml에 정의된 대로 container를 실행 합니다.

### docker for strapi

https://docs.strapi.io/dev-docs/installation/docker

일단 임시로 하기 위해 조금의 수정을 거침 (DB 결정 전까지 sqlite 사용)

## 안됨

왜안되는지 아직도 모르겠음

이미지 빌드할때 npm install 부분에서 엄청난 시간이 소요됨

- yarn 사용 -> build에서 멈춤
- node_modules를 가져오든 해서 넘어가면 -> 이번엔 빌드 후 실행이 안됨 (아마 os환경 문제인듯)
- bun 사용 -> install은 제일 빨랐으나 build에서 멈춤

이거 맞춰주느니 pm2같은거 써서 하는게 속편할거같음. -> pm2.json

## mysql 구동을 위한 docker

하지만 DB같은경우는 docker를 사용해 구동하는게 편하다  
mysql의 이미지를 사용해 간단하게 만들 수 있다

/docker-compose.yml 확인

- 구동시 주의사항
  /.db 폴더를 만든 뒤 진행할것 -> /.db 안에 mysql 데이터가 다 들어가서 컨테이너 관계없이 유지됨  
  backend라는 네트워크를 반드시 만들고 할 것 -> 다른 마이크로 서비스와 연결

```sh
# 초기 실행시, 반드시 backend라는 네트워크를 만들어줘야함
docker network create backend

# 백그라운드에서 도커로 실행
docker compose up -d

# 사용한 컨테이너와 이미지 등 정지 및 제거
docker compose down
```

> - 추가로 알게된점  
>   폴더명 앞에 '.'을 안붙이면 strapi develop 굴러가면서 폴더를 추적함  
>   -> 변경사항이 있을경우 재시작함  
>   -> 폴더명 db로 했더니 strapi에서 추적하려고 하다가 docker와 권한 충돌이 남  
>   -> .db로 변경했더니 추적을 안해서 잘굴러감

## docker network 관련

바로 위의 구동에 backend라는 네트워크를 만들어줘야 한다고 적어뒀는데 그 이야기

컨테이너간의 원활한 통신을 위해 도커 네트워크를 사용해야 한다. 그런데 보통이야 docker compose 파일 안에 넣겠지만, 지금은 docker compose 파일들이 각각 분리된 상황이므로, 따로 만들어주고 external로 불러오는 방식을 채택함

```sh
# 현재 존재하는 도커 네트워크들을 확인
docker network ls

# backend라는 네트워크를 생성함 (브릿지 모드)
docker network create backend

# 네트워크 상태 확인
docker network inspect backend
```
