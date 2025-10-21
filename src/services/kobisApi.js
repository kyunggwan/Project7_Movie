import { createApiUrl } from '../config/api';

// API 응답 에러 체크
const checkApiResponse = (data) => {
  if (data.faultInfo) {
    throw new Error(`API Error: ${data.faultInfo.message}`);
  }
  return data;
};

// 박스오피스 데이터 조회
export const getDailyBoxOffice = async (targetDate) => {
  try {
    const url = createApiUrl('/boxoffice/searchDailyBoxOfficeList.json', {
      targetDt: targetDate
    });
    
    const response = await fetch(url);
    const data = await response.json();
    
    checkApiResponse(data);
    return data.boxOfficeResult.dailyBoxOfficeList;
  } catch (error) {
    console.error('박스오피스 데이터 조회 실패:', error);
    throw error;
  }
};

// 주간 박스오피스 데이터 조회 (더 많은 데이터)
export const getWeeklyBoxOffice = async (targetDate) => {
  try {
    const url = createApiUrl('/boxoffice/searchWeeklyBoxOfficeList.json', {
      targetDt: targetDate,
      weekGb: '0' // 주간
    });
    
    const response = await fetch(url);
    const data = await response.json();
    
    checkApiResponse(data);
    return data.boxOfficeResult.weeklyBoxOfficeList;
  } catch (error) {
    console.error('주간 박스오피스 데이터 조회 실패:', error);
    throw error;
  }
};

// 영화 목록 조회 (더 많은 영화 데이터)
export const getMovieList = async (curPage = 1, itemPerPage = 50) => {
  try {
    const url = createApiUrl('/movie/searchMovieList.json', {
      curPage: curPage,
      itemPerPage: itemPerPage,
      openStartDt: '20240101', // 2024년 이후 개봉 영화
      openEndDt: '20251231'    // 2025년까지
    });
    
    const response = await fetch(url);
    const data = await response.json();
    
    checkApiResponse(data);
    return data.movieListResult.movieList;
  } catch (error) {
    console.error('영화 목록 조회 실패:', error);
    throw error;
  }
};

// 영화 상세 정보 조회
export const getMovieInfo = async (movieCd) => {
  try {
    const url = createApiUrl('/movie/searchMovieInfo.json', {
      movieCd: movieCd
    });
    
    const response = await fetch(url);
    const data = await response.json();
    
    checkApiResponse(data);
    return data.movieInfoResult.movieInfo;
  } catch (error) {
    console.error('영화 정보 조회 실패:', error);
    throw error;
  }
};

// 영화 검색
export const searchMovies = async (movieNm) => {
  try {
    const url = createApiUrl('/movie/searchMovieList.json', {
      movieNm: movieNm,
      curPage: 1,
      itemPerPage: 20
    });
    
    const response = await fetch(url);
    const data = await response.json();
    
    checkApiResponse(data);
    return data.movieListResult.movieList;
  } catch (error) {
    console.error('영화 검색 실패:', error);
    throw error;
  }
};