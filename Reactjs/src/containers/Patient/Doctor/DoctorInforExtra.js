import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorInforExtra.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';

class DoctorInforExtra extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowDetailInfor: false,
		};
	}

	async componentDidMount() {}

	async componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.language !== prevProps.language) {
		}
	}

	showHideDetailinfor = (status) => {
		this.setState({
			isShowDetailInfor: status,
		});
	};

	render() {
		let { isShowDetailInfor } = this.state;
		return (
			<div className="doctor-infor-extra-container">
				<div className="content-up">
					<div className="text-address">ĐỊA CHỈ KHÁM</div>
					<div className="clinic-name">PHÒNG KHÁM CHUYÊN KHOA DA LIỄU</div>
					<div className="clinic-address">207 Phố Huế - Hai Bà Trưng - Hà Nội </div>
				</div>
				<div className="content-down">
					{isShowDetailInfor === false ? (
						<div className="short-infor">
							GIÁ KHÁM: 250.000đ.
							<span className="show-price" onClick={() => this.showHideDetailinfor(true)}>
								Xem chi tiết
							</span>
						</div>
					) : (
						<>
							<div className="title-price">Giá khám .</div>
							<div className="detail-infor">
								<div>
									<span className="left">Giá khám</span>
									<span className="right">250.000đ</span>
								</div>
								<div className="detail-infor-des-up">
									Giá khám Được ưu tiên khám trước khi đặt qua app Booking Care. Giá khám cho người
									mới là
								</div>
							</div>
							<div className="detail-infor-des-down">
								Người bệnh có thể thanh toán chi phí bằng hình thức tiền mặt hay quẹt thẻ
							</div>
							<div className="hide-price">
								<span onClick={() => this.showHideDetailinfor(false)}>Ẩn bảng giá</span>
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
