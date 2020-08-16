import React, { Component } from 'react';
import Modal from '../../UI/Modal/Modal';
import Auxilliary from '../Auxiliary';

const withErrorHandler = (WrappedComponenet,axios) =>
{
    return class extends Component
    {
        state = {
            Error : null,
        }

        UNSAFE_componentWillMount()
        {
            this.requestInterceptor = axios.interceptors.request.use( req =>
                {
                    this.setState({Error:null})
                    return req;
                });
            this.resInterceptors = axios.interceptors.response.use(res=>res, 
                error => {
                    this.setState({Error:error})
                });
        }
        componentWillUnmount ()
        {
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.resInterceptors);
        }
        errorConfirmedHandler = () =>
        {
            this.setState({Error:null});
        }

        render(){
        return(
            <Auxilliary>
                <Modal show ={this.state.Error} modalClosed ={this.errorConfirmedHandler}>Oops!!! Something went wrong!<br/>{this.state.Error ? this.state.Error.message : null}</Modal>
                <WrappedComponenet {...this.props}/>
        </Auxilliary>
        )
    }
    }
}

export default withErrorHandler;