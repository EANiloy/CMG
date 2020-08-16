import React, { Component } from 'react';
import Button from '../../Components/UI/Button/Button';
import Input from '../../Components/UI/Input/Input';
import Auxiliary from '../../Components/hoc/Auxiliary';
import Spinner from '../../Components/UI/Spinner/Spinner';
import classes from './SignUp.css';
import { withRouter } from 'react-router';
import Modal from '../../Components/UI/Modal/Modal';
import withErrorHandler from '../../Components/hoc/withErrorHandler/withErrorHandler';
import axios from 'axios'
import { connect } from 'react-redux';
import {checkValidity} from '../../Shared/Utility';
class SignUp extends Component {
    state = {
        signupInfo: {
            Name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Your Name'
                },
                value: '',
                validation: {
                    required: true,
                    touched: false,
                    isName:true
                },
                valid: false
            },
            Email: {
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
            Password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Enter Your Password'
                },
                value: '',
                validation: {
                    required: true,
                    touched:false,
                    minLength:8,
                    maxLength:16
                },
                valid: false
            },
            ContactNo: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Your Contact Number'
                },
                value: '',
                validation: {
                    required: true,
                    touched: false,
                    minLength:11,
                    maxLength:11,
                    isPhnNo:true
                },
                valid: false
            },
            Address: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Your Address'
                },
                value: '',
                validation: {
                    required: true,
                    touched: false,
                },
                valid: false
            },
            UserType: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    disabled:true,
                    placeholder:"User Type: Employee"
                },
                value: 'Employee',
                validation: {
                    required: true,
                    touched: false,
                },
                valid: true
            }

        },
        formIsValid: false,
        loading: false,
        create:false,
        errormsg:null,
        error:false
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const clonedsignupInfo = {
            ...this.state.signupInfo
        };
        const updatedsignupInfo = { ...clonedsignupInfo[inputIdentifier] };
        updatedsignupInfo.value = event.target.value;
        updatedsignupInfo.valid = checkValidity(updatedsignupInfo.value, updatedsignupInfo.validation)
        updatedsignupInfo.touched = true;
        clonedsignupInfo[inputIdentifier] = updatedsignupInfo;


        let formIsValid = true;
        for (let inputIdentifier in clonedsignupInfo) {
            formIsValid = clonedsignupInfo[inputIdentifier].valid && formIsValid;
        }

        this.setState({ signupInfo: clonedsignupInfo, formIsValid: formIsValid })
    }

    submitData=(event)=>
    {
        event.preventDefault();
        const formData = {};
        for (let formElementIndentifier in this.state.signupInfo) {
            formData[formElementIndentifier] = this.state.signupInfo[formElementIndentifier].value
        }
        this.setState({ loading: true });
        let authData = {
            email : this.state.signupInfo.Email.value,
            password: this.state.signupInfo.Password.value,
            returnSecureToken:true
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAV-_DWAZIv8Ah6Q2kZ3FX11zNKvOZTz5U', authData, {
            validateStatus: function (status) {
                return status < 500;
            }}).then(response=>
                    {
                    if(response.status===200)
                    {
                        axios.post("https://custom-menu-generator.firebaseio.com/Employees.json?auth="+this.props.token, formData).then(res => {
                            this.setState({ create: true })
                        }).catch(err => {
                            this.setState({ create: false, loading: false })
                        })
                    }
                    else{
                        let errormsg = "Email address already exists"
                        this.setState({error:true,errormsg:errormsg})
                    }
                }).catch(err=>
                    {
                        console.log(err)
                    })
        
    }
    closeModal = () => {
        this.setState({ create: false })
        document.location.reload();
    }
    openModal = () => {
        this.setState({ create: true })
    }
    goHome = () => {
        this.props.history.push("/admin-panel");
    }
    render() {
        const formElementsAray = [];
        for (let key in this.state.signupInfo) {
            formElementsAray.push({
                id: key,
                config: this.state.signupInfo[key]
            });
        }
        let form = (
            <Auxiliary>
                <form onSubmit={this.submitData}>
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
                    <Button btnType="Success" disabled={!this.state.formIsValid}>Signup</Button>
                </form>
            </Auxiliary>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <Auxiliary>
            <h3 className={classes.Header} >Admin Panel</h3>
            <button className={classes.Link} onClick={this.goHome}>Go Back</button>
                <Modal show={this.state.create} modalClosed={this.closeModal}>
                    <h3>Congratulations!</h3>
                    <p>New user has been created</p>
                    <p>Please keep the password safe for future use</p>
                    <p>Thank you</p>
                    <Button btnType="Success" clicked={this.closeModal}>Done</Button>
                </Modal>
                <Modal show={this.state.error} modalClosed={this.closeModal}>
                    <h3>Sorry!</h3>
                    <p>New user creation failed</p>
                    <p>{this.state.errormsg}</p>
                    <Button btnType="Success" clicked={this.closeModal}>Close</Button>
                </Modal>
            <div className={classes.Signup}>
                <h4>Enter Your Sign-up Information</h4>
                {form}
            </div>
            </Auxiliary>
        )
    }
}

const mapStatetoProps = state => {
    return {
        token: state.auth.token
    }
}
export default connect(mapStatetoProps)(withRouter(withErrorHandler(SignUp,axios)));