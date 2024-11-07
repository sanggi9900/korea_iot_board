import axios from 'axios';
import React, { useEffect, useState } from 'react'

/*
  Menu 카테고리 검색 
  
  ! Menu 객체 구조
  - 고유값 id (Long - number)
  - 메뉴명 name
  - 메뉴 설명 description
  - 메뉴 가격 price (number)
  - 메뉴 이용 가능 여부 isAvailable (boolean)
  - 메뉴 카테고리 category
  - 메뉴 사이즈 size

  ! HTTP 
  - 메서드: GET
  - 경로: http://localhost:8080/api/v1/menus/search/category
*/

const DOMAIN = 'http://localhost:8080';
const MENU_API = 'api/v1/menus';

interface GetMenuCategoryResponseDto {
  name: string;
  description: string;
  price: number;
  isAvailable: boolean;
  category: string;
  size: string;
}

type Category = 'Food' | 'Drink' | 'Dessert';

export default function C_StateEffect() {
  //! 자습) 버튼 클릭으로 필터링 구현하기
  const [query, setQuery] = useState<Category>('Food');

  const [category, setCategory] = useState<string>('');
  const [results, setResults] = useState<GetMenuCategoryResponseDto[]>([]);
  
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  }

  const fetchMenuData = async (category: string) => {
    if (category.trim()) { // 카테고리 공백제거                                   
      try {

        const response = await axios.get(
          `${DOMAIN}/${MENU_API}/search/category`,
          { params: { category }}
        );

        const data = response.data.data;

        setResults(data);

      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
  }

  //! 자습) 버튼 클릭으로 필터링 구현하기
  //! 매개변수 query 변경  
  const fetchMenuButtonData = async (category: string) => {  
    if (category.trim()) {
      try {
// await: async 함수 안에서만 동작, 프라미스 처리될때 까지 기다린다 결과는 그 이후 반환
// axios: 비동기 통신 라이브러리
        const response = await axios.get(
          `${DOMAIN}/${MENU_API}/search/category`, // 서버 경로
          //! params 값 변경
          { params: { category }}  // axios의 옵션 객체
          // {category : category} 값변경 가능 
        );

        const data = response.data.data;

        setResults(data);

      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
  }

  useEffect(() => {
    fetchMenuData(category);
  }, [category]);

  useEffect(() => {
    fetchMenuButtonData(query);
  }, [query]);

  const handleButtonClick = (e:React.MouseEvent<HTMLButtonElement>) => {
    const selectedCategory = e.currentTarget.value as Category;
    setQuery(selectedCategory);
  }

  return (
    <div>
      <div>
        <button 
          value='Food'
          onClick={handleButtonClick}
        >Food</button>
        <button 
          value='Drink' 
          onClick={handleButtonClick}
        >Drink</button>
        <button 
          value='Dessert' 
          onClick={handleButtonClick}
        >Dessert</button>
      </div>

      <input 
        type="text"
        value={query}
        onChange={handleCategoryChange}  
        placeholder='Enter Category'
        required
      />

      <ul>
        {results.map((result, index) => (
          <li key={index}>{result.name}</li>
        ))}
      </ul>
    </div>
  )
}
