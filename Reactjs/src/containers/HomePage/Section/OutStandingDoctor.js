import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import specialtyImg from '../../../assets/outstanding-doctor/doctor.jpg';

class OutStandingDoctor extends Component {
	render() {
		return (
			<div className="section-share section-outstanding-doctor">
				<div className="section-container">
					<div className="section-header">
						<span>Bác sĩ nổi bật tuần qua</span>
						<button>Xem thêm</button>
					</div>
					<div className="section-body">
						<Slider {...this.props.settings}>
							<div>
								<div className="section-customize">
									<img src={specialtyImg} alt="" />
									<div className="position text-center">
										<div>Giáo sư, Tiến sĩ Bùi Quang Quý</div>
										<div>Khoa học vận động</div>
									</div>
								</div>
							</div>
							<div>
								<div className="section-customize">
									<img src={specialtyImg} alt="" />
									<div className="position text-center">
										<div>Giáo sư, Tiến sĩ Bùi Quang Quý</div>
										<div>Khoa học vận động</div>
									</div>
								</div>
							</div>
							<div>
								<div className="section-customize">
									<img src={specialtyImg} alt="" />
									<div className="position text-center">
										<div>Giáo sư, Tiến sĩ Bùi Quang Quý</div>
										<div>Khoa học vận động</div>
									</div>
								</div>
							</div>
							<div>
								<div className="section-customize">
									<img src={specialtyImg} alt="" />
									<div className="position text-center">
										<div>Giáo sư, Tiến sĩ Bùi Quang Quý</div>
										<div>Khoa học vận động</div>
									</div>
								</div>
							</div>
							<div>
								<div className="section-customize">
									<img src={specialtyImg} alt="" />
									<div className="position text-center">
										<div>Giáo sư, Tiến sĩ Bùi Quang Quý</div>
										<div>Khoa học vận động</div>
									</div>
								</div>
							</div>
							<div>
								<div className="section-customize">
									<img src={specialtyImg} alt="" />
									<div className="position text-center">
										<div>Giáo sư, Tiến sĩ Bùi Quang Quý</div>
										<div>Khoa học vận động</div>
									</div>
								</div>
							</div>
						</Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
