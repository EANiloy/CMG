import React, { Component } from 'react'
import {withRouter} from 'react-router';
import axios from 'axios'
import withErrorHandler from '../../../../Components/hoc/withErrorHandler/withErrorHandler';
import classes from './Edit.css';
import Auxiliary from '../../../../Components/hoc/Auxiliary';
import Modal from '../../../../Components/UI/Modal/Modal';
import Button from '../../../../Components/UI/Button/Button';
import {connect} from "react-redux";
import Spinner from '../../../../Components/UI/Spinner/Spinner3';
class EditSpecial extends Component
{
    state={
        dataloaded:false,
        inputFields:[],
        itemArray:[],
        menuno:null,
        foldername:null,
        successmsg:false,
        failedmodal:false,
        confirmation:false,
        failedmsg:null
    }
    componentDidMount()
    {
        const query = new URLSearchParams(this.props.location.search)
        let menu =null;
        for(let param of query.entries())
        {
            menu=param[1]
        }
        axios.get("https://custom-menu-generator.firebaseio.com/SpecialMenus/"+menu+"/.json").then(res=>
        {
            let menuno = res.data.id
            let itemArray = Object.keys(res.data.items).map(key => {
                return [key, res.data.items[key]]
            })
            this.setState({menu:res.data,dataloaded:true,itemArray:itemArray,menuno:menuno,foldername:menu})
        }).catch(err=>
            {
                this.setState({dataloaded:false})
            })
        
    }
    updateMenu=()=>
    {
        let items = {}
        
        items =Object.assign(...this.state.itemArray.map(el=>
            {
                return ({[el[0]]:el[1]})
            }))
        let menu = {}
        menu.id = this.state.menuno
        menu.items = items
        axios.put("https://custom-menu-generator.firebaseio.com/SpecialMenus/"+this.state.foldername+"/.json?auth="+this.props.token,menu).then(res=>
        {
            this.setState({successmsg:true})
        }).catch(err=>
            {
                this.setState({failedmodal:true,failedmsg:err})
            })
        
    }
    addItem=()=>
    {
        this.setState({itemArray:[...this.state.itemArray,['','']]})
    }
    itemChangeHandler=(event,index)=>
    {
       let updatedArray = this.state.itemArray
       updatedArray[index][0] = event.target.value
        this.setState({itemArray:updatedArray})
    }
    itemPriceHandler =(event,index)=>
    {
        let updatedArray = this.state.itemArray
        updatedArray[index][1] = parseInt(event.target.value,10)
        this.setState({ itemArray: updatedArray })
    }
    showConfirmation=()=>
    {
        this.setState({confirmation:true})
    }
    closeconfirmModal=()=>
    {
        this.setState({confirmation:false})
    }
    removeItem =(index)=>
    {
        let newArray = this.state.itemArray
        newArray.splice(index,1)
        this.setState({itemArray:newArray})
    }
    goHome=()=>
    {
        this.props.history.push("/admin-panel")
    }
    closeSuccessModal=()=>
    {
        this.setState({successmsg:false})
        this.props.history.push("/admin-menus")
    }
    closeFailedModal=()=>
    {
        this.setState({failedmodal:false})
    }
    render()
    {
        return(
            this.state.dataloaded ?
            <Auxiliary>
            <div className={classes.Edit}>
                    <button className={classes.Link} onClick={this.goHome}>Go Back</button>
                    <Modal show={this.state.confirmation} modalClosed={this.closeconfirmModal}>
                        <p>Are you sure you want to update it?</p>
                        <Button btnType="Success" clicked={this.closeconfirmModal}>Cancel</Button>
                        <Button btnType="Danger" clicked={this.updateMenu}>Update</Button>
                    </Modal>
                    <Modal show={this.state.successmsg} modalClosed={this.closeSuccessModal}>
                        <p>Menu updated successfully.</p>
                        <Button btnType="Success" clicked={this.closeSuccessModal}>Close</Button>
                    </Modal>
                    <Modal show={this.state.failedmodal} modalClosed={this.closeFailedModal}>
                        <p>Menu update failed.</p>
                        <p>{this.state.failedmsg}</p>
                        <Button btnType="Danger" clicked={this.closeFailedModal}>Close</Button>
                    </Modal>
                    <strong><p>Menu No: {this.state.menuno}</p></strong>
                    <div className={classes.Header}><p className={classes.HeaderText1}>Item Name</p>
                        <p className={classes.HeaderText2}>Item Price</p></div>
                    {this.state.itemArray.map((el,index)=>
                        {
                            return(
                                <div className={classes.Items} key={index}>
                                <input className={classes.Input} placeholder="Item Name" type="text" value={el[0]} onChange={(event)=>this.itemChangeHandler(event,index)} />
                                <input className={classes.Input} placeholder="Item Price" type="number" value={el[1]} onChange={(event)=>this.itemPriceHandler(event,index)}/>
                                <button onClick={()=>this.removeItem(index)} className={classes.Cross}>X</button></div>
                            )
                        })}
                <button className={classes.Add} onClick={this.addItem}>+</button>
            </div>
            <button className={classes.Button} onClick={this.showConfirmation}>Update Menu</button>
            </Auxiliary>:
            <div className={classes.Spinner}>
                <Spinner/>
            </div>
        )
    }
}
const mapStatetoProps =state=>
{
    return{
        token:state.auth.token
    }
}
export default connect(mapStatetoProps)(withRouter(withErrorHandler(EditSpecial,axios)));