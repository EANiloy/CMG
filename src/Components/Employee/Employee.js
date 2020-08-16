import React from 'react';
import classes from './Employee.css'
const employee =(props)=>
{
    const showPassword =()=>
    {
        let x = document.getElementById(ContactNo)
        if(x.type==="password")
        {
            x.type="text";
        }
        else
        {
            x.type="password"
        }
    }
    let Name = props.data.Name
    let Address = props.data.Address
    let ContactNo = props.data.ContactNo
    let Password = props.data.Password
    let Email = props.data.Email
    return(
        <div className={classes.Employee}>
            <p>Name: {Name}</p>
            <p>ContactNo: {ContactNo}</p>
    <p>Email Address: {Email}</p>
            <p>Address: {Address}</p>
            <p>Password: <input type="password" value={Password} id={ContactNo} readOnly/>
            <input type="checkbox" onClick={showPassword}/></p>
        </div>
    )
}

export default employee;
