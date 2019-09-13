import React from "react";
import Modal from "./Modal";
import { Formik, Field, Form } from "formik";
import { Link } from "react-router-dom";
import Alert from 'react-s-alert';
import { signup, signin } from "./netlify/identity"

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { signinIn } = this.props;
    const action = signinIn ? signin : signup;

    return (
      <Modal title={`${signinIn ? 'Sign in' : 'Sign up'} to see premium content`}>
        <Formik
          initialValues={
            {
              email: '',
              password: ''
            }
          }
          onSubmit={(values, actions) => {
            action(values)
              .then(response => {
                actions.setSubmitting(false);
                Alert.success(`You signed ${signinIn ? 'in' : 'up'} successfully!`);
                this.props.history.push("/");
              })
              .catch(error => {
                this.setState({error: error.json.error_description})
                actions.setSubmitting(false);
              });
          }}
          render={props => (
            <Form className="form">
              {
                this.state.error &&
                  <p style={{color: red}}>{this.state.error}</p>
              }
              <div className="grid--center">
                <div className="grid__cell--50">
                  <div>
                    <label htmlFor="email">
                      Email<span className="required">*</span>
                    </label>
                    <Field type="email" name="email" id="email" required />
                  </div>
                </div>
                <div className="grid__cell--50">
                  <div>
                    <label htmlFor="password">
                      Password<span className="required">*</span>
                    </label>
                    <Field type="password" name="password" id="password" required />
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <button type="submit" className="button">
                    {
                      props.isSubmitting ?
                        'Wait...' :
                        'Access'
                    }
                  </button>
                </div>
              </div>
              <hr/>
              <div>
                <div className="formatted-content">
                  You don't have an account? <Link to="/signup">Create an account</Link>
                </div>
              </div>
            </Form>
          )}
        />
      </Modal>
    );
  }
}
