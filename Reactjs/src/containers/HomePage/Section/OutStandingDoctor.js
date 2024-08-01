import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import specialtyImg from '../../../assets/outstanding-doctor/doctor.jpg';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';

class OutStandingDoctor extends Component {
	constructor(props) {
		super(props);

		this.state = {
			arrDoctors: [],
		};
	}
	componentDidMount() {
		this.props.loadTopDoctor();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
			this.setState({
				arrDoctors: this.props.topDoctorsRedux,
			});
		}
	}
	render() {
		let arrDoctors = this.state.arrDoctors;
		// arrDoctors = arrDoctors.concat(arrDoctors).concat(arrDoctors);

		let { language } = this.props;
		return (
			<div className="section-share section-outstanding-doctor">
				<div className="section-container">
					<div className="section-header">
						<span>Bác sĩ nổi bật tuần qua</span>
						<button>Xem thêm</button>
					</div>

					<div className="section-body">
						<Slider {...this.props.settings}>
							{arrDoctors &&
								arrDoctors.length > 0 &&
								arrDoctors.map((item, index) => {
									let imageBase64 = '';

									if (item.image) {
										imageBase64 = new Buffer(item.image, 'base64').toString('binary');
									}

									let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName} `;
									let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
									return (
										<div className="section-customize" key={index}>
											<div
												className="section-img"
												style={{ backgroundImage: `url(${imageBase64})` }}
											></div>
											<div className="position text-center">
												<div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
												<div>Khoa học vận động</div>
											</div>
										</div>
									);
								})}
						</Slider>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
		isLoggedIn: state.user.isLoggedIn,
		topDoctorsRedux: state.admin.topDoctors,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadTopDoctor: () => dispatch(actions.fetchTopDoctor()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
