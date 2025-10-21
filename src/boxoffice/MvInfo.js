import { useEffect, useState } from "react";

function MvInfo(probs) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(
    Math.floor(Math.random() * 10000) + 1000
  );

  const keys = {
    movieNm: "영화명",
    movieCd: "영화코드",
    openDt: "개봉일자",
    prdtStatNm: "제작상태",
    showTm: "상영시간",
    audits: "관람등급",
    nations: "제작국가",
    directors: "감독",
    genres: "장르",
    companys: "배급사",
  };

  //json 데이터 가져오기
  const mvinfo = probs.m.movieInfoResult.movieInfo;

  // //화면에 출력할 정보를 오브젝트 생성
  let myinfo = {};
  const key1 = ["movieNm", "movieCd", "openDt", "prdtStatNm", "showTm"];
  const key2 = ["audits", "nations", "directors", "genres", "companys"];

  //key1에 해당하는 값추출
  for (let k of key1) {
    myinfo[keys[k]] = mvinfo[k];
  }

  // //key2에 해당하는 값추출 : 배열에서 추출
  for (let k of key2) {
    switch (k) {
      case "audits":
        myinfo[keys[k]] = mvinfo[k].map((item) => item.watchGradeNm);
        break;
      case "nations":
        myinfo[keys[k]] = mvinfo[k].map((item) => item.nationNm);
        break;
      case "directors":
        myinfo[keys[k]] = mvinfo[k].map((item) => item.peopleNm);
        break;
      case "genres":
        myinfo[keys[k]] = mvinfo[k].map((item) => item.genreNm);
        break;
      default:
        myinfo[keys[k]] = mvinfo[k].filter(
          (item) => item.companyPartNm === "배급사"
        );
        myinfo[keys[k]] = myinfo[keys[k]].map((item) => item.companyNm);
        break;
    }
  }

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleReservation = () => {
    alert(`${myinfo["영화명"]} 예매 페이지로 이동합니다!`);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "미정";
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  //useEffect Hook : 컴포넌트 생성시 한번 발생
  useEffect(() => {}, []);

  return (
    <div className="movie-detail-container">
      {/* 박스오피스로 돌아가기 버튼 */}

      {/* 영화 포스터 및 기본 정보 */}
      <div className="movie-hero-section">
        <div className="movie-poster-large">
          <div className="poster-placeholder-large">🎬</div>
          <div className="movie-badges-large">
            <span className="badge-large rating-badge">
              {myinfo["관람등급"]?.[0] || "전체"}
            </span>
            <span className="badge-large genre-badge">
              {myinfo["장르"]?.[0] || "드라마"}
            </span>
          </div>
        </div>

         <div className="movie-basic-info">
           <div className="movie-title-container">
             <h1 className="movie-title-large">{myinfo["영화명"]}</h1>
             <button
               className="back-to-boxoffice-btn"
               onClick={() => window.history.back()}
             >
               <span className="back-icon">🏠</span>
             </button>
           </div>
          <div className="movie-meta-large">
            <div className="meta-item-large">
              <span className="meta-icon">📅</span>
              <span className="meta-label">개봉일</span>
              <span className="meta-value">
                {formatDate(myinfo["개봉일자"])}
              </span>
            </div>
            <div className="meta-item-large">
              <span className="meta-icon">⏱️</span>
              <span className="meta-label">상영시간</span>
              <span className="meta-value">{myinfo["상영시간"]}분</span>
            </div>
            <div className="meta-item-large">
              <span className="meta-icon">🌍</span>
              <span className="meta-label">제작국가</span>
              <span className="meta-value">
                {myinfo["제작국가"]?.join(", ") || "미정"}
              </span>
            </div>
          </div>

          <div className="movie-actions-large">
            <button
              className={`like-button-large ${isLiked ? "liked" : ""}`}
              onClick={handleLike}
            >
              ❤️ {likeCount.toLocaleString()}
            </button>

            <button
              className="reservation-button-large"
              onClick={handleReservation}
            >
              🎫 예매하기
            </button>
          </div>
        </div>
      </div>

      {/* 상세 정보 카드들 */}
      <div className="movie-details-grid">
        <div className="detail-card">
          <div className="card-header">
            <span className="card-icon">🎭</span>
            <h3>영화 정보</h3>
          </div>
          <div className="card-content">
            <div className="info-row">
              <span className="info-label">영화코드</span>
              <span className="info-value">{myinfo["영화코드"]}</span>
            </div>
            <div className="info-row">
              <span className="info-label">제작상태</span>
              <span className="info-value">{myinfo["제작상태"]}</span>
            </div>
          </div>
        </div>

        <div className="detail-card">
          <div className="card-header">
            <span className="card-icon">🎬</span>
            <h3>제작진</h3>
          </div>
          <div className="card-content">
            <div className="info-row">
              <span className="info-label">감독</span>
              <span className="info-value">
                {myinfo["감독"]?.join(", ") || "미정"}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">배급사</span>
              <span className="info-value">
                {myinfo["배급사"]?.join(", ") || "미정"}
              </span>
            </div>
          </div>
        </div>

        <div className="detail-card">
          <div className="card-header">
            <span className="card-icon">🏷️</span>
            <h3>장르 & 등급</h3>
          </div>
          <div className="card-content">
            <div className="info-row">
              <span className="info-label">장르</span>
              <span className="info-value">
                {myinfo["장르"]?.join(", ") || "미정"}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">관람등급</span>
              <span className="info-value">
                {myinfo["관람등급"]?.join(", ") || "미정"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MvInfo;
