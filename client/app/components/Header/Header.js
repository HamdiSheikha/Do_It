import React from 'react';

import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <div class="menu-nav">
  <div class="navigation-bar">
    <ul>
      <li class="li-header"><a href="/" class="navbarLogo"><span >Sign In</span></a></li>
      <li class="li-header"><a href="/signup" class="navbarSignUp"><span>Sign Up</span></a></li>

    </ul>
  </div>
</div>
      </header>
);

export default Header;
