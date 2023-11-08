# Full API Document 4 U

외부에서 접근 가능한 전체 API를 기록합니다.

링크로 걸린것도 있고, 직접 작성하는 것도 있습니다.

nginx를 통해서 바뀌는 api로 기술하므로, 세부 명세와는 차이가 있을 수 있습니다. 현재 문서의 api를 기준으로 사용해주시기 바랍니다.

주로 쓰는것들을 메인으로 기술합니다.

# TOC

1. [Strapi API](#strapi-apis)
2. [주류정보 획득](#주류정보-획득)
3. [이미지 획득](#이미지-획득)
4. [주류명을 통한 검색](#주류명을-통한-검색)
5. [자동완성](#자동-완성)
6. [주류에 연결되는 태그 가져오기](#주류에-연결되는-태그-가져오기)
7. [태그에 연결되는 주류 가져오기](#태그와-관련있는-주류-가져오기)

# Strapi APIs

strapi를 통해 관리하는 api들입니다.

기본적인 사항은 Strapi document(링크는 별도로 문의해주세요)를 통해 확인 가능합니다.

여기에 작성되는 api의 앞에 `/api`를 붙여야 합니다.

모든 api (로그인 제외)에 로그인을 진행하고, 얻은 jwt를 Header에 추가해야 합니다.

## normal usage example

로그인 관련 API 예시

```
POST /api/auth/local

body
{
    "identifier": "id",
    "password": "pw"
}
```

이 아래로는 위의 document에 서술되지 않았거나, 수정된 경우들을 기재합니다.

## 주류정보 획득

`GET /api/alcohols/:id`

id에 해당하는 주류 정보를 가져옵니다  
(id: int)

[세부 명세](./customized-api.md#get-apialcoholsid)

## 이미지 획득

`GET /uploads/:imageURL`

imageURL에 해당하는 이미지를 가져옵니다.

# 검색

검색과 관련한 API들입니다.

## 주류명을 통한 검색

`GET /api/alcohol/search?s=TOSEARCH`

TOSEARCH query를 이용해 주류명으로 검색합니다.

[세부 명세](https://github.com/MerseongSanghoe/sooljari-search-engine/blob/main/docs/searchAPI/v0.0.3.md#search-api-v003)

## 자동 완성

`GET /api/autoc?k=TOSEARCH`

TOSEARCH query에 해당하는 자동완성 키들을 가져옵니다.

[세부 명세](https://github.com/MerseongSanghoe/sooljari-search-engine/blob/main/docs/autocompletionAPI/v0.0.4.md)

# 태그

태그와 관련되는 API들입니다.

## 주류에 연결되는 태그 가져오기

`GET /api/tag/byalc/:alcId`

alcId에 해당하는 주류와 연결되는 태그들을 가져옵니다.  
(alcId: int)

[세부 명세](https://github.com/MerseongSanghoe/sooljari-tag-service/blob/main/notes/tag-api-docs.md#get-tagbyalcalcid)

## 태그와 관련있는 주류 가져오기

`GET /api/tag/bytag/:tagTitle`

tagTitle에 해당하는 태그와 연결된 주류들을 가져옵니다.  
또, 해당 주류들에 연결된 다른 태그들도 가져옵니다.  
(tagTitle: string)

[세부 명세](https://github.com/MerseongSanghoe/sooljari-tag-service/blob/main/notes/tag-api-docs.md#get-tagbytagtagtitle)
