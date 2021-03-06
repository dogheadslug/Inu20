import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import firebase from 'firebase/app';
import { showNotification } from '../../store/actions/notificationActions';

class Settings extends React.Component {
  state = { isModalOpen: false };

  openModal = () => {
    this.setState({ ...this.state, isModalOpen: true });
    console.log(firebase.auth().currentUser);
  };

  closeModal = () => {
    this.setState({ isModalOpen: false, loading: false });
  };

  signOut = () => {
    this.props.signOut();
    this.closeModal();
    let config = {
      iconName: 'check',
      iconColor: 'green',
      title: 'Signed out successfully',
      sec: 3,
    };
    this.props.showNotification(config);
  };

  verifyEmail = () => {
    let currentUser = firebase.auth().currentUser;
    currentUser.sendEmailVerification();
    let config = {
      iconName: 'check',
      iconColor: 'green',
      title: 'An email address verification email has been sent to your email address.',
      sec: 5,
    };
    this.props.showNotification(config);
  };

  resetPassword = () => {
    let auth = firebase.auth();
    auth
      .sendPasswordResetEmail(auth.currentUser.email)
      .then(() => {
        let config = {
          iconName: 'check',
          iconColor: 'green',
          title: 'A password reset email has been sent to your email address.',
          sec: 5,
        };
        this.props.showNotification(config);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const user = firebase.auth().currentUser;
    return (
      <Modal
        trigger={
          <Button secondary size='mini' onClick={this.openModal}>
            Settings
          </Button>
        }
        size='tiny'
        open={this.state.isModalOpen}
        onClose={this.closeModal}>
        <Modal.Header>Settings</Modal.Header>
        <Modal.Content>
          <div>Your Email : {user.email}</div>

          {!user.emailVerified ? (
            <Button secondary size='mini' onClick={this.verifyEmail}>
              Verify your email address
            </Button>
          ) : (
            <div>Email Verified</div>
          )}

          {user.providerData[0].providerId === 'password' ? (
            <Button secondary size='mini' onClick={this.resetPassword}>
              Reset password
            </Button>
          ) : (
            <div>You are using 3rd Party Account</div>
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button size='mini' onClick={this.closeModal}>
            Cancel
          </Button>
          <Button size='mini' color='red' onClick={this.signOut}>
            Sign out
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
    showNotification: (config) => dispatch(showNotification(config)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
