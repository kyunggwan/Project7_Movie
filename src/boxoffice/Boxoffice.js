import { useEffect, useState, useRef } from "react";
import '../Mv.css';
import { Link } from "react-router-dom";

export default function Boxoffice () {
  //state 변수
  const [viewDay, setviewDay] = useState();
   
  //박스 오피스 리스트들이 바껴야하므로( 또 배열로 만들거다)
  const [officeList, setOfficeList] = useState([]);

  //ref변수
  const refDateIn = useRef();

  //URL로 정보 불러오기
  const getBoxoffice = async(d) => {
  let url = 'https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?';
  url = url + 'key'+'=f5eef3421c602c6cb7ea224104795888';
  url = url + '&targetDt=' + d;

  //try-catch 구문에 넣는다(마지막)
  //비동기 통신을 한다.
  //통신을 해서 정상적으로 처리할 때까지 기다려, 그리고 resp값을 받아 넣어라
  try{
    const resp = await fetch(url);
    const data = await resp.json();
    console.log(data.boxOfficeResult.dailyBoxOfficeList);

    let dailyBoxOfficeList = data.boxOfficeResult.dailyBoxOfficeList;
    setOfficeList(
    dailyBoxOfficeList.map((item) => 
    <Link to = {'/mv?mvcd=' +item.movieCd} style={{ textDecoration: "none" }}>
       <div className= 'mvContent' key={item.movieCd}> 
          <span className='Rank'>{item.rank}</span>
          <span className='Nm'>{item.movieNm}</span>
          <span className='Per'>{item.salesShare}%</span>
          <span className='Audi'>{item.audiAcc}명</span>
          </div>
     </Link>) 
    )
  } catch(err) {
    console.log(err)
  }
}

  //페이지가 처음 랜더링 되었을 때 실행되는 Hook
useEffect(() => {
  //어제 날짜를 찍고 싶다 javaScript date 검색해서 넣기, 연도 추출 등등
    const yesterday = new Date();
    yesterday.setDate(new Date().getDate() -1);
    let d =yesterday.toISOString().substring(0, 10).replaceAll('-', '');
    //state변수 변경
    setviewDay(d);
    //박스 오피스 open API 호출
    getBoxoffice(d);
}, []);

//날짜 바뀔 때마다 리스트 바뀌는 부분
useEffect(() => {
  (viewDay && setviewDay(viewDay.substring(0,4) +'.'+viewDay.substring(4,4)))
  //박스 오피스 open API 호출
getBoxoffice(viewDay);
}, [viewDay])

  //event 함수
  const handleChange = (e) => {
    e.preventDefault();
    setviewDay(refDateIn.current.value.replaceAll('-','')) //날짜 변경 적용
    console.log(refDateIn.current.value.replaceAll('-',''));
  }

  return(
    <>
      <h1>박스오피스</h1>
      <form className='inputbox'>
        <input type="date" name="dateIn" ref={refDateIn} onChange={handleChange}/>
      </form>
      
      <div className="chart">
          <div className="chTitle">
            <span className='Rank'>순위</span>
            <span className='Nm'>영화명</span>
            <span className='Per'>점유율</span>
            <span className='Audi'>관객수</span>
         </div>
         <ul>
          {officeList}
         </ul>
      </div>
    </>
  );
}