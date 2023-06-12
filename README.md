## **시켜줘,  엘리스 명예 소방관**

<img src="/public/images/img%20copy.jpg">


## **1\. 기획의도 & 목적**


****"엘리스 수강생들이 더 편리하게 사용할 수 있는 서비스가 없을까?****

> 엘리스 수강생들을 위한 커뮤니티 최종본!  
> 레이서들을 위한 커뮤니티 및 엘리스랩 좌석예약을 더욱 편리하게 이용하기 위한 모바일 기반 웹서비스입니다.


### **2\. 웹 서비스의 최종적인 메인 기능과 서브 기능 설명**


**✨ 메인기능**

-   SNS
-   엘리스 좌석 예약
-   실시간 채팅 기능
-   게시판

**✨ 서브기능**

-   메인페이지
-   마이페이지
-   관리자페이지
-   찾아오시는길 페이지

## **3\. 프로젝트만의 차별점, 기대 효과**



## **4\. 프로젝트 구성**


#### **🔧 기술 스택**

**Front-end**

-   React
-   TypeScript
-   Sass
-   redux-toolkit

**Back-end**

-   Node.js
-   TypeScript
-   express
-   MySQL

#### 🎨  **협업 도구**

-   Figma : 초반 기획시 빠른 레이아웃을 잡기 위해 사용
-   Notion : API 명세서, API DOCS 등 활용
-   Discord : 팀원간 커뮤니케이션 및 매일 아침 스크럼 진행
-   Gitlab : Code Repository
-   Gitlab Issue : Trouble Shooting 내역 기제
-   Gitlab Wiki : 🔗[프로젝트 과정 기록]
-   Postman Teams : API 테스트 진행



## **5\. 파일 및 폴더 구성**

**Client**

```
src
┣ actions
┣ assets
┣ components
┃ ┣ Board
┃ ┣ BookingState
┃ ┣ BookingTable
┃ ┣ CancelReservationBtn
┃ ┣ ChatList
┃ ┣ ChatListModal
┃ ┣ ChatModal
┃ ┗ common
┃ ┃ ┣ ConfirmModal
┃ ┃ ┣ DateInput
┃ ┃ ┣ FloatingButton
┃ ┃ ┣ Footer
┃ ┃ ┣ FullModal
┃ ┃ ┣ Header
┃ ┃ ┣ HeaderSlideMenu
┃ ┃ ┣ Link
┃ ┃ ┣ Loading
┃ ┃ ┣ Pagination
┃ ┃ ┣ PostList
┃ ┃ ┗ SearchBox
┃ ┣ Direction
┃ ┣ KakaoShareButton
┃ ┣ MainImage
┃ ┣ MyReservationModal
┃ ┣ Reservation
┃ ┣ SeatNumberInput
┃ ┣ SeatOption
┃ ┣ SignUpSelectBtn
┃ ┗ TimeSelect
┣ hooks
┣ pages
┃ ┣ Admin
┃ ┣ Login
┃ ┣ Main
┃ ┣ MyPage
┃ ┣ MyPost
┃ ┣ MyReservation
┃ ┣ SignUp
┃ ┗ Unvalid
┣ reducers
┣ routes
┣ store
┣ styles
┗ types
```

**Server**

```
src
 ┣ config
 ┃ ┗ jwt.ts
 ┣ controllers
 ┃ ┣ access-controllers.ts
 ┃ ┣ admin-controllers.ts
 ┃ ┣ chat-controller.ts
 ┃ ┣ comments-controllers.ts
 ┃ ┣ member2-controller.ts
 ┃ ┣ members-controllers.ts
 ┃ ┣ posts-controller.ts
 ┃ ┗ reservations-controller.ts
 ┣ db
 ┃ ┣ chat_room.sql
 ┃ ┣ chat.sql
 ┃ ┣ comment.sql
 ┃ ┣ connection_status.sql
 ┃ ┣ member.sql
 ┃ ┣ post.sql
 ┃ ┣ reservation.sql
 ┃ ┗ seat.sql
 ┣ middlewares
 ┃ ┣ check-auth.js
 ┃ ┣ isAdmin.ts
 ┃ ┗ upload-files.ts
 ┣ models
 ┃ ┣ chat_room.ts
 ┃ ┣ chats.ts
 ┃ ┣ comment.ts
 ┃ ┣ connection_status.ts
 ┃ ┣ members.ts
 ┃ ┣ posts.ts
 ┃ ┣ reservations.ts
 ┃ ┗ seats.ts
 ┣ routes
 ┃ ┣ access-routes.ts
 ┃ ┣ admin-routes.ts
 ┃ ┣ auth-routes.ts
 ┃ ┣ chat-routes.ts
 ┃ ┣ comment-routes.ts
 ┃ ┣ member-routes.ts
 ┃ ┣ post-routes.ts
 ┃ ┗ reservation-routes.ts
 ┣ types
 ┃ ┗ checkAuth.ts
 ┗ utils
   ┣ chat-utils.ts
   ┗ send-email.ts
```


## **6\. 구성원 역할**

| **이름** | **역할** |
| --- | --- |
| 박기영 | 풀스택, 팀장 |
| 성치호 | 프론트엔드 |
| 정명진 | 프론트엔드 |
| 신하영  | 프론트엔드 |
| 조가인 | 프론트엔드 |
| 엄윤주 | 백엔드 |
| 부혜선 | 백엔드 |