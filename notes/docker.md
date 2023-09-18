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
