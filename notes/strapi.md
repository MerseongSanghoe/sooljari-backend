# strapi에 대하여

## Headless CMS

![headless-cms](./images/1_E3qz8MZ8zR7Y3NRghFOvJQ.webp)
기존의 CMS가 DB-서버-사이트(프론트)를 모두 제공한다면 (카페24의 쇼핑몰같은)

Headless CMS는 "DB-서버"까지만 제공하고 해당하는 api를 넘겨준다.  
이때 프론트는 원하는 프레임워크, 원하는 환경을 사용 가능하다는 장점이 있다.  
웹, 모바일도 무관하고, React를 쓸지 Vue를 쓸지도 자유롭게 선택 가능하다.

## Quick Start

https://docs.strapi.io/dev-docs/quick-start#_1-install-strapi-and-create-a-new-project

퀵스타트시 sqlite로 생성되는 점을 유의

이후 어드민 패널에서 최초 관리자를 생성하고 그 계정으로 접근한다

1337포트를 기본적으로 사용하며, 아래의 라우팅이 기본적으로 제공된다

- / : 기본 제공 웹사이트
- /admin : 어드민 패널
- /api : api 호출을 위한 경로

## Documentation

플러그인을 통해 DB와 api를 자동으로 문서화해주는 Swagger를 사용 가능하다.

https://docs.strapi.io/dev-docs/plugins/documentation

이후 실행부터는 /documentation 을 통해 api 문서에 접근 가능하다
