import React, { Component } from 'react';
import classes from './Menus.css';
import AdminMenu from '../../../Components/AdminMenu/AdminMenu';
import axios from 'axios';
import Spinner from '../../../Components/UI/Spinner/Spinner3';
import Auxiliary from '../../../Components/hoc/Auxiliary';
import WithErrorHandler from '../../../Components/hoc/withErrorHandler/withErrorHandler';
import { withRouter } from 'react-router';
import Modal from '../../../Components/UI/Modal/Modal';
import Button from '../../../Components/UI/Button/Button';
import { connect } from 'react-redux';
class Menus extends Component {
    state = {
        menu: [],
        dataloaded: false,
        showdeletemodal: false,
        showeditmodal:false,
        menuNo:null,
        editItem:null,
        specialmenu:[],
        specialdataloaded:false,
        specialnull:false,
        menunull:false,
        showspecialdeletemodal:false,
        showspecialeditmodal:false
    }
    componentDidMount() {
        axios.get('https://custom-menu-generator.firebaseio.com/Menus.json').then(
            response => {
                if(response.data===null)
                {
                    this.setState({dataloaded:true,menunull:true})
                }
                else
                {
                    this.setState({ menu: response.data, dataloaded: true,menunull:false })
                }
            }
        ).catch(
            error => {
                this.setState({ dataloaded: false })
                console.log(error)
            }
        )
        axios.get('https://custom-menu-generator.firebaseio.com/SpecialMenus/.json').then(
            res => {
                if(res.data===null)
                {
                    this.setState({ specialdataloaded: false,specialnull:true })
                }
                else{
                this.setState({ specialmenu: res.data, specialdataloaded: true,specialnull:false })}
            }
        ).catch(
            error => {
                this.setState({ specialdataloaded: false })
            }
        )
    }
    showmodal = (menuno) => {
        this.setState({ showdeletemodal: true ,menuNo:menuno})
    }
    showspecialmodal = (menuno) => {
        this.setState({ showspecialdeletemodal: true, menuNo: menuno })
    }
    closemodal = () => {
        this.setState({ showdeletemodal: false })
    }
    closemodal = () => {
        this.setState({ showspecialdeletemodal: false })
    }
    showeditmodal=(menuno)=>
    {
        this.setState({ showeditmodal: true, editItem: menuno })
    }
    closeeditmodal = () => {
        this.setState({ showspecialeditmodal: false })
    }
    showspecialeditmodal=(menuno)=>
    {
        this.setState({ showspecialeditmodal: true, editItem: menuno })
    }
    closespecialeditmodal = () => {
        this.setState({ showspecialeditmodal: false })
    }
    DeleteMenu=()=>
    {
        let deleteLocation = null
        Object.entries(this.state.menu).map(el=>
            {
                if(el[1].id===this.state.menuNo)
                {
                    deleteLocation = el[0]
                }
                return null;
            })
        axios.delete("https://custom-menu-generator.firebaseio.com/Menus/"+deleteLocation+"/.json?auth="+this.props.token).then(
            res=>
            {
                this.setState({showdeletemodal:false})
            }
        ).catch(err=>
            {
                console.log(err)
            })
    }
    DeleteSpecialMenu = () => {
        let deleteLocation = null
        Object.entries(this.state.specialmenu).map(el => {
            if (el[1].id === this.state.menuNo) {
                deleteLocation = el[0]
            }
            return null;
        })
        axios.delete("https://custom-menu-generator.firebaseio.com/SpecialMenus/" + deleteLocation + "/.json?auth="+this.props.token).then(
            res => {
                this.setState({ showspecialdeletemodal: false })
                this.props.history.push("/")
                this.props.history.push("/admin-menus")
            }
        ).catch(err => {
            console.log(err)
        })
    }
    EditMenu=()=>
    {
        let editlocation = null
        Object.entries(this.state.menu).map(el => {
            if (el[1].id === this.state.editItem) {
                editlocation = el[0]
            }
            return null;
        })
        let query = encodeURIComponent("menu no")+"="+encodeURIComponent(editlocation)
        this.props.history.push({
            pathname:"/edit-menu",
            search:"?"+query
        })
    }
    EditSpecialMenu = () => {
        let editlocation = null
        Object.entries(this.state.specialmenu).map(el => {
            if (el[1].id === this.state.editItem) {
                editlocation = el[0]
            }
            return null;
        })
        let query = encodeURIComponent("menu no") + "=" + encodeURIComponent(editlocation)
        this.props.history.push({
            pathname: "/edit-special-menu",
            search: "?" + query
        })
    }
    goHome=()=>
    {
        this.props.history.push("/admin-panel")
    }
    render() {
        let menu =null
        let specialmenu = null
        if (this.state.dataloaded) {
            let menuElements = []
            for (let key in this.state.menu) {
                menuElements.push({ ...this.state.menu[key] })
            }
            menu = menuElements.map(item => {
                return (<AdminMenu data={item} key={item.id} Edit={this.showeditmodal} Delete={this.showmodal}/>)
            })}
        if(this.state.specialdataloaded)
        {
            let specialmenuElements = []
            for (let key in this.state.specialmenu) {
                specialmenuElements.push({ ...this.state.specialmenu[key] })
            }
            specialmenu = specialmenuElements.map(item => {
                return (<AdminMenu data={item} key={item.id} Edit={this.showspecialeditmodal} Delete={this.showspecialmodal} />)}) 
        }
        return (
            <Auxiliary>
                <button className={classes.Link} onClick={this.goHome}>Go Back</button>
                <Modal show={this.state.showdeletemodal} modalClosed={this.closeModal}>
                <p>Are you sure you want to delete it?</p>
                <Button btnType="Success" clicked={this.closemodal}>Cancel</Button>
                <Button btnType="Danger" clicked={this.DeleteMenu}>Delete</Button>
                </Modal>
                <Modal show={this.state.showspecialdeletemodal} modalClosed={this.closeModal}>
                    <p>Are you sure you want to delete it?</p>
                    <Button btnType="Success" clicked={this.closemodal}>Cancel</Button>
                    <Button btnType="Danger" clicked={this.DeleteSpecialMenu}>Delete</Button>
                </Modal>
                <Modal show={this.state.showeditmodal} modalClosed={this.closeeditmodal}>
                    <p>Are you sure you want to edit it?</p>
                    <Button btnType="Danger" clicked={this.closeeditmodal}>Cancel</Button>
                    <Button btnType="Success" clicked={this.EditMenu}>Edit</Button>
                </Modal>
                <Modal show={this.state.showspecialeditmodal} modalClosed={this.closespecialeditmodal}>
                    <p>Are you sure you want to edit it?</p>
                    <Button btnType="Danger" clicked={this.closespecialeditmodal}>Cancel</Button>
                    <Button btnType="Success" clicked={this.EditSpecialMenu}>Edit</Button>
                </Modal>
                {this.state.dataloaded ? 
                <Auxiliary>
                <h1 className={classes.Heading}>Current menus are: </h1> 
                <div className={classes.Menus}>
                    {menu}
                </div>
                </Auxiliary>
                : 
                this.state.menunull?<div className={classes.Menus}>
                    <p>Sorry no menus found</p>
                    <p>Please create some menus</p>
                </div>:
                <div className={classes.Spinner}><Spinner /></div>}
                {
                        this.state.specialdataloaded?
                        <Auxiliary><h1 className={classes.Heading}>Current special menus are: </h1>
                            <div className={classes.Menus}>
                                {specialmenu}
                            </div>
                        </Auxiliary>
                        :
                        this.state.specialnull ? null : <div className={classes.Spinner}><Spinner /></div>}
            </Auxiliary>
        )
    }
}


const mapStatetoProps = state => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStatetoProps)(withRouter(WithErrorHandler(Menus,axios)));