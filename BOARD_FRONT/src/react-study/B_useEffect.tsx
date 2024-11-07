import React, { useEffect, useState } from 'react'
//             useEffect, useState   둘다 컴퍼넌트 내에서 실행     
/*
! useEffect 
1. 함수형 컴포넌트  내에서
2. 렌더링될 때와 특정 상태가 변경될 때 실행되는 부수효과 처리
3. Hook

cf) 컴포넌트가 생성될 때 (마운트)
    , 컴포넌트가 제거될 때 (언마운트)
    , 특정 상태나 props가 변경될 때 호출

- 데이터 가져오기(Fetching Data), 타이머 설정, 이벤트 리스너 등록 등에 사용

! useEffect 사용법
- 첫 번째 인자: 부수효과
- 두 번재 인자: 의존성 배열(deps - dependencies)

useEffect(() => {
  - 부수 효과 코드를 작성
  
  return () => {
    - 정리(clean-up) 코드
    - 언마운트 시 실행
  };
}, [의존성 배열을 작성]);

cf) 의존성 배열
  : 빈 배열 - 컴포넌트가 마운트될 때 한 번만 실행
  : 값이 있는 배열 - 해당 값이 변경될 때마다 실행 (여러 개 가능) 
*/

export default function B_useEffect() {
  // const : 상수 선언
  const [count, setCount] = useState<number>(0);  
  //  useState는 배열 형태롤 두가지 값을 반환 (현재 상태값, 상태 변경할수 있는 함수)
  // setCount 함수는 prevCount 라는 매개변수를 받는 
  // 함수(prevCount => prevCount + 1)을 인자로 받습니다. preCount는 count 현재값 즉 0
  //setCount가 count를 새값 1로 업데이트 합니다
  // count의 값이 변경되었기 때문에 React는 컴포넌트를 다시 렌더링 합니다
  // 재랜더링된 컴포넌트에서 count의 값은 1이된다
  // useState는 상태관리하기 위한 훅이다 
  // <number> 상태 타입명시하는것으로  count가 숫자형이어야 함을 TS에서 알려준다
  // (0)은 count의 초기값 0 을 가진다

  const [isRunning, setIsRunning] = useState<boolean>(false);
  // isRunning은 현재상태값 setIsRunning은 상태변경할수 있는 함수
  // boolean 타입 명시 초기값 false 이다
  // setIsRunning(prevIsRunning => !prevIsRunning);
  // 현재 값 isRunning을 매개변수를 받기때문에 현재 값인 false가 true가된다
  const [toggleData, setToggleData] = useState<boolean>(false); 
  // toggleData는 현재상태값 setToggleData는 상태변경할수 있는 함수
  // boolean 타입 명시 초기값 false 이다
  // setToggleData(prevData => !prevData)
  // 현재 값 toggleData을 매개변수를 받기때문에 현재 값인 false가 true가된다
  console.log(toggleData);

  useEffect(() => {
    // 타이머 효과를 구현
    let interval: NodeJS.Timeout | undefined;
    if (isRunning) {
      interval = setInterval(() => {
        setCount(prevCount => prevCount + 1);
      }, 1000); // 1000밀리초(1초)에 한 번씩 첫 번째 인자의 함수 실행
    }

    return () => clearInterval(interval);
  }, [isRunning]);
  
  const handleButtonClick = () => {
    setIsRunning(prevIsRunning => !prevIsRunning);
  }
  
  const handleToggleButtonClick = () => {
    setToggleData(prevData => !prevData);
  }

  // useEffect의 인자값
  // 첫 번째 인자 (effect): 부수 효과 - 통신(요청), 데이터 변경 시 동작 될 효과
  // 두 번째 인자 (deps): 의존성 배열 
  //      - 빈 배열일 경우 마운팅 시에만~  효과 발생
  //      - 배열에 요소가 있는 경우 해당 값의 상태 변경 시 효과가 재발생


  useEffect(() => {   // 함수라서 호출을 해야한다
   console.log('useEffect 화면출력');
    // 실행시 읽어져 내려오는 동안 실행
    // 제약조건을 건다  
  },[toggleData]);
 // 의존성 배열:Deps 먼저 읽고 기준알기  
 // 마운팅 될때..
 // 변화 데이터를 랜더링할때..
  return (
    <div>
      <p>Timer: {count} seconds</p>
      <button onClick={handleButtonClick}>
        {/* 실행 중이면 'Stop'버튼, 실행 중이 아니면 'Start'버튼 */}
        {isRunning ? 'Stop' : 'Start'}
      </button>

      <div style={{
        backgroundColor: 'pink',
        padding: '20px'
      }}>
        <button
          onClick={handleToggleButtonClick}
        >
          상태 변화 버튼
        </button>
      </div>
    </div>
  )
}
