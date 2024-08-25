import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorInforExtra.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { getExtraInforDoctorById } from '../../../services/userService';
import NumberFormat from 'react-number-format';

class DoctorInforExtra extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowDetailInfor: false,
			extraInfor: {},
		};
	}

	async componentDidMount() {}

	async componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.language !== prevProps.language) {
		}
		if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
			let res = await getExtraInforDoctorById(this.props.doctorIdFromParent);
			let resData = res.data;
			if (resData.data && resData.errCode === 0) {
				this.setState({
					extraInfor: resData.data,
				});
			}
		}
	}

	showHideDetailinfor = (status) => {
		this.setState({
			isShowDetailInfor: status,
		});
	};

	render() {
		let { isShowDetailInfor, extraInfor } = this.state;

		return (
			<div className="doctor-infor-extra-container">
				<div className="content-up">
					<div className="text-address">
						<FormattedMessage id="patient.extra-infor-doctor.text-address" />
					</div>
					<div className="clinic-name">
						{extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''}
					</div>
					<div className="clinic-address">
						{extraInfor && extraInfor.nameClinic ? extraInfor.addressClinic : ''}
					</div>
				</div>
				<div className="content-down">
					{isShowDetailInfor === false ? (
						<div className="short-infor">
							<FormattedMessage id="patient.extra-infor-doctor.price" />
							{extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI && (
								<NumberFormat
									className="currency"
									value={extraInfor.priceTypeData.valueVi}
									displayType={'text'}
									thousandSeparator={true}
									suffix={'VND'}
								/>
							)}
							{extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN && (
								<NumberFormat
									className="currency"
									value={extraInfor.priceTypeData.valueEn}
									displayType={'text'}
									thousandSeparator={true}
									suffix={'$'}
								/>
							)}
							<span className="show-price" onClick={() => this.showHideDetailinfor(true)}>
								<FormattedMessage id="patient.extra-infor-doctor.view-detail" />
							</span>
						</div>
					) : (
						<>
							<div className="title-price">
								{' '}
								<FormattedMessage id="patient.extra-infor-doctor.price" />
							</div>
							<div className="detail-infor">
								<div>
									<span className="left">
										{' '}
										<FormattedMessage id="patient.extra-infor-doctor.price" />
									</span>
									<span className="right">
										{extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI && (
											<NumberFormat
												className="currency"
												value={extraInfor.priceTypeData.valueVi}
												displayType={'text'}
												thousandSeparator={true}
												suffix={'VND'}
											/>
										)}
										{extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN && (
											<NumberFormat
												className="currency"
												value={extraInfor.priceTypeData.valueEn}
												displayType={'text'}
												thousandSeparator={true}
												suffix={'$'}
											/>
										)}
									</span>
								</div>
								<div className="detail-infor-des-up">
									{extraInfor && extraInfor.note ? extraInfor.note : ''}
								</div>
							</div>
							<div className="detail-infor-des-down">
								<FormattedMessage id="patient.extra-infor-doctor.payment-method-des" />
								{extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.VI
									? extraInfor.paymentTypeData.valueVi
									: extraInfor.paymentTypeData.valueEn}
							</div>
							<div className="hide-price">
								<span onClick={() => this.showHideDetailinfor(false)}>
									<FormattedMessage id="patient.extra-infor-doctor.hide-detail" />
								</span>
							</div>
						</>
					)}
				</div>
			</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorInforExtra);
