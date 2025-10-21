## 웹서비스
https://kyunggwan.github.io/Project7_Movie  

### 0.리액트 왜 쓰는가
프론트앤드 라이브러리로 DOM관리와 상태 변화 관리 최소화  
Component 단위 작성 -> 생산성과 유지 보수 용이 (재사용 기능)  
JSX(Javascript + xml)  
Virtual DOM -> 랜더링 과정이 필요 없기 때문에 연산 비용 절감 

### 1.리액트 설치 및 실행, 파일 구조
npx create-react-app 프로젝트명 (리액트 셋팅 다 된 boilerplate/만들기 쉽게 도와주는 라이브러리)  
npm start 코드 짠 걸 미리보기 띄우기  
-node_modules: 라이브러리 모은 폴더  
-App.js: 메인페이지에 들어갈 HTML 짜는 곳  
-public/index.html: 메인페이지  
-public: static 파일 보관함  
-src: 소스코드 보관함  
-package.json: 설치한 라이브러리 목록  

### 2. 리액트 JSX 사용법
1. 태그에 class를 주고싶으면? -> className="" (class 는 예약어)  
2. 리액트에서 데이터 바인딩 쉽게하는 법 -> {변수명,함수}  
  	1. < img src={logo}/ >  
3. JSX 에서 style 속성 집어넣을 때 -> style={object 자료형으로 만든 스타일}  
  	1. < div style={{ color:'blue', fontSize:'30px' }} / >  

### 3.리액트에선 변수말고 state  
변수 대신 쓰는 데이터 저장공간  
userState()를 이용해서 만들어야함  
문자, 숫자, array, object 다 저장 가능  
{ useState }상단에 첨부  
let [a,b]=userState('데이터명');  
[state데이터,state 데이터 변경 함수 ]  
state는 변경되면 HTML이 자동으로 재렌더링이 됩니다(새로고침 필요없음).  
그냥 변수는 변경되어도 자동으로 렌더링 안됨(새로고침 필요함)  
자주 바뀌는, 중요한 데이터는 state에 저장 필요 

### 4.이벤트 리스너
onClick={클릭될 때 실행할 함수}  
onClick={()=>{실행할 내용}}  
state변경함수로 변경해서 재렌더링 

### 5.state 맘대로 변경하는 법
수정된 데이터를 만들기( 단 원본 state 수정x)-> state의 복사본을 만들어서 수정 -> deep copy(값을 공유하는 것이 아니라 서로 독립적인 값을 가지는 복사)  

### 6.Component로 HTML 깔끔하게 줄이는 법  
함수 만들고 이름 짓기  
이름은 대괄호  
축약을 원하는 HTML 넣고  
return()안에 있는건 태그 하나로 묶어야함(의미없는 < div > 쓰기 싫으면 < > < />)  
원하는 곳에서 <함수명/>  
어떤걸 component로 만드는게 좋을까  
반복출현하는 HTML 덩어리들  
자주 변경되는 HTML UI들  
다른 페이지 만들 때도 컴포넌트로 만듦  

