import React, { Component, PropTypes } from 'react'

import { injectStripe, PaymentRequestButtonElement } from 'react-stripe-elements'

class PaymentRequestForm extends Component {

    constructor(props) {
        super(props);

        const paymentRequest = props.stripe.paymentRequest({
            country: 'US',
            currency: 'usd',
            total: {
                label: props.label,
                amount: props.amount,
            },
        });

        paymentRequest.on('token', ({ complete, token, ...data }) => {
            //console.info('Received Stripe token: ', token);
            
            //console.info('Received customer information: ', data);
            this.props.catchUserInfo({token, ...data});
            complete('success');
        });

        paymentRequest.canMakePayment().then((result) => {
            this.setState({ canMakePayment: !!result });
        });

        this.state = {
            canMakePayment: false,
            paymentRequest,
        };
    }

    handleBlur() {
        console.info('[blur]');
    }
    handleChange(change) {
        console.info('[change]', change);
    }
    handleClick() {
        console.info('[click]');
    }
    handleFocus() {
        console.info('[focus]');
    }
    handleReady() {
        console.info('[ready]');
    }


    render() {
        return this.state.canMakePayment ? (
            <PaymentRequestButtonElement
                className="PaymentRequestButton"
                onBlur={this.handleBlur}
                onClick={this.handleClick}
                onFocus={this.handleFocus}
                onReady={this.handleReady}
                paymentRequest={this.state.paymentRequest}
                style={{
                    paymentRequestButton: {
                        theme: 'light',
                        type: 'buy',
                    },
                }}
            />
        ) : null;
    }
}

export default injectStripe(PaymentRequestForm);