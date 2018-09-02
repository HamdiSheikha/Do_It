import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
    <div class = "bodyDiv">
    <div class="backgroundDiv">

    <div class="container">

    	<div  class="error">
    		<p class="p">4</p>
    		<span class="dracula">
    			<div class="con">
    				<div class="hair"></div>
    				<div class="hair-r"></div>
    				<div class="head"></div>
        		<div class="eye"></div>
        		<div class="eye eye-r"></div>
      			<div class="mouth"></div>
      			<div class="blod"></div>
      			<div class="blod blod2"></div>
    			</div>
    		</span>
    		<p class="p">4</p>

    		<div class="page-ms">
    			<p class="page-msg"> Oops, the page you're looking for Disappeared </p>
    			<a href="http://localhost:8080/"><button class="go-back">Go Back</button></a>
    		</div>
    </div>
    	</div>
      </div>
      </div>

);

export default NotFound;
