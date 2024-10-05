import './sidebar.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const adminMenu = [
  { name: 'Продукты', path: '/products' },
  { name: 'Договоры', path: '/contracts' },
  { name: 'Агенты', path: '/agents' },
  { name: 'Контрагенты', path: '/counterparties' }
]


export const Sidebar = ({setIsSidebarOpen}) => {
  const [isActive, setIsActive] = useState(null)
  const navigate = useNavigate()

  const handleClick = (index, path) => {
    setIsActive(prev => prev === index ? null : index)
    navigate(path)
    setIsSidebarOpen(false)
  }
  return (
    <div className="container__sidebar">
      <div className="sidebar__nav">
        <ul className="sidebar__items">
          {adminMenu.map((item, index) => (
            <li className={`sidebar__item ${isActive === index ? 'active' : ''}`} key={index} >
                <button
                  className={`sidebar__item-${item.name.toLocaleLowerCase().replace(/[ ]/g, '-')} for-before-icon`}
                  onClick={() => handleClick(index, item.path)}
                >
                  {item.name}
                </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}