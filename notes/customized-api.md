# Customized APIs

입맛에 맞게 적당히 추가하고 수정한 api들을 기록합니다.

자동생성되는 documentation은 수정이 불가능해 여기에 작성하고 링크로 연결했습니다.

## GET /api/alcohols/:id

id에 해당하는 주류를 가져온다

### 200

- Request

id 355의 주류 정보를 가져오는 경우,

로그인 불필요 (추후 수정할 수 있음)

사용예시: `GET /api/alcohols/355`

- Response

```json
{
  "id": 0,
  "title": "술이름",
  "degree": 10,
  "createdAt": "2023-09-13T02:40:38.274Z",
  "updatedAt": "2023-11-02T13:16:52.855Z",
  "publishedAt": "2023-09-13T02:40:39.487Z",
  "explanation": "string",
  "category": "string",
  "link": "string",
  "store_link": "string",
  "sub_link": "string",
  "maker": {
    "id": 0,
    "name": "제조사명",
    "nation": "string",
    "location": "string",
    "url": "제조사URL",
    "createdAt": "2023-09-13T02:39:44.651Z",
    "updatedAt": "2023-09-13T02:40:11.722Z",
    "publishedAt": "2023-09-13T02:40:11.720Z"
  },
  "images": [
    {
      "id": 0,
      "url": "imageURL1",
      "createdAt": "2023-11-02T12:52:42.733Z",
      "updatedAt": "2023-11-02T12:52:43.239Z",
      "publishedAt": "2023-11-02T12:52:43.238Z"
    }
  ],
  "tags": [
    {
      "title": "tagname",
      "weight": 0
    }
  ]
}
```

이외의 StatusCode에 대해서는 documentation과 동일하다
