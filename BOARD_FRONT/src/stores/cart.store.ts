// cart.store.ts

import { create } from "zustand";

//* interface : 스토어(전역저장소)의 interface 정의 *//
//# 장바구니 아이템의 interface 정의 // 
interface CartItem {
  id: number; // 장바구니 아이템들의  고유값
  name: string; // 상품명
  price: number; // 상품 가격
  quantity: number; // 상품 개수
}

//# 스토어(전역 저장소)의 interface 정의 //
interface CartStoreType {
  // 상태 필드 정의
  items: CartItem[];

  // 상태 업데이트 함수
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void; // 단건 아이템 삭제
  clearCart: () => void; // 전체 아이템 삭제
}

// 저장소 생성 함수
const userCartStore = create<CartStoreType>((set) => ({
  // 상태 필드 초기화
  items: [],

  // 상태 업데이트 함수 정의
  addItem: (item) => set((state) => ({
    items: [...state.items, item]
        // ... 스프레드 연산
  })),
  removeItem: (id) => set((state) => ({
    items: state.items.filter((item) => item.id !== id)
    //           배열   처음부터끝까지 순회  
  })),
  clearCart: () => set({items: []}),
}));

export default userCartStore;