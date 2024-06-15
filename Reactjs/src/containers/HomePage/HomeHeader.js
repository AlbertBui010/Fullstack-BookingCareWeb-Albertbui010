import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';

class HomeHeader extends Component {
	render() {
		return (
			<React.Fragment>
				<div className="home-header-container">
					<div className="home-header-content">
						<div className="left-content">
							<i className="fa-solid fa-bars"></i>
							<div className="header-logo">BOOKINGCARE</div>
						</div>
						<div className="center-content">
							<div className="nav-item">
								<h4>
									<FormattedMessage id="home-header.specialty" />
								</h4>
								<h5>
									<FormattedMessage id="home-header.search-doctor" />
								</h5>
							</div>
							<div className="nav-item">
								<h4>
									<FormattedMessage id="home-header.health-facility" />
								</h4>
								<h5>
									<FormattedMessage id="home-header.select-room" />
								</h5>
							</div>
							<div className="nav-item">
								<h4>
									<FormattedMessage id="home-header.doctor" />
								</h4>
								<h5>
									<FormattedMessage id="home-header.select-doctor" />
								</h5>
							</div>
							<div className="nav-item">
								<h4>
									<FormattedMessage id="home-header.fee" />
								</h4>
								<h5>
									<FormattedMessage id="home-header.health-check" />
								</h5>
							</div>
						</div>
						<div className="right-content">
							<div className="language-vn">VN</div>
							<div className="language-en">EN</div>
							<div className="suppport">
								<i className="fa-solid fa-question"></i>
								<FormattedMessage id="home-header.support" />
							</div>
						</div>
					</div>
				</div>

				<div className="home-header-banner">
					<div className="content-up">
						<div className="title">
							<FormattedMessage id="banner.title" />
						</div>
						<div className="subtitle">
							<FormattedMessage id="banner.subtitle" />
						</div>
						<div className="search">
							<i class="fa-solid fa-magnifying-glass"></i>
							<input type="text" placeholder="Tìm chuyên khoa khám bệnh" />
						</div>
					</div>
					<div className="content-down">
						<div className="options">
							<div className="option-child">
								<div className="icon">
									<i class="fa-solid fa-hospital"></i>
								</div>
								<div className="text">
									<FormattedMessage id="banner.medical-examination" />
								</div>
							</div>
							<div className="option-child">
								<div className="icon">
									<i class="fa-solid fa-hospital"></i>
								</div>
								<div className="text">
									<FormattedMessage id="banner.remote-examination" />
								</div>
							</div>
							<div className="option-child">
								<div className="icon">
									<i class="fa-solid fa-hospital"></i>
								</div>
								<div className="text">
									<FormattedMessage id="banner.general-examination" />
								</div>
							</div>
							<div className="option-child">
								<div className="icon">
									<i class="fa-solid fa-hospital"></i>
								</div>
								<div className="text">
									<FormattedMessage id="banner.medical-tests" />
								</div>
							</div>
							<div className="option-child">
								<div className="icon">
									<i class="fa-solid fa-hospital"></i>
								</div>
								<div className="text">
									<FormattedMessage id="banner.metal-health" />
								</div>
							</div>
							<div className="option-child">
								<div className="icon">
									<i class="fa-solid fa-hospital"></i>
								</div>
								<div className="text">
									<FormattedMessage id="banner.dental-examination" />
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="temp">Hello</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		lang: state.app.language,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
