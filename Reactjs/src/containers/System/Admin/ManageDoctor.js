import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from '../../../store/actions';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

import Select from 'react-select';

const options = [
	{ value: 'chocolate', label: 'Chocolate' },
	{ value: 'strawberry', label: 'Strawberry' },
	{ value: 'vanilla', label: 'Vanilla' },
];

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			contentMarkdown: '',
			contentHTML: '',
			selectedOption: '',
			description: '',
		};
	}

	componentDidMount() {}

	componentDidUpdate(prevProps, prevState, snapshot) {}
	handleEditorChange = ({ html, text }) => {
		this.setState({
			contentMarkdown: text,
			contentHTML: html,
		});
	};

	handleSaveContentMarkdown = () => {
		console.log('Albert check save', this.state);
	};

	handleChange = (selectedOption) => {
		this.setState({ selectedOption });
	};

	handleOnChangeDes = (event) => {
		this.setState({
			description: event.target.value,
		});
	};
	render() {
		return (
			<div className="manage-doctor-container">
				<div className="manage-doctor-title">Update doctor information</div>
				<div className="more-infor">
					<div className="content-left form-group">
						<label>Chọn bác sĩ</label>
						<Select value={this.state.selectedOption} onChange={this.handleChange} options={options} />
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
					/>
				</div>

				<button className="btn-save-content btn btn-primary" onClick={() => this.handleSaveContentMarkdown()}>
					Lưu thông tin
				</button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		listUsers: state.admin.users,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
		deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
