import React from 'react'
import userCountStore from '../stores/count.store';
import userCartStore from '../stores/cart.store';

/*
! zustand 전역 상태 관리
1. 개념: 상태(state)를 의미 - React에서 사용되는 전역 상태 관리 라이브러리 중 하나

2. 장점
  - 간결성, 구독 최적화, 유연성, 접근성

3. zustand의 형태 (typescript 기준)
- create 함수를 사용하여 스토어(store) 생성
  : 해당 스토어를 통해 프로젝트 전역에서 데이터에 접근 가능
- create 함수에 제네릭<>을 사용하여 함수 구조를 정의
  : 전역 상태값(필드), 전역 상태 설정 함수(메서드)

- create 함수 내의 구조
  : set 함수를 통해 상태를 업데이트
  : (set) => ({ 해당 구조 내에서 제네릭 구조를 작성})

*/

export default function E_zustand() {
  //* state *// 
  //# state: count 값에 대한 전역 상태 관리 //
  const { count, increment, decrement} = userCountStore();

  //# state: cart(장바구니) 값에 대한 전역 상태 관리 //
  const {items, addItem, removeItem, clearCart } = userCartStore();

  // 구조 분해 할당 
  // const a = userCountStore();
  // a.count
  // a.decrement
  // a.increment
  //& 타입스크립트 타입 추론 기능 &//
 
  const array = [
    { a: 1, b: 2 },
    { a: 2, b: 3 },
    { a: 3, b: 4 },
    { a: 4, b: 5 },
  ];

  array.map((arr) => {
    console.log(arr.a);
  });

// - src/react-study/E_Zustand.tsx/30번째 줄


  // return: zustand 전역 상태 관리에 대한 출력 //
  // 함수형 컴포넌트
  return (
    <div style={{
      textAlign: 'center',
      marginTop: '20px'
    }}>
      <h2>Zustand: Counter Example</h2>
      <p>{`Count: ${count}`}</p>

      <h2>Zustand: Cart Example</h2>
      <ul>
        {items.map((item,index, items) => (
          // 지금 순회 되고 있는 아이템에 대한 index 의 items(배열)
          <li key={item.id} style={{ marginBottom: '10px' }}>
            {item.name} - ${item.price} X {item.quantity}

            <button
              onClick={() => removeItem(item.id)}
              style={{ marginLeft: '10px', padding: '3px 5px' }}
              >
                삭제
            </button>
          </li>
        ))} 
      </ul>
    </div>
  )
}
