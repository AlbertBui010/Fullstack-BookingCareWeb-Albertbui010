import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import specialtyImg from '../../../assets/medical-facility/hospital.webp';

class MedicalFacility extends Component {
	render() {
		return (
			<div className="section-share section-medical-facility">
				<div className="section-container">
					<div className="section-header">
						<span>Cơ sở y tế nổi bật</span>
						<button>Xem thêm</button>
					</div>
					<div className="section-body">
						<Slider {...this.props.settings}>
							<div>
								<div className="section-customize">
									<img src={specialtyImg} alt="" />
									<h3>Hệ thống Y tế Thu Cúc 1</h3>
								</div>
							</div>
							<div>
								<div className="section-customize">
									<img src={specialtyImg} alt="" />
									<h3>Hệ thống Y tế Thu Cúc 2</h3>
								</div>
							</div>
							<div>
								<div className="section-customize">
									<img src={specialtyImg} alt="" />
									<h3>Hệ thống Y tế Thu Cúc 3</h3>
								</div>
							</div>
							<div>
								<div className="section-customize">
									<img src={specialtyImg} alt="" />
									<h3>Hệ thống Y tế Thu Cúc 4</h3>
								</div>
							</div>
							<div>
								<div className="section-customize">
									<img src={specialtyImg} alt="" />
									<h3>Hệ thống Y tế Thu Cúc 5</h3>
								</div>
							</div>
							<div>
								<div className="section-customize">
									<img src={specialtyImg} alt="" />
									<h3>Hệ thống Y tế Thu Cúc 6</h3>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
