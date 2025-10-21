import { useEffect, useState, useRef } from "react";
import '../Mv.css';
import { getDailyBoxOffice, getWeeklyBoxOffice, getMovieList, searchMovies } from '../services/kobisApi';
import { getYesterdayString, formatDateForApi, formatDateForInput } from '../utils/dateUtils';
import MovieCard from '../components/MovieCard';
import Header from '../components/Header';

export default function Boxoffice() {
  // State 관리
  const [viewDay, setViewDay] = useState('');
  const [officeList, setOfficeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('boxoffice');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // 10개로 복원

  // Ref
  const dateInputRef = useRef();
  const searchInputRef = useRef();

  // 박스오피스 데이터 로드
  const loadBoxOfficeData = async (date) => {
    if (!date) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // 일간 박스오피스 데이터 가져오기
      const dailyData = await getDailyBoxOffice(date);
      console.log('📊 일간 박스오피스:', {
        날짜: date,
        총_영화_수: dailyData.length,
        영화_목록: dailyData.map(movie => ({
          순위: movie.rank,
          영화명: movie.movieNm,
          점유율: movie.salesShare,
          관객수: movie.audiAcc
        }))
      });

      // 주간 박스오피스 데이터도 가져와서 합치기
      let weeklyData = [];
      try {
        weeklyData = await getWeeklyBoxOffice(date);
        console.log('📊 주간 박스오피스:', {
          총_영화_수: weeklyData.length,
          영화_목록: weeklyData.map(movie => ({
            순위: movie.rank,
            영화명: movie.movieNm,
            점유율: movie.salesShare,
            관객수: movie.audiAcc
          }))
        });
      } catch (weeklyErr) {
        console.log('주간 박스오피스 데이터 없음:', weeklyErr.message);
      }

      // 영화 목록도 가져와서 합치기 (더 많은 데이터)
      let movieListData = [];
      try {
        movieListData = await getMovieList(1, 30);
        console.log('📊 영화 목록:', {
          총_영화_수: movieListData.length,
          영화_목록: movieListData.slice(0, 5).map(movie => ({
            영화코드: movie.movieCd,
            영화명: movie.movieNm,
            개봉일: movie.openDt
          }))
        });
      } catch (movieListErr) {
        console.log('영화 목록 데이터 없음:', movieListErr.message);
      }

      // 모든 데이터 합치기 (중복 제거)
      const allMovies = [...dailyData, ...weeklyData, ...movieListData];
      const uniqueMovies = allMovies.filter((movie, index, self) => 
        index === self.findIndex(m => m.movieCd === movie.movieCd)
      );

      console.log('📊 최종 합계:', {
        일간_데이터: dailyData.length,
        주간_데이터: weeklyData.length,
        영화목록_데이터: movieListData.length,
        총_합계: allMovies.length,
        중복_제거_후: uniqueMovies.length
      });

      setOfficeList(uniqueMovies);
    } catch (err) {
      console.error('박스오피스 데이터 로드 실패:', err);
      setError('데이터를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 초기 로드
  useEffect(() => {
    const yesterdayDate = getYesterdayString();
    setViewDay(yesterdayDate);
    loadBoxOfficeData(yesterdayDate);
  }, []);

  // 날짜 변경 시 데이터 로드
  useEffect(() => {
    if (viewDay) {
      loadBoxOfficeData(viewDay);
    }
  }, [viewDay]);

  // 날짜 변경 핸들러
  const handleDateChange = (e) => {
    e.preventDefault();
    const formattedDate = formatDateForApi(dateInputRef.current.value);
    setViewDay(formattedDate);
  };

  // 검색 핸들러
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setError(null);
    setCurrentPage(1);
    
    try {
      const results = await searchMovies(searchQuery);
      console.log('🔍 영화 검색 완료:', {
        검색어: searchQuery,
        총_결과_수: results.length,
        검색_결과: results.map(movie => ({
          영화코드: movie.movieCd,
          영화명: movie.movieNm,
          개봉일: movie.openDt,
          장르: movie.genreAlt
        }))
      });
      setSearchResults(results);
      setActiveTab('search');
    } catch (err) {
      console.error('검색 실패:', err);
      setError('검색에 실패했습니다.');
    } finally {
      setIsSearching(false);
    }
  };

  // 검색어 변경 핸들러
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // 탭 변경 핸들러
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
    if (tab === 'boxoffice') {
      setSearchResults([]);
      setSearchQuery('');
    }
  };

  // 페이지네이션 로직
  const getCurrentItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    if (activeTab === 'search') {
      return searchResults.slice(startIndex, endIndex);
    }
    return officeList.slice(startIndex, endIndex);
  };

  const getTotalPages = () => {
    const totalItems = activeTab === 'search' ? searchResults.length : officeList.length;
    return Math.ceil(totalItems / itemsPerPage);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // 페이지네이션 테스트 로그
    const totalItems = activeTab === 'search' ? searchResults.length : officeList.length;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    
    console.log('📄 페이지 변경:', {
      현재_페이지: page,
      총_아이템_수: totalItems,
      페이지당_아이템_수: itemsPerPage,
      표시_범위: `${startIndex + 1}번째 ~ ${endIndex}번째`,
      총_페이지_수: Math.ceil(totalItems / itemsPerPage),
      탭: activeTab
    });
  };

  const renderPagination = () => {
    const totalPages = getTotalPages();
    const totalItems = activeTab === 'search' ? searchResults.length : officeList.length;
    
    console.log('🔢 페이지네이션 렌더링:', {
      총_아이템_수: totalItems,
      총_페이지_수: totalPages,
      현재_페이지: currentPage,
      페이지당_아이템_수: itemsPerPage,
      페이지네이션_표시: totalPages > 1 ? '표시됨' : '숨김됨'
    });
    
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`pagination-button ${i === currentPage ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="pagination">
        <button
          className="pagination-button prev-next"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          이전
        </button>
        {pages}
        <button
          className="pagination-button prev-next"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          다음
        </button>
      </div>
    );
  };

  return (
    <div className="app-container">
      <Header />
      
      <main className="main-content">
        {/* 필터 탭 */}
        <div className="filter-tabs">
          <button 
            className={`tab-button ${activeTab === 'boxoffice' ? 'active' : ''}`}
            onClick={() => handleTabChange('boxoffice')}
          >
            박스오피스
          </button>
          <button 
            className={`tab-button ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => handleTabChange('upcoming')}
          >
            상영예정작
          </button>
          <button 
            className={`tab-button ${activeTab === 'special' ? 'active' : ''}`}
            onClick={() => handleTabChange('special')}
          >
            특별상영
          </button>
        </div>

        {/* 검색 바와 날짜 선택기 */}
        <div className="search-date-container">
          <form className="search-form" onSubmit={handleSearch}>
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="영화명 검색"
                value={searchQuery}
                onChange={handleSearchChange}
                ref={searchInputRef}
                className="search-input"
              />
              <button type="submit" className="search-button">
                🔍
              </button>
            </div>
          </form>
          
          {activeTab === 'boxoffice' && (
            <form className='date-form'>
              <label htmlFor="dateInput" className="date-label">
                📅 조회 날짜
              </label>
              <input 
                id="dateInput"
                type="date" 
                name="dateIn" 
                ref={dateInputRef} 
                value={formatDateForInput(viewDay)}
                onChange={handleDateChange}
                className="date-input"
              />
            </form>
          )}
        </div>
        
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}
        
        {(loading || isSearching) && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">
              {isSearching ? '검색 중...' : '데이터를 불러오는 중...'}
            </p>
          </div>
        )}
        
        {/* 박스오피스 탭 */}
        {activeTab === 'boxoffice' && !loading && !error && officeList.length > 0 && (
          <div className="boxoffice-container">
            <div className="boxoffice-header">
              <h3>박스오피스 순위 ({officeList.length}개)</h3>
            </div>
            <div className="movie-grid">
              {getCurrentItems().map((movie) => (
                <MovieCard key={movie.movieCd} movie={movie} isSearchResult={true} />
              ))}
            </div>
            {renderPagination()}
          </div>
        )}
        
        {/* 검색 결과 탭 */}
        {activeTab === 'search' && !isSearching && !error && searchResults.length > 0 && (
          <div className="search-results-container">
            <div className="search-results-header">
              <h3>검색 결과 ({searchResults.length}개)</h3>
            </div>
            <div className="movie-grid">
              {getCurrentItems().map((movie) => (
                <MovieCard key={movie.movieCd} movie={movie} isSearchResult={true} />
              ))}
            </div>
            {renderPagination()}
          </div>
        )}
        
        {/* 상영예정작 탭 */}
        {activeTab === 'upcoming' && (
          <div className="upcoming-container">
            <div className="upcoming-header">
              <h3>상영예정작</h3>
              <p>곧 개봉될 영화들을 확인해보세요!</p>
            </div>
            <div className="empty-state">
              <div className="empty-icon">🎬</div>
              <h3>준비 중입니다</h3>
              <p>상영예정작 기능은 곧 추가될 예정입니다.</p>
            </div>
          </div>
        )}
        
        {/* 특별상영 탭 */}
        {activeTab === 'special' && (
          <div className="special-container">
            <div className="special-header">
              <h3>특별상영</h3>
              <p>특별한 영화들을 만나보세요!</p>
            </div>
            <div className="empty-state">
              <div className="empty-icon">🎭</div>
              <h3>준비 중입니다</h3>
              <p>특별상영 기능은 곧 추가될 예정입니다.</p>
            </div>
          </div>
        )}
        
        {/* 빈 상태 */}
        {!loading && !isSearching && !error && 
         ((activeTab === 'boxoffice' && officeList.length === 0) ||
          (activeTab === 'search' && searchResults.length === 0)) && (
          <div className="empty-state">
            <div className="empty-icon">🎬</div>
            <h3>데이터가 없습니다</h3>
            <p>
              {activeTab === 'search' 
                ? '검색 결과가 없습니다. 다른 검색어를 시도해보세요.'
                : '선택한 날짜의 박스오피스 데이터가 없습니다.'
              }
            </p>
          </div>
        )}
      </main>
    </div>
  );
}