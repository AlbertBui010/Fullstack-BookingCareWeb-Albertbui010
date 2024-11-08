import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { postVerifyEmailBooking } from '../../services/userService';
import HomeHeader from '../HomePage/HomeHeader';
import './VerifyEmailBooking.scss';
class VerifyEmailBooking extends Component {
	constructor(props) {
		super(props);
		this.state = {
			statusVerify: false,
		};
	}

	async componentDidMount() {
		if (this.props.location && this.props.location.search) {
			// Get token from url, --> use URLSearchParams
			let urlParams = new URLSearchParams(this.props.location.search);
			let token = urlParams.get('token');
			let doctorId = urlParams.get('doctorId');

			let res = await postVerifyEmailBooking({ doctorId: doctorId, token: token });
			console.log('Albert check res from verify booking email:', res);

			if (res && res.data && res.data.errCode === 0) {
				this.setState({
					statusVerify: true,
				});
			} else {
				this.setState({
					statusVerify: false,
				});
			}
		}
	}

	async componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.language !== prevProps.language) {
		}
	}

	render() {
		let statusVerify = this.state.statusVerify;
		return (
			<>
				<HomeHeader />
				<div>
					<div className="verify-booking">
						{statusVerify ? (
							<div>Appointment confirmed successfully!</div>
						) : (
							<div>Appointment has been activated or doesn't exist</div>
						)}
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmailBooking);
