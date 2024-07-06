import React, { Component } from 'react';
import { connect } from 'react-redux';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import specialtyImg from '../../../assets/handbook/handbook.webp';

class HandBook extends Component {
	render() {
		return (
			<div className="section-share section-handbook">
				<div className="section-container">
					<div className="section-header">
						<span>Cẩm nang</span>
						<button>Xem thêm</button>
					</div>
					<div className="section-body">
						<Slider {...this.props.settings}>
							<div>
								<div className="section-customize">
									<img src={specialtyImg} alt="" />
									<h3>Cơ Xương Khớp 1</h3>
								</div>
							</div>
							<div>
								<div className="section-customize">
									<img src={specialtyImg} alt="" />
									<h3>Cơ Xương Khớp 2</h3>
								</div>
							</div>
							<div>
								<div className="section-customize">
									<img src={specialtyImg} alt="" />
									<h3>Cơ Xương Khớp 3</h3>
								</div>
							</div>
							<div>
								<div className="section-customize">
									<img src={specialtyImg} alt="" />
									<h3>Cơ Xương Khớp 4</h3>
								</div>
							</div>
							<div>
								<div className="section-customize">
									<img src={specialtyImg} alt="" />
									<h3>Cơ Xương Khớp 5</h3>
								</div>
							</div>
							<div>
								<div className="section-customize">
									<img src={specialtyImg} alt="" />
									<h3>Cơ Xương Khớp 6</h3>
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
		language: state.app.language,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
