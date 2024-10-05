import './header.css'

export const Header = ({ setIsSidebarOpen, isSidebarOpen }) => {
  return (
    <header className="header">
      <div className="header__nav">
        <ul className="header__items">
          <li className="header__item">
            <button className="header__item-panelIcon" onClick={setIsSidebarOpen}>
              <svg
                width="28"
                height="20"
                viewBox="0 0 28 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M8.66667 2H26M8.66667 10H26M8.66667 18H26M2 2H2.01333M2 10H2.01333M2 18H2.01333" stroke={isSidebarOpen ? "black" : "green"} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </li>
          <li className="header__item">
            <button className="header__item-panelText" onClick={() => setIsSidebarOpen()}>Административная панель</button>
          </li>
          <li className="header__item-login">
            <button>Выйти</button>
          </li>
        </ul>
      </div>
    </header>
  )
}