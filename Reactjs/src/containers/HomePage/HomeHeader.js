import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';

class HomeHeader extends Component {
	render() {
		return (
			<div className="home-header-container">
				<div className="home-header-content">
					<div className="left-content">
						<i className="fa-solid fa-bars"></i>
						<div className="header-logo">BOOKINGCARE</div>
					</div>
					<div className="center-content">
						<div className="nav-item">
							<h4>Chuyên khoa</h4>
							<h5>Tìm bác sĩ theo chuyên khoa</h5>
						</div>
						<div className="nav-item">
							<h4>Cơ sở y tế</h4>
							<h5>Chọn bệnh viện phòng khám</h5>
						</div>
						<div className="nav-item">
							<h4>Bác sĩ</h4>
							<h5>Chọn bác sĩ giỏi</h5>
						</div>
						<div className="nav-item">
							<h4>Gói khám</h4>
							<h5>Khám sức khỏe tổng quát</h5>
						</div>
					</div>
					<div className="right-content">
						<div className="suppport">
							<i className="fa-solid fa-question"></i>
							Hỗ trợ
						</div>
						<div className="flag">
							<i class="fa-solid fa-language"></i>
							VN
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
