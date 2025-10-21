import { useLocation } from 'react-router-dom';
import qs from 'query-string';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import MvInfo from './MvInfo';
import { getMovieInfo } from '../services/kobisApi';
import Header from '../components/Header';

function Boxmv() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // URL에서 영화 코드 추출
  const mvcd = qs.parse(location.search).mvcd;
  
  // State 관리
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 영화 정보 로드
  const loadMovieInfo = async (movieCd) => {
    if (!movieCd) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await getMovieInfo(movieCd);
      setMovieData(data);
    } catch (err) {
      console.error('영화 정보 로드 실패:', err);
      setError('영화 정보를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 영화 정보 로드
  useEffect(() => {
    loadMovieInfo(mvcd);
  }, [mvcd]);

  // 홈 버튼 클릭 핸들러
  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="app-container">
      <Header />
      
      <main className="main-content">
        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">영화 정보를 불러오는 중...</p>
          </div>
        )}
        
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}
        
        {movieData && <MvInfo m={{ movieInfoResult: { movieInfo: movieData } }} />}
      </main>
    </div>
  );
}
export default Boxmv;