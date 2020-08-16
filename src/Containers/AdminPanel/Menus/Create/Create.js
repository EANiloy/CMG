import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Auxiliary from '../../../../Components/hoc/Auxiliary';
import Modal from '../../../../Components/UI/Modal/Modal';
import Button from '../../../../Components/UI/Button/Button';
import classes from './Create.css'
import axios from 'axios';
import Spinner from '../../../../Components/UI/Spinner/Spinner3';
import { connect } from 'react-redux';
class Create extends Component
{
    state={
        dataloaded: false,
        inputFields: [],
        itemArray: [['','']],
        data:null,
        menuno:null
    }
    componentDidMount()
    {
        axios.get("https://custom-menu-generator.firebaseio.com/Menus/.json").then(res=>
        {
            let menuno = null
                Object.values(res.data).map(el => {
                    menuno = el.id
                    return null;
                })
            menuno = menuno + 1
            this.setState({data:res.data,dataloaded:true,menuno:menuno})
        }).catch(err=>
            {
                this.setState({dataloaded:true,menuno:1})
            })
    }

    createMenu=()=>
    {
        let items = {}

        items = Object.assign(...this.state.itemArray.map(el => {
            return ({ [el[0]]: el[1] })
        }))
        let menu = {}
        menu.id = this.state.menuno
        menu.items = items
        axios.post("https://custom-menu-generator.firebaseio.com/Menus/.json?auth="+this.props.token, menu).then(res => {
            this.setState({ successmsg: true })
        }).catch(err => {
            this.setState({ failedmodal: true, failedmsg: err })
        })
    }


    addItem = () => {
        this.setState({ itemArray: [...this.state.itemArray, ['', '']] })
    }
    itemChangeHandler = (event, index) => {
        let updatedArray = this.state.itemArray
        updatedArray[index][0] = event.target.value
        this.setState({ itemArray: updatedArray })
    }
    itemPriceHandler = (event, index) => {
        let updatedArray = this.state.itemArray
        updatedArray[index][1] = parseInt(event.target.value, 10)
        this.setState({ itemArray: updatedArray })
    }
    showConfirmation = () => {
        this.setState({ confirmation: true })
    }
    closeconfirmModal = () => {
        this.setState({ confirmation: false })
    }
    removeItem = (index) => {
        let newArray = this.state.itemArray
        newArray.splice(index, 1)
        this.setState({ itemArray: newArray })
    }
    goHome = () => {
        this.props.history.push("/admin-panel")
    }
    closeSuccessModal = () => {
        this.setState({ successmsg: false })
        this.props.history.push("/admin-menus")
    }
    closeFailedModal = () => {
        this.setState({ failedmodal: false })
    }
    createMore=()=>
    {
        document.location.reload();
    }
    render()
    {
        let inputFields = this.state.itemArray.map((el, index) => {
            return (
                <div className={classes.Items} key={index}>
                    <input className={classes.Input} placeholder="Item Name" type="text" value={el[0]} onChange={(event) => this.itemChangeHandler(event, index)} />
                    <input className={classes.Input} placeholder="Item Price" type="number" value={el[1]} onChange={(event) => this.itemPriceHandler(event, index)} />
                    <button onClick={() => this.removeItem(index)} className={classes.Cross}>X</button></div>
            )
        })
        return(
            <Auxiliary>
                    <button className={classes.Link} onClick={this.goHome}>Go Back</button>
                    <Modal show={this.state.confirmation} modalClosed={this.closeconfirmModal}>
                        <p>Are you sure you want to create it?</p>
                        <Button btnType="Success" clicked={this.closeconfirmModal}>Cancel</Button>
                        <Button btnType="Danger" clicked={this.createMenu}>Create</Button>
                    </Modal>
                    <Modal show={this.state.successmsg} modalClosed={this.closeSuccessModal}>
                        <p>Menu creation successful.</p>
                        <Button btnType="Success" clicked={this.closeSuccessModal}>Go to Menus</Button>
                        <Button btnType="Success" clicked={this.createMore}>Create More</Button>
                    </Modal>
                    <Modal show={this.state.failedmodal} modalClosed={this.closeFailedModal}>
                        <p>Menu creation failed.</p>
                        <p>{this.state.failedmsg}</p>
                        <Button btnType="Danger" clicked={this.closeFailedModal}>Close</Button>
                    </Modal>
                    {this.state.dataloaded?
                    <Auxiliary>
                    <div className={classes.Edit}>
                    <strong><p>Menu No: {this.state.menuno}</p></strong>
                    <div className={classes.Header}><p className={classes.HeaderText1}>Item Name</p>
                        <p className={classes.HeaderText2}>Item Price</p></div>
                        {inputFields}
                    <button className={classes.Add} onClick={this.addItem}>+</button>
                    </div>
                    <button className={classes.Button} onClick={this.showConfirmation}>Create Menu</button>
                    </Auxiliary>:
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
export default connect(mapStatetoProps)(withRouter(Create));