// 날짜 관련 유틸리티 함수들

// 어제 날짜를 YYYYMMDD 형식으로 반환
export const getYesterdayString = () => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  
  // 한국 시간대 고려하여 로컬 날짜 사용
  const year = yesterday.getFullYear();
  const month = String(yesterday.getMonth() + 1).padStart(2, '0');
  const day = String(yesterday.getDate()).padStart(2, '0');
  
  return `${year}${month}${day}`;
};

// 날짜 문자열을 YYYY.MM.DD 형식으로 변환
export const formatDateString = (dateString) => {
  if (!dateString) return '';
  return dateString.substring(0, 4) + '.' + 
         dateString.substring(4, 6) + '.' + 
         dateString.substring(6, 8);
};

// HTML date input 형식을 YYYYMMDD로 변환
export const formatDateForApi = (dateString) => {
  return dateString.replaceAll('-', '');
};

// YYYYMMDD 형식을 HTML date input 형식(YYYY-MM-DD)으로 변환
export const formatDateForInput = (dateString) => {
  if (!dateString || dateString.length !== 8) return '';
  return dateString.substring(0, 4) + '-' + 
         dateString.substring(4, 6) + '-' + 
         dateString.substring(6, 8);
};