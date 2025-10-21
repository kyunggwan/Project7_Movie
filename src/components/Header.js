import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();
  
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          🎬 MovieBox
        </Link>
        
        <nav className="nav">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            영화
          </Link>
          <Link 
            to="/booking" 
            className={`nav-link ${location.pathname === '/booking' ? 'active' : ''}`}
          >
            예매
          </Link>
          <Link 
            to="/cinema" 
            className={`nav-link ${location.pathname === '/cinema' ? 'active' : ''}`}
          >
            극장
          </Link>
          <Link 
            to="/events" 
            className={`nav-link ${location.pathname === '/events' ? 'active' : ''}`}
          >
            이벤트
          </Link>
          <Link 
            to="/store" 
            className={`nav-link ${location.pathname === '/store' ? 'active' : ''}`}
          >
            스토어
          </Link>
          <Link 
            to="/benefits" 
            className={`nav-link ${location.pathname === '/benefits' ? 'active' : ''}`}
          >
            혜택
          </Link>
        </nav>
        
        <div className="header-actions">
          <button className="action-button login-btn">로그인</button>
          <button className="action-button signup-btn">회원가입</button>
          <button className="action-button quick-booking">빠른예매</button>
          <div className="header-icons">
            <button className="icon-button">📅</button>
            <button className="icon-button">👤</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
