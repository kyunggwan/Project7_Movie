import {useLocation} from 'react-router-dom';
import qs from 'query-string';
import {useEffect, useState} from 'react';
import MvInfo from './MvInfo';
import {useNavigate} from "react-router-dom";

function Boxmv() {
  const loc = useLocation().search;
  console.log(loc);

  //parse = 오브젝트로 생성
  const mvcd = qs.parse(loc).mvcd;
  
//useState -> 변하는 값을 반영할때
const [mv, setMv] = useState() ;

const getMovie = async(mvcd) => {
    let url = 'https://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?'
    url = url + 'key' + '=f5eef3421c602c6cb7ea224104795888';
    url = url + '&movieCd=' + mvcd;

    const resp = await fetch(url);
    const data = await resp.json();
    setMv(data);
}
  //useEffect
  useEffect(() => {

    getMovie(mvcd); 

  }, [])
  //홈 버튼 온클릭 설정
const navigate = useNavigate();
 
const handleClick = (t) => {
  const url = {
      '홈버튼' : '/',
  }
  navigate(url[t]);     
}

  return(
      <>
          {mv && <MvInfo m={mv}/>}
          <div className='buttondiv' >
            <button className='hbutton' onClick = {() => handleClick('홈버튼')}>Home</button>
          </div>
      </>
  );
}
export default Boxmv;