import { Link } from "react-router-dom";
import { useState } from "react";
import './MovieCard.css';

const MovieCard = ({ movie, isSearchResult = false }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 5000) + 100);

  const formatNumber = (num) => {
    return parseInt(num).toLocaleString();
  };

  const getRankIcon = (rank) => {
    if (rank <= 3) return '🏆';
    if (rank <= 10) return '🥈';
    return '🎬';
  };

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleReservation = (e) => {
    e.preventDefault();
    e.stopPropagation();
    alert(`${movie.movieNm} 예매 페이지로 이동합니다!`);
  };


  return (
    <div className={`movie-card ${isSearchResult ? 'search-result' : ''}`}>
      {!isSearchResult && (
        <div className="rank-section">
          <span className="rank-icon">{getRankIcon(movie.rank)}</span>
          <span className='rank-number'>{movie.rank}</span>
        </div>
      )}
      
      <div className="movie-poster">
        <div className="poster-placeholder">
          🎬
        </div>
        <div className="movie-badges">
          {isSearchResult ? (
            <span className="badge mega-only">MEGA ONLY</span>
          ) : (
            <span className="badge rank-badge">#{movie.rank}</span>
          )}
        </div>
      </div>
      
      <div className="movie-details">
        <h3 className="movie-title">{movie.movieNm}</h3>
        
        <div className="movie-meta">
          <div className="meta-item">
            <span className="meta-label">순위</span>
            <span className="meta-value">#{movie.rank}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">점유율</span>
            <span className="meta-value">{movie.salesShare}%</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">관객수</span>
            <span className="meta-value">{formatNumber(movie.audiAcc)}명</span>
          </div>
        </div>
        
        <div className="movie-actions">
          <button 
            className={`like-button ${isLiked ? 'liked' : ''}`}
            onClick={handleLike}
          >
            ❤️ {likeCount.toLocaleString()}
          </button>
          
          <button 
            className="reservation-button"
            onClick={handleReservation}
          >
            예매
          </button>
        </div>
      </div>
      
      <Link 
        to={`/mv?mvcd=${movie.movieCd}`} 
        className="movie-card-link"
      >
        <span className="sr-only">영화 상세보기</span>
      </Link>
    </div>
  );
};

export default MovieCard;