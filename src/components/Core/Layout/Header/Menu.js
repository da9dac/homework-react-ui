import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav } from 'react-bootstrap';
import '../../../../App.css';

const Menu = () => {
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:12400/menu/bi/menu/side')
      .then(response => {
        const data = response.data;
        setMenuData(data);
      })
      .catch(error => alert(error));
  }, []);

  const buildMenu = (uprMenuId) => {
    const items = menuData.filter(item => item.uprMenuId === uprMenuId && item.useYn === 'Y')
                          .sort((a, b) => a.sort - b.sort);
  
    if (items.length === 0) {
      return null; 
    }

    return (
      <ul className='nav nav-pills nav-stacked'>
        {items.map(item => (
          <li key={item.menuId} className='nav-item'>
            <a href={item.url} className='nav-link'>{item.menuNm}</a>
            {buildMenu(item.menuId)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <Navbar className="navbar-default navbar-fixed-top" expand="lg" bg="light">
        <Container fluid>
          <div class="navbar-header">
              <a class="navbar-brand" href="/">타임리프 -{'>'} 리액트 과제</a>
          </div>
        </Container>
      </Navbar>
      <div id="sideBar" className="sidebar">
        {buildMenu(-1)}
      </div>
    </>
  );
};

export default Menu;
