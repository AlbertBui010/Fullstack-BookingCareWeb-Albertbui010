import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
class BookingModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpenModal: false,
		};
	}

	async componentDidMount() {}

	async componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.language !== prevProps.language) {
		}
	}
	handleCloseModal = () => {
		this.setState({
			isOpenModal: false,
		});
	};
	render() {
		let { isOpenModal, closeBookingModal, dataTime } = this.props;
		let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : '';
		return (
			<div>
				<Modal isOpen={isOpenModal} size="lg" centered className={'booking-modal-container'}>
					<div className="booking-modal-content">
						<div className="booking-modal-header">
							<span className="left">Thông tin đặt lịch khám bệnh</span>
							<i class="fa-solid fa-xmark right" onClick={closeBookingModal}></i>
						</div>
						<div className="booking-modal-body">
							<div className="doctor-infor">
								<ProfileDoctor doctorId={doctorId} />
							</div>
							<div className="row">
								<div className="col-6 form-group">
									<label>Họ tên</label>
									<input className="form-control" />
								</div>
								<div className="col-6 form-group">
									<label>Số điện thoại</label>
									<input className="form-control" />
								</div>
								<div className="col-6 form-group">
									<label>Email</label>
									<input className="form-control" />
								</div>
								<div className="col-6 form-group">
									<label>Địa chỉ</label>
									<input className="form-control" />
								</div>
								<div className="col-12 form-group">
									<label>Lý do khám</label>
									<input className="form-control" />
								</div>
								<div className="col-6 form-group">
									<label>Đặt cho ai</label>
									<input className="form-control" />
								</div>
								<div className="col-6 form-group">
									<label>Giới tính</label>
									<input className="form-control" />
								</div>
							</div>
						</div>
						<div className="booking-modal-footer">
							<button className="btn-confirm">Confirm</button>
							<button className="btn-cancel" onClick={closeBookingModal}>
								Cancel
							</button>
						</div>
					</div>
				</Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
