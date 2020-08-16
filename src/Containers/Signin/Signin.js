import React, { Component } from 'react';
import {connect} from 'react-redux';
import Button from '../../Components/UI/Button/Button';
import Input from '../../Components/UI/Input/Input';
import Auxiliary from '../../Components/hoc/Auxiliary';
import Spinner from '../../Components/UI/Spinner/Spinner';
import classes from './Signin.css';
import {withRouter} from 'react-router';
import * as actions from '../../Store/actions/index';
import Modal from '../../Components/UI/Modal/Modal';
import {Redirect} from 'react-router-dom';
import {checkValidity} from '../../Shared/Utility';
class Signin extends Component
{
    state = {
        signinInfo:{
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail:true,
                    touched:false
                },
                valid: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Enter Your Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength:8,
                    maxLength:16,
                    touched:false
                },
                valid: false
            },
        },
            formIsValid:false,
            loading:false,
            errmsg:null,
            error:false
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const clonedsignInInfo = {
            ...this.state.signinInfo
        };
        const updatedsignInInfo = { ...clonedsignInInfo[inputIdentifier] };
        updatedsignInInfo.value = event.target.value;
        updatedsignInInfo.valid = checkValidity(updatedsignInInfo.value, updatedsignInInfo.validation)
        updatedsignInInfo.touched = true;
        clonedsignInInfo[inputIdentifier] = updatedsignInInfo;


        let formIsValid = true;
        for (let inputIdentifier in clonedsignInInfo) {
            formIsValid = clonedsignInInfo[inputIdentifier].valid && formIsValid;
        }

        this.setState({ signinInfo: clonedsignInInfo, formIsValid: formIsValid })
    }
    gotoPanel =(event) =>
    {
        event.preventDefault();
        const formData = {};
        for (let formElementIndentifier in this.state.signinInfo) {
            formData[formElementIndentifier] = this.state.signinInfo[formElementIndentifier].value
        }
        this.props.onAuth(this.state.signinInfo.email.value,this.state.signinInfo.password.value)
    }
    closeModal=()=>
    {
        this.setState({error:false})
        document.location.reload()
    }
    render()
    {
        const formElementsAray = [];
        for (let key in this.state.signinInfo) {
            formElementsAray.push({
                id: key,
                config: this.state.signinInfo[key]
            });
        }
        let form = (
            <Auxiliary>
                <form onSubmit={this.gotoPanel}>
                    {
                        formElementsAray.map(formElement => (
                            <Input
                                key={formElement.id}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                                shouldValidate={formElement.config.validation}
                                touched={formElement.config.touched}
                                invalid={!formElement.config.valid}
                            />
                        ))
                    }
                    <Button btnType="Success" disabled={!this.state.formIsValid}>Signin</Button>
                </form>
            </Auxiliary>
        );
        if (this.props.loading) {
            form = <Spinner />;
        }
        let authRedirect = null
        if(this.props.isAuthenticated){
            if (this.props.userId === "kbvaXgzxkvMtg5K1cWFvDre9pi13")
            {
                authRedirect = <Redirect to="/admin-panel"/>
            }
            else
            {
                authRedirect=<Redirect to="/employee-panel"/>
            }
        }
        return(
            <div className={classes.Signin}>
                {authRedirect}
                <Modal show={this.props.error} modalClosed={this.closeModal}>
                    <h3>Sorry!</h3>
                    <p>Sign in failed</p>
                    <p>Invalid email address or password</p>
                    <p>Please try again.</p>
                    <Button btnType="Success" clicked={this.closeModal}>Close</Button>
                </Modal>
                <h4>Enter Your Sign-in Information</h4>
                {form}
            </div>
        )
    }
}

const mapStatetoProps=state=>
{
    return{
        loading:state.auth.loading,
        error:state.auth.error,
        userId: state.auth.userId,
        isAuthenticated : state.auth.token !==null
    }
}

const mapDispatchtoProps =dispatch=>
{
    return{
        onAuth: (email,password)=> dispatch(actions.signin(email,password))
    }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(withRouter(Signin));