## **시켜줘,  엘리스 명예 소방관**

<img src="/public/images/img%20copy.jpg" width="1148" height="675">


## **1\. 기획의도 & 목적**


****"엘리스 수강생들이 더 편리하게 사용할 수 있는 서비스가 없을까?****

> 엘리스 수강생들을 위한 커뮤니티 최종본!  
> 레이서들을 위한 커뮤니티 및 엘리스랩 좌석예약을 더욱 편리하게 이용하기 위한 모바일 기반 웹서비스입니다.

<br/><br/><br/>

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
<br/><br/><br/>

## **3\. 프로젝트만의 차별점, 기대 효과**
<br/><br/><br/>


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
<br><br>

#### 🎨  **협업 도구**

-   Figma : 초반 기획시 빠른 레이아웃을 잡기 위해 사용  
    🔗[피그마 링크](https://www.figma.com/file/UsjJ6jb7183EYkwycY9BGW/%EC%84%B1%EC%88%98%EB%8F%99-%EC%97%98%EB%A6%AC%EC%8A%A4?type=design&node-id=11%3A1428&t=xfZgTkdHcgXADYNf-1)
-   Notion : API 명세서, API DOCS 등 활용  
    🔗[노션 링크](https://www.notion.so/rki0/c10edb826f394906b73ab477e092e296%5D(https://www.notion.so/rki0/c10edb826f394906b73ab477e092e296))
-   Discord : 팀원간 커뮤니케이션 및 매일 아침 스크럼 진행
-   Gitlab : Code Repository
-   Gitlab Issue : Trouble Shooting 내역 기제
-   Gitlab Wiki : 🔗[프로젝트 과정 기록]
-   Postman Teams : API 테스트 진행
<br>

#### 📎 **커밋 컨벤션**

```
# 제목은 최대 50글자까지 아래에 작성: ex) Feat: Add Key mapping  
# 본문은 아래에 작성  
# 꼬릿말은 아래에 작성: ex) Github issue #23  
# --- COMMIT END ---  
#   <타입> 리스트  
#   feat        : 기능 (새로운 기능)  
#   fix         : 버그 (버그 수정)  
#   refactor    : 리팩토링  
#   design      : CSS 등 사용자 UI 디자인 변경  
#   comment     : 필요한 주석 추가 및 변경  
#   style       : 스타일 (코드 형식, 세미콜론 추가: 비즈니스 로직에 변경 없음)  
#   docs        : 문서 수정 (문서 추가, 수정, 삭제, README)  
#   test        : 테스트 (테스트 코드 추가, 수정, 삭제: 비즈니스 로직에 변경 없음)  
#   chore       : 기타 변경사항 (빌드 스크립트 수정, assets, 패키지 매니저 등)  
#   init        : 초기 생성  
#   rename      : 파일 혹은 폴더명을 수정하거나 옮기는 작업만 한 경우  
#   remove      : 파일을 삭제하는 작업만 수행한 경우  
# ------------------  
#   제목 첫 글자를 대문자로  
#   제목은 명령문으로  
#   제목 끝에 마침표(.) 금지  
#   제목과 본문을 한 줄 띄워 분리하기  
#   본문은 "어떻게" 보다 "무엇을", "왜"를 설명한다.  
#   본문에 여러줄의 메시지를 작성할 땐 "-"로 구분  
# ------------------  
#   <꼬리말>  
#   필수가 아닌 optioanl  
#   Fixes        :이슈 수정중 (아직 해결되지 않은 경우)  
#   Resolves     : 이슈 해결했을 때 사용  
#   Ref          : 참고할 이슈가 있을 때 사용  
#   Related to   : 해당 커밋에 관련된 이슈번호 (아직 해결되지 않은 경우)  
#   ex) Fixes: #47 Related to: #32, #21
```
<br/><br/><br/>


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
<br/><br/><br/>

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
