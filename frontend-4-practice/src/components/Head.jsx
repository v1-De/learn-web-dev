export function Head ()
{
    return (
        <header>
        <div className="navbar">
            <img className="logo" src="images/logo.jpeg" alt="logo.jpeg"/>
            <nav className="nav-list">
              <a className="nav-list-item" href="#">Услуги</a>
              <a className="nav-list-item" href="#">Галерея</a>
              <a className="nav-list-item" href="#">Команда</a>
              <a className="nav-list-item" href="#">Отзывы</a>
              <a className="nav-list-item" href="#">Контакты</a>
            </nav>
        </div>
        <div className="step-indicator">
            <div className="step-item completed">
              <div className="circle">1</div>
              <span className="step-item-label">Выбор специалиста</span>
            </div>
            <div className="step-line"></div>
            <div className="step-item completed">
              <div className="circle">2</div>
              <span className="step-item-label">Выбор услуг</span>
            </div>
            <div className="step-line"></div>
            <div className="step-item current">
              <div className="circle">3</div>
              <span className="step-item-label">Выбор даты</span>
            </div>
            <div className="step-line"></div>
            <div className="step-item">
              <div className="circle">4</div>
              <span className="step-item-label">Ваши контакты</span>
            </div>
            <div className="step-line"></div>
            <div className="step-item">
              <div className="circle">5</div>
              <span className="step-item-label">Подвтерждение</span>
            </div>
        </div>
      </header>
    );
}