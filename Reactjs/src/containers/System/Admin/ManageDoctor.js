import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { getDetailInforDoctor } from '../../../services/userService';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			contentMarkdown: '',
			contentHTML: '',
			selectedOption: '',
			description: '',
			doctorsList: [],
			hasOldData: false,
		};
	}

	componentDidMount() {
		this.props.fetchAllDoctors();
	}

	buildDataInputSelect = (inputData) => {
		let result = [];
		let { language } = this.props;

		if (inputData && inputData.length > 0) {
			inputData.map((item, index) => {
				let obj = {};
				let labelVi = `${item.lastName} ${item.firstName}`;
				let labelEn = `${item.firstName} ${item.lastName} `;

				obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
				obj.value = item.id;
				result.push(obj);
			});
		}
		return result;
	};

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.allDoctorsFromRedux !== this.props.allDoctorsFromRedux) {
			let dataSelect = this.buildDataInputSelect(this.props.allDoctorsFromRedux);
			this.setState({
				doctorsList: dataSelect,
			});
		}

		if (prevProps.language !== this.props.language) {
			let dataSelect = this.buildDataInputSelect(this.props.allDoctorsFromRedux);
			this.setState({
				doctorsList: dataSelect,
			});
		}
	}

	handleEditorChange = ({ html, text }) => {
		this.setState({
			contentMarkdown: text,
			contentHTML: html,
		});
	};

	handleSaveContentMarkdown = () => {
		let { hasOldData } = this.state;

		this.props.saveDetailInforDoctor({
			contentMarkdown: this.state.contentMarkdown,
			contentHTML: this.state.contentHTML,
			description: this.state.description,
			doctorId: this.state.selectedOption.value,
			action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
		});
	};

	handleSelectedChange = async (selectedOption) => {
		this.setState({ selectedOption });
		let res = await getDetailInforDoctor(selectedOption.value);
		let resData = res.data;
		if (resData && resData.errCode === 0 && resData.data && resData.data.Markdown) {
			let markdown = resData.data.Markdown;
			this.setState({
				contentHTML: markdown.contentHTML,
				contentMarkdown: markdown.contentMarkdown,
				description: markdown.description,
				hasOldData: true,
			});
		} else {
			this.setState({
				contentHTML: '',
				contentMarkdown: '',
				description: '',
				hasOldData: false,
			});
		}
	};

	handleOnChangeDes = (event) => {
		this.setState({
			description: event.target.value,
		});
	};
	render() {
		let { hasOldData } = this.state;
		return (
			<div className="manage-doctor-container">
				<div className="manage-doctor-title">Update doctor information</div>
				<div className="more-infor">
					<div className="content-left form-group">
						<label>Chọn bác sĩ</label>
						<Select
							value={this.state.selectedOption}
							onChange={this.handleSelectedChange}
							options={this.state.doctorsList}
						/>
					</div>
					<div className="content-right">
						<label>Thông tin giới thiệu:</label>
						<textarea
							class="form-control"
							rows="4"
							onChange={(event) => this.handleOnChangeDes(event)}
							value={this.state.description}
						>
							hello world
						</textarea>
					</div>
				</div>
				<div className="manage-doctor-editor">
					<MdEditor
						style={{ height: '500px' }}
						renderHTML={(text) => mdParser.render(text)}
						onChange={this.handleEditorChange}
						value={this.state.contentMarkdown}
					/>
				</div>

				<button
					className={hasOldData === true ? 'btn-content btn btn-warning' : 'btn-content btn btn-primary'}
					onClick={() => this.handleSaveContentMarkdown()}
				>
					{hasOldData === true ? <span>Lưu thông tin</span> : <span>Thêm thông tin</span>}
				</button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
		allDoctorsFromRedux: state.admin.allDoctors,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
		saveDetailInforDoctor: (data) => dispatch(actions.saveDetailInforDoctor(data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
