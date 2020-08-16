import React, { Component } from 'react';
import classes from './Home.css';
import Slider from '../../Components/UI/Slider/Slider';
import ScrollButton from 'react-scroll-button';
import Auxilliary from '../../Components/hoc/Auxiliary';
import Menu from '../../Components/Menu/Menu';
import l1 from '../../Assets/Images/Logos/1.png';
import l2 from '../../Assets/Images/Logos/2.png';
import l3 from '../../Assets/Images/Logos/3.png';
class Home extends Component
{
    render()
    {
        const scrollToMenu = () =>
        {
            let elmnt = document.getElementById("Menu");
            let y = elmnt.getBoundingClientRect().top + window.pageYOffset+-30;
            window.scrollTo(0,y);
        }
        return(
            <Auxilliary>
            <div className={classes.Home}>
            <h1 id="Home">Welcome to Planet 51</h1>
            <button className={classes.MenuButton} onClick={scrollToMenu}>Browse Menu</button>
            <ScrollButton targetId="Home" behavior={'smooth'} buttonBackgroundColor={'#962523'} iconType={'arrow-up'} style={{ fontSize: '24px' ,zIndex:'500'}}>Browse Menu</ScrollButton>         
            <Slider />  
            </div>
            <div className={classes.Menu} id = "Menu">
            <Menu />
            </div>
            <div className={classes.Contact}>
            <div className={classes.frst}>
                <p>Contact Us</p>
                <li>Address: ABCD</li>
                <li>Contact Number: 01********</li>
                <li>Email: contact@planet51.com</li>
            </div>
            <div className ={classes.scnd}>
                <p className={classes.Para}>For online orders please contact below services</p>
                <img className={classes.Logos} src = {l1} alt="Pathao"/>
                <img className={classes.Logos} src = {l2} alt="Food Panda"/>
                <img className={classes.Logos} src = {l3} alt="Uber Eats"/>
            </div>
            </div>
            </Auxilliary>
        )
    }
}

export default Home;