export function Footer ()
{
    return (
       <footer>
        <div className="main-footer-content">
          <div>
            <img className="logo" src="images/logo.jpeg" alt="logo.jpeg"/>
            <div className="services-desc">Дружелюбное описание услуг</div>
          </div>

          <div className="contacts">
            <div className="contacts-label">КОНТАКТЫ</div>
            <div className="address">&#128205; ул.Садовая, 15, Москва</div>
            <div className="phone">&#9742; +7(495)123-45-67</div>
          </div>
          <div className="op-hours">
            <div className="op-hours-label">РЕЖИМ РАБОТЫ</div>
            <div className="op-hours-content">Пн-Пт: 9:00 - 21:00<br/>Сб-Вс: 10:00 - 19:00</div>
          </div>
        </div>
        <div className="line"></div>
        <div className="add-footer-content">
          <div className="copyright">&#169; Все прав защищены</div>
          <div className="conf-policy">Политика конфиденциальности</div>
        </div>
      </footer> 
    );
}