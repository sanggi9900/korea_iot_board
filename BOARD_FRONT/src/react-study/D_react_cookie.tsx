import React from 'react'
import { useCookies } from 'react-cookie'

/*
! react-cookie
: React에서 쿠키를 쉽게 관리할 수 있도록 도와주는 "라이브러리"
- 쿠키의 생성, 접근, 수정, 삭제 기능을 담당한다

<< 설치 명령어 >>
npm i react-cookie 
npm i --save @types/react-cookie  //리액트 쿠키가 타입을 인식할수 있도록 하는것

<< 기본 사용법 >>
react-cookie는 useCookies 훅을 통해
  쿠키(cookies), 쿠키설정함수(setCookie)
  , 쿠키제거함수(removeCookie)를 반환

  const [ cookies, setCookies, removeCookie]
    = useCookies(['쿠키이름']); 인자값

  cf) useCookies 훅에 전달되는 배열(인자값)
      : 배열로써 관리하고자 하는 쿠키의 이름을 전달
      : 사용자가 현재 컴포넌트에서 접근하려는 쿠키 이름을 지정하는 역활
      - 쿠키에 대한 접근: 'cookies.쿠키이름'을 통해 쿠키값 반환
*/

export default function D_react_cookie() {
  // 'user'라는 이름의 쿠키를 관리
  const [cookies, setCookie, removeCookie ] = useCookies(['user']); 
 //  필요한것만 받은면 된다 로그인은 setCookie
 //                       로그아웃은 removeCookie
 //                       사용자확은 Cookies

 // 쿠키 설정 함수
 const handleSetCookie = () => {
  // setCookie('쿠키이름', '쿠키값', 옵션설정-선택)  
  setCookie('user', '이승아', { path: '/'});
 }

 // 쿠키 삭제 함수
 const handleremoveCookie = () => {
  // removeCookie('쿠키이름', 옵션설정-선택)
  removeCookie('user', {path : '/'});
 }


 //? react-cookie 옵션 설정 (선택)
 /*
  path: 쿠키가 유효한 경로를 지정
  expires: 쿠키의 만료시간을 설정  (지정가능)
      - 현재 시점부터 특정 시간 경과 후 만료
  maxAge: 쿠키의 유효 시간을 초 단위로 설정 (지정안됨)
      - 현재 시간부터 지정한 시간 동안 쿠키가 유지
        (생성된 지점으로부터 시간을 기준으로 유효 시간 설정)
  secure: true로 설정 시 HTTPS에서만 쿠키가 전송
  sameSite: 쿠키가 전송될 조건을 제한
 */
  return (
    <div>
      <button onClick={handleSetCookie}>쿠키 설정 번튼</button>
      <button onClick={handleremoveCookie}>쿠키 제거 번튼</button>

      User Cookie: {cookies.user}
    </div>
  )
}
