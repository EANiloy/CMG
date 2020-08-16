import React, { Component } from 'react';
import Button from '../../Components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../axios-orders';
import Spinner from '../../Components/UI/Spinner/Spinner';
import Input from '../../Components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../Components/hoc/withErrorHandler/withErrorHandler';
import Auxiliary from '../../Components/hoc/Auxiliary';
import Modal from '../../Components/UI/Modal/Modal';
import * as orderActions from '../../Store/actions/order';
import {withRouter} from 'react-router';
import {checkValidity} from '../../Shared/Utility';
class ContactData extends Component
{
    state = {
        order:false,
        orderForm: {
                TableNo : {
                    elementType : 'select',
                    elementConfig: {
                        options:[
                                    { value: 'Please Choose Your Table No.', displayvalue: 'Please Choose Your Table No.'},
                                    {value: 'Table 1', displayvalue:'Table 1'},
                                    {value: 'Table 2', displayvalue:'Table 2'},
                                    {value: 'Table 3', displayvalue:'Table 3'},
                                    {value: 'Table 4', displayvalue:'Table 4'},
                                    {value: 'Table 5', displayvalue:'Table 5'}]},
                    valid:false,
                    validation:{
                        required:true
                    }
                },
                Name : {
                    elementType : 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Enter Your Name'
                    },
                    value: '',
                    validation : {
                        required:true,
                        isName:true
                    },
                    valid:false
                },
                PhnNo : {
                    elementType : 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Enter Your Phone Number'
                    },
                    value: '',
                    validation : {
                        required:true,
                        minLength:11,
                        maxLength:11,
                        isPhnNo:true
                    },
                    valid:false,
                },
        },
        loading:false,
        formIsValid:false,
        countMin:3,
        countSec:"00",
        show:false,
        id:0
    }
    
    orderHandler = (event) =>
    {
        const formData = {};
        for(let formElementIndentifier in this.state.orderForm)
        {
            formData[formElementIndentifier] = this.state.orderForm[formElementIndentifier].value
        }
        this.setState({loading:true});
        let TN = ''+formData.TableNo
        let CN = ''+formData.Name
        let day = new Date();
        let date = (day.getDate() + "/" + day.getMonth() + "/" + day.getFullYear());
        const id = Date.now();
        let order = {
            information: formData,
            orderinfo: this.props.order,
            date:date,
            id:id
        }
        axios.post('/Orders/'+TN+'/'+CN+'.json', order).then(
            response => {
                this.setState({ loading: false ,order:true,id:id});
            })
            .catch(error =>
                this.setState({ loading: false })
            )
    }



    inputChangedHandler = (event, inputIdentifier) =>
    {
     const clonedOrderForm = {
         ...this.state.orderForm
     };
     const updatedOrderForm = {...clonedOrderForm[inputIdentifier]};
     updatedOrderForm.value = event.target.value;
     updatedOrderForm.valid = checkValidity(updatedOrderForm.value,updatedOrderForm.validation)
     updatedOrderForm.touched = true;
     clonedOrderForm[inputIdentifier] = updatedOrderForm;


     let formIsValid = true;
     for(let inputIdentifier in clonedOrderForm)
     {
         formIsValid=clonedOrderForm[inputIdentifier].valid && formIsValid;
     }

     this.setState({orderForm:clonedOrderForm,formIsValid:formIsValid})
    }

    closeModal =() =>
    {
        this.setState({order:false})
        window.location.replace("/home")
    }
    openModal = ()=>
    {
        this.setState({order:true})
    }
    gotoOrders = () =>
    {
        clearInterval(this.myInterval);
        this.props.resetTimer();
        this.props.history.push("/my-orders")
    }
    startTimer = (event) =>
    {
        this.setState({formIsValid:false,show:true})
        event.preventDefault();
            this.myInterval = setInterval(() => {
                if (this.props.countmin === 0) {
                    this.props.resetTimer();
                    clearInterval(this.myInterval)
                    this.orderHandler();
                }
                this.props.onConfirmed();
                this.setState({ countMin: this.props.countmin, countSec: this.props.countsec })
            }, 1000)
    }
    componentWillUnmount()
    {
        clearInterval(this.myInterval)
        this.props.resetTimer();
    }
    render()
    {
         const formElementsAray = [];
         for (let key in this.state.orderForm)
         {
             formElementsAray.push({
                 id:key,
                 config: this.state.orderForm[key]
             });
         }
        let form = (
            <Auxiliary>
                <Modal show ={this.state.order} modalClosed={this.closeModal}>
                <h3>Congratulations!</h3>
                <p>Your order has been placed successfully.</p>
                <p>Your order ID is: {this.state.id}</p>
                <p>Please keep the id for future reference</p>
                <p>Please wait while we prepare your order.</p>
                <p>Thank you for patience.</p>
                <Button btnType="Success" clicked={this.closeModal}>Done</Button>
                </Modal>
                <form onSubmit={this.startTimer}>
                    {
                        formElementsAray.map(formElement =>(
                            <Input 
                            key ={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            changed={(event)=>this.inputChangedHandler(event, formElement.id)}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            invalid={!formElement.config.valid}
                            />
                        ))
                    }
                    <Button btnType = "Success" disabled={!this.state.formIsValid}>Order</Button>
                </form>
            </Auxiliary>
        );
        if(this.state.loading)
        {
            form = <Spinner />;
        }
        return(
            <Auxiliary>
            <div className = {classes.ContactData}>
                <h4>Enter Your contact Data</h4>
                {form}
            </div>
            {this.state.show?<div className={classes.Timer}>
                <p>Your order will be placed after {this.state.countMin}:{this.state.countSec} minutes.</p>
                <p>Do you want to cancel it?</p>
                <p>Press 'confirm order' to place your order immediately</p>
                <button className={classes.Cancel} onClick={this.gotoOrders}>Cancel Order</button>
                <button className={classes.Order} onClick={this.orderHandler}>Confirm Order</button>
            </div>:null}
            </Auxiliary>
        );
    }
}

const mapStateToProps = state =>
{
    return{
        order:state.cart.orders,
        countmin: state.cart.countmin,
        countsec: state.cart.countsec
    }
}
const mapDispatchToProps = dispatch =>
{
    return{
        onConfirmed: () => dispatch({ type: orderActions.REDUCE_TIMER }),
        resetTimer: () => dispatch({ type: orderActions.RESET_TIMER })
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withErrorHandler(ContactData,axios)));