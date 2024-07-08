import React, { Component } from 'react';
import { connect } from 'react-redux';

class About extends Component {
	render() {
		return (
			<div className="section-share section-about">
				<div className="section-about-header">Truyền thông nói gì về Albert Bui</div>
				<div className="section-about-content">
					<div className="content-left">
						<iframe
							width="100%"
							height="400px"
							src="https://www.youtube.com/embed/AEoci8pjC7Y?si=mc8A5ENmuDU32vey"
							title="YouTube video player"
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							referrerPolicy="strict-origin-when-cross-origin"
							allowFullScreen
						></iframe>
					</div>
					<div className="content-right">
						hello wordhello wordhello wordhello wordhello wordhello wordhello wordhello wordhello word
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
