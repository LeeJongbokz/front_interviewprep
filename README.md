# 🧑🏻‍💻 InterviewPrep 
### 👥  팀원
|                                         Backend                                          |                                         Backend                                          |                                         Backend                                          |                                       Frontend                                        |                                        Frontend                                         |
| :--------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------: | 
| [이종복](https://github.com/LeeJongbokz) | [진은혜](https://github.com/Jineh) | [임정택](https://github.com/wjdxor) | [도윤](https://github.com/N3theri9N) | [이지홍](https://github.com/lee-ji-hong) |
<br>

### 📖 개요
- **기술면접을 준비하는 개발자를 위한 플랫폼입니다.** <br>
- 답변을 공유하고 다른 답변과 비교할 수 있습니다. <br>
- 마음에 드는 답변을 추천하고, 최고의 답변을 공부할 수 있습니다. 
<br> 

### 📝 프로젝트 구성도(백엔드)

<img width="849" alt="스크린샷 2022-10-31 오후 5 59 39" src="https://user-images.githubusercontent.com/38105420/198970477-b74a7e5a-9e4a-4620-9335-38ccddcb1b73.png">

<br>

## ⚠️ 기술적 issue 해결 과정
1. 좋아요(추천) 기능 구현 및 동시성이슈 <br>
[종복] https://bryandev.tistory.com/1116 <br> 
2. Ngrinder를 이용해 성능 테스트 <br> 
[종복] https://bryandev.tistory.com/1117 (작성중) <br> 
3. 로그인 상태 유지를 위한 JWT 토큰 적용 <br> 
[종복] https://bryandev.tistory.com/1118 <br> 
4. 문제 필터링 시 서버 부하를 고려한 캐시 전략 <br> 
[종복] https://bryandev.tistory.com/1119 (작성중) <br> 
5. JUnit과 Mockito로 고립된 단위 테스트 작성 <br> 
[종복] https://bryandev.tistory.com/1120 <br> 
6. Spring Security를 활용한 Oauth2 적용 <br> 
[종복] https://bryandev.tistory.com/1129 (작성중) <br>
7. AOP를 적용한 공통 관심사 분리 <br>

## 🔲 브랜치 관리 전략





## ERD
<img width="759" alt="스크린샷 2022-11-02 오후 3 19 55" src="https://user-images.githubusercontent.com/38105420/199413050-040b95fa-d3a1-4e1a-940f-752ea046e22c.png">



<br>


## API 명세
https://tarry-minibus-78a.notion.site/API-38be066e369744c186225d11f64a0f71

<br>

| URL | Method | request | response | 설명 |
| --- | --- | --- | --- | --- |
| /question/{type} | get |  | Page<QuestionDTO> | 특정 타입의 문제들을 조회한다. |
| /question/single/{id} | get |  | QuestionDTO | 한 문제를 조회한다. |
| /question | post | QuestionDTO |  | 문제를 작성한다. |
| /question/{id} | put | QuestionDTO | Question | 문제를 수정한다. |
| /question/{id} | delete |  |  | 문제를 삭제한다. |
| /answer | post | AnswerRequestDTO |  | 답변을 작성한다. |
| /answer/{id} | get |  | AnswerResponseDTO | 답변을 조회한다. |
| /answer/{id} | delete |  |  | 답변을 삭제한다. |
| /heart/{id} | post |  |  | 답변을 추천한다. |
| /heart/{id} | delete |  |  | 답변추천을 취소한다. |
| /member/login | post |  |  | 로그인 시도한다. |

