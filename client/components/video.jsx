import React from 'react';
import AddAdminQuestionForm from './addAdminQuestionForm.jsx';
import BroadcastModal from './broadcastquestionmodal';
import StudentModal from './studentModal';

export default class Video extends React.Component{
    constructor(props){
        super(props);
        this.state={
            view : '',
            selectedQuestion: '',
            displayQuestion: false,
            sentQuestion: '',
        }

        this.handleQuestionSelect = this.handleQuestionSelect.bind(this);
        this.handleSendQuestion = this.handleSendQuestion.bind(this);
        this.toggleModal =this.toggleModal.bind(this);
    }

    toggleModal(event){

        if(this.state.view === ''){
            if(event.target.id === 'addButton'){
                this.setState({ view: 'add' });
            } else {
                this.setState({ view: 'saved' })
            }
        }else {
            this.setState({
                view: '',
                selectedQuestion: ''
            });
        }
    }


    handleQuestionSelect(event) {
        console.log('handlequestionselect in video, event: ', event);

        this.setState({
            selectedQuestion: event
        })
    }

    handleSendQuestion(){
        this.setState({displayQuestion: true, sentQuestion: this.state.selectedQuestion});
        setTimeout(() => {this.setState({displayQuestion: false, sentQuestion: ''})}, 5000);


    }


    render(){
        console.log('this.props.hostUser: ',this.props.hostUser);

        if (this.props.userType === 'admin') {
            return (
                <div id="video" className="col-10 fullheight">
                    <iframe src={`https://player.twitch.tv/?channel=${this.props.hostUser}&muted=true`} height="100%" width="100%" frameBorder="0" scrolling="no" allowFullScreen={true}> </iframe>
                    <div className="front btn-group-vertical"
                        style={{ 'bottom': 70 + 'vh', "height": 150 + 'px' }}>
                        <button id="addButton" type="button" className="btn btn-primary" onClick={this.toggleModal}>
                            <i id="addButton" className="admin-button fa fa-plus-square-o"></i>
                        </button>
                        <button id="savedButton" type="button" className="btn btn-primary" onClick={this.toggleModal}>
                            <i id="savedButton" className="admin-button fa fa-list-ul"></i>
                        </button>
                    </div>
                    <AddAdminQuestionForm
                        view={this.state.view}
                        toggle={this.toggleModal}
                        callback={this.props.passQuestionCallback}
                        adminData={this.props.adminData}
                    />
                    <BroadcastModal view={this.state.view}
                        options={this.props.data}
                        toggle={this.toggleModal}
                        question={this.state.selectedQuestion}
                        handleSelect={this.handleQuestionSelect}
                        handleSend={this.handleSendQuestion} />
                </div>
            )
        } else {
            if (this.state.displayQuestion){
                return (
                    <div id="video" className="col-10 fullheight">
                        <iframe src={`https://player.twitch.tv/?channel=${this.props.hostUser}&muted=true`} height="100%" width="100%" frameBorder="0" scrolling="no" allowFullScreen={true}></iframe>
                        <StudentModal adminQuestion={this.state.sentQuestion} />
                    </div>
                )
            } else {
                return (
                    <div id="video" className="col-10 fullheight">
                        <iframe src={`https://player.twitch.tv/?channel=${this.props.hostUser}&muted=true`} height="100%" width="100%" frameBorder="0" scrolling="no" allowFullScreen={true}></iframe>
                    </div>
                )
            }
        }
    }
}
