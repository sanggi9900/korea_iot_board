import React, { useState } from 'react'
import userCountStore from '../stores/count.store'
import userCartStore from '../stores/cart.store';

// 함수형 컴포넌트
export default function E_zustand_render() {
  //* state *//
  //# state: 입력되는 새로운 아이템에 대한 상태 관리 //
  const [newItem, setNewItem] = useState({
    id: 0,
    name:'',
    price: 0,
    quantity: 1
  });

  //# zustand: count 값을 전역 상태 관리 //
  const { increment, decrement} = userCountStore();

  //# zustand: cart 값을 전역 상태 관리 //
 const { addItem, clearCart } = userCartStore(); 

//* Event Handle */
//# event handler: 새로운 장바구니 아이템 입력 상태 관리 //
// -하나의 핸들러로 관리
const handleCartInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const {name, value} = e.target;
  setNewItem((prevItem) => ({
    ...prevItem,
    [name]: name === 'price' || name === 'quantity' ? Number(value) : value
  }));
};

//# event handler: 새로운 장바구니 아이템 생성 버튼 클릭 이벤트 핸들러 //
const handleAddItem = () => {
  if (newItem.name && newItem.price > 0) {
    addItem({
      ...newItem,
      id: Date.now()
    }); // 임시로 현재 시간 기반 ID 생성

    // Input창 초기화
    setNewItem({
      id: 0,
      name:'',
      price: 0,
      quantity: 1
    });
  }
};


  return (
    <div
      style={{
        textAlign: 'center',
        marginTop: '20px',
        backgroundColor: 'lightgreen'
      }}>
      <h2>Zustand Render: Count 상태를 변경하는 버튼</h2>
      <button 
        onClick={increment}
        style={{
          marginRight: '10px',
          padding: '15px 20px'
        }}
        >증가</button>
      <button  
        onClick={increment}
        style={{
          marginRight: '10px',
          padding: '15px 20px'
        }}
        >감소</button>

        <h2>Zustand Render: Cart 상태를 변경하는 Input</h2>
        <div style={{ padding: '20px', maxWidth: '400', margin: '0 auto'}}>
          <h3>Shopping Cart</h3>

          <div style={{marginBottom: '20px'}}>
            <input 
              type="text" 
              placeholder='메뉴명'
              name='name'
              value={newItem.name}
              onChange={handleCartInputChange}
            />
              <input 
              type="number" 
              placeholder='메뉴 가격'
              name='price'
              value={newItem.price}
              onChange={handleCartInputChange}
            />
              <input 
              type="number" 
              placeholder='메뉴 수량'
              name='quantity'
              value={newItem.quantity}
              onChange={handleCartInputChange}
            />
            <br />

            <button
              onClick={handleAddItem}
              style={{
                padding: '5px 10px',
                marginTop: '10px'
              }}
            >새로운 장바구니 아이템 추가
            </button>
            
            <button
              onClick={clearCart}
              style={{
                padding: '5px 10px',
                marginTop: '10px',
                marginLeft: '10px'
              }}
            >
              장바구니 전체 삭제
              </button>
          </div>
        </div>
    </div>
  )
}
