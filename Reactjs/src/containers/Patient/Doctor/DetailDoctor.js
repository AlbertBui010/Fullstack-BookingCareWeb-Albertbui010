import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import './DoctorDetail.scss';
import { getDetailInforDoctor } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import DoctorSchedule from './DoctorSchedule';
import DoctorInforExtra from './DoctorInforExtra';

class DetailDoctor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			detailDoctor: {},
			currentDoctorId: -1,
		};
	}

	async componentDidMount() {
		if (this.props.match && this.props.match.params && this.props.match.params.id) {
			let id = this.props.match.params.id;
			this.setState({
				currentDoctorId: id,
			});

			let res = await getDetailInforDoctor(id);
			let resData = res.data;
			console.log(res);
			if (resData && resData.errCode === 0) {
				this.setState({
					detailDoctor: resData.data,
				});
			}
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {}
	render() {
		let { detailDoctor } = this.state;
		let { language } = this.props;
		let nameVi = '',
			nameEn = '';

		if (detailDoctor && detailDoctor.positionData) {
			nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName} `;
			nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
		}
		return (
			<>
				<div>
					<HomeHeader isShowBanner={false} />
				</div>

				<div className="doctor-detail-container">
					<div className="intro-doctor">
						<div
							className="content-left"
							style={{ backgroundImage: `url(${detailDoctor.image ? detailDoctor.image : ''})` }}
						></div>
						<div className="content-right">
							<div className="title-doctor">{language === LANGUAGES.VI ? nameVi : nameEn}</div>
							<div className="intro-self">
								{detailDoctor.Markdown && detailDoctor.Markdown.description && (
									<span>{detailDoctor.Markdown.description}</span>
								)}
							</div>
						</div>
					</div>
					<div className="schedule-doctor">
						<div className="content-left">
							<DoctorSchedule doctorIdFromParent={this.state.currentDoctorId} />
						</div>
						<div className="content-right">
							<DoctorInforExtra doctorIdFromParent={this.state.currentDoctorId} />
						</div>
					</div>
					<div className="detail-infor-doctor">
						{detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML && (
							<div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}></div>
						)}
					</div>
					<div className="comment-doctor"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
