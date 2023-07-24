# 아웃 소싱 프로젝트 : MAP(Meet Awsome Place)

> **Create React App Project** <br/> **개발기간: 2023.07.17 ~ 2023.07.24**

##사용 기술
- react
- redux-thunk
- react-query
- axios
- kakao map API
- 
##사용 API
- 한국관광공사_국문 관광정보 서비스_GW
- 
## 프로젝트 소개

- 사용자가 선택한 지역의 관광 명소, 레스토랑, 숙소 등의 정보를 제공하고, 선택한 장소의 동영상을 관광지 정보와 함께 보여줍니다.
- 이를 바탕으로 본인만의 여행 계획을 세울 수 있고, 다른 사람이 세운 여행 계획을 참고할 수 있습니다.
- KaKaoMap API와 tour API를 가져와서 구현했습니다.

## 화면 구성

|                                                      메인 페이지                                                       |                                                      리스트 페이지                                                       |
| :--------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------: |
| ![image](https://github.com/yoongun97/MAP/assets/108172921/3da02dff-ccc6-4340-89e3-fa01a7b6f066) |![image](https://github.com/yoongun97/MAP/assets/108172921/c5aa48cc-0aab-43a2-9baa-0455f7b1ee0f)                                                |                              
|                                                    검색, 정렬                                                           |                                                    상세 페이지                                                                |
|                 ![image](https://github.com/yoongun97/MAP/assets/108172921/13437ee8-59a1-40de-b944-e0fb4c8dc0a5)       |             ![image](https://github.com/yoongun97/MAP/assets/108172921/dcc201f6-27b4-4163-9e0a-365842c4c5c0)             |
|                                                    계획 작성                                                          |                                                    마이 페이지                                                                |
|                ![image](https://github.com/yoongun97/MAP/assets/108172921/fa1de489-efa5-46b3-9162-bc673a8aa38e)       |            ![image](https://github.com/yoongun97/MAP/assets/108172921/f68e92ec-268c-4f4a-a1d7-1b400e6bfa6f)             |
|                                                    마이페이지2                                                          |                                                    여행 계획 상세 페이지                                                   |
|                ![image](https://github.com/yoongun97/MAP/assets/108172921/4839f704-85a6-4195-9901-ae74dfc3c81d)       |           ![image](https://github.com/yoongun97/MAP/assets/108172921/f3895800-9b65-4b48-ae75-b43a9a1ec38c)           |


---

## 주요 기능

### 회원정보 관리

#### 로그인, 회원가입

- 본인이 정한 이메일로 회원가입을 할 수 있습니다.
- google, github 이메일로 로그인하여 해당 페이지를 이용할 수 있습니다.


### 리스트 페이지

#### 지역 리스트 불러오기

- 지역 리스트를 보여줍니다.
- 지역 배경 이미지, 지역명, 좋아요(수)를 볼 수 있습니다.

#### 검색하기

- 원하는 지역을 검색할 수 있습니다.
- 일부 단어만 검색해도 검색이 가능합니다.

#### 정렬하기

- 좋아요 수, 이름을 기준으로 지역 목록을 정렬할 수 있습니다.

#### 좋아요

- 원하는 지역을 좋아요 기능을 통해 마이페이지에서 조회할 수 있습니다.

### 상세 페이지

#### 지도 불러오기

- 카카오맵 API를 통해 선택한 지역을 지도로 보여주고 원하는 지역으로 이동이 가능합니다.
- 지도의 원하는 지역을 클릭하여 marker를 생성할 수 있습니다.

#### 주변 관광지 데이터 불러오기

- 카카오맵 API를 통해 가져온 지역의 좌표를 통해 주변 관광지의 정보를 tourAPI에서 가져올 수 있습니다.
- 지도를 클릭했을 때 해당 marker를 기준으로 주변 관광지 정보를 update 합니다.

#### 계획 작성

- 주변 관광지 정보를 활용하여 본인만의 여행 계획을 작성할 수 있습니다.
- 일자별로 원하는 장소를 선택하여 넣을 수 있습니다.

### 마이 페이지

#### 좋아요한 지역 불러오기

- 리스트페이지에서 좋아요를 눌렀던 지역 목록을 불러올 수 있습니다.
- 좋아요를 한 번 더 눌러 좋아요를 취소할 수 있습니다.

#### 작성한 여행 계획 불러오기

- 상세페이지에서 작성했던 여행계획의 목록을 불러올 수 있습니다.
- 여행 계획 카드를 클릭했을 때 해당 계획의 일자별 상세정보를 불러올 수 있습니다.


## API 명세서

기능 | URL | Method | request | response
-----|------|------|-------|------
로그인 |/api/users/login | POST | {<br> userId: string, <br> userPassword: string <br>  } | { <br> userId, <br> userPassword, <br> nickname}
회원가입 |/api/users/signUp | POST | {<br> userId: string, <br> userPassword: string,  <br> nickname: string <br> } | -
마이페이지(좋아요 한 목록) | /api/likes/:userId | GET | likes: {<br> userId: string  <br> }, <br>  place: { <br> placeId <br> } | likes: { <br> placeId, <br> userId <br> }, <br> place: { <br> placeName, <br> placeImg, <br> desc <br> }
지역 리스트 조회 | /api/places | GET | - | { <br> placeName, <br> placeImg, <br> desc <br> }
지역 단일 조회 | /api/places/:placeId | GET | { <br> placeId:strging <br> } | { <br> placeName, <br>placeImg, <br> desc <br> }
좋아요 조회 | /api/likes | GET | { <br> placeId:string, <br> userId:string <br> } | { <br> placeLikes: [ <br>  user1, user2, …] <br> }
좋아요 추가 | /api/likes | POST | { <br> placeId:string, <br> userId:string <br> } | -
좋아요 삭제 | /api/likes | DELETE | { <br> placeId:string, <br> userId:string <br> } | -
여행계획 리스트 조회 | /api/plans | GET | { <br> userId:string <br> } | response= <br> { <br> plan1:{}, <br>  plan2:{}, ... <br> },
여행계획 단일 조회 | /api/plans/:planId | GET | { <br> placeId:string, <br> userId:string <br> } | { <br> userId, <br> placeId, <br> title, <br> createdAt, <br> day1: [], <br> day2: [], <br> day3: [], <br> day4: [], <br> day5: [] <br>  }
여행계획 추가 | /api/plans | POST | { <br> userId, <br> placeId, <br> title, <br> createdAt, <br> day1: [], <br> day2: [], <br> day3: [], <br> day4: [], <br> day5: [] <br>  } | msg : '여행계획을 작성하였습니다.'
여행계획 삭제 | /api/plans/:planId | DELETE | { <br> planId <br> } | msg : '삭제되었습니다!'
