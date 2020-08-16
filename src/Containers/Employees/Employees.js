import React, { Component } from 'react';
import withErrorHandler from '../../Components/hoc/withErrorHandler/withErrorHandler';
import axios from 'axios';
import Employee from '../../Components/Employee/Employee';
import {withRouter} from 'react-router';
import Auxiliary from '../../Components/hoc/Auxiliary';
import classes from './Employees.css'
import Spinner from '../../Components/UI/Spinner/Spinner3';
import { connect } from 'react-redux';
class Employees extends Component
{
    state={
        Employees:null,
        dataloaded:false,
        datanull:true
    }
    componentDidMount()
    {
        axios.get("https://custom-menu-generator.firebaseio.com/Employees.json?auth="+this.props.token).then(res=>
            {
                if(res.data===null)
                {
                    this.setState({datanull:true,dataloaded:true})
                }
                else{this.setState({Employees:res.data,dataloaded:true,datanull:false})}
            }).catch(err=>
                {
                    console.log(err)
                })
    }
    goHome=()=>
    {
        this.props.history.push("/admin-panel")
    }
    render()
    {   let list = null
        if(this.state.dataloaded && !this.state.datanull)
        {
            list = Object.entries(this.state.Employees).map(emp=>
                {
                    console.log(emp)
                    return(<Employee data={emp[1]} key={emp[0]} />)
                }
            )
        }
        return(
            <Auxiliary>
            <h3 className={classes.Header} >Admin Panel</h3>
            <button className={classes.Link} onClick={this.goHome}>Go Back</button>
            {this.state.dataloaded?
                this.state.datanull?
                <div className={classes.Message}>
                    <p>Sorry Employee data not found</p>
                </div>:
               <div>
                {list}
                </div>
            :
            <div className={classes.Spinner}>
                <Spinner/>
            </div>}
            </Auxiliary>
        )
    }
}
const mapStatetoProps = state => {
    return {
        token: state.auth.token
    }
}
export default connect(mapStatetoProps)(withRouter(withErrorHandler(Employees,axios)));