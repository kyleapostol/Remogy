import React from 'react';
import Video from './video.jsx';
import SidePanel from './sidepanel.jsx';
class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userType: 'admin',
            questionQueue: [],
            broadcastquestions: []
        }
        this.switchUser = this.switchUser.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
        this.fetchAdminQuestionData = this.fetchAdminQuestionData.bind(this);
    };
    getInputAdminQ(question){
        console.log('getInputAdminq called, question :::: ', question);
    }
    componentDidMount() {
        
        this.fetchAdminQuestionData();
        this.getStudentQuestions();
        setTimeout(console.log('app component mounted +3 seconds. this.state: ', this.state), 3000);
    }
    componentDidUpdate() {
        console.log('app component updated. this.state: ', this.state);
    }
    getStudentQuestions() {
        console.log('get student questions fetch method called');
        fetch('http://localhost:3001/getStudentsQuestions', {
            method: 'GET'
        })
            .then(promiseObj => promiseObj.json())
            .then(successObj =>{
                this.setState({ questionQueue: successObj.data }, console.log('app state after fetch student question data success: ', this.state));
            })
            .catch((error) => {console.error(error)});
    }
    fetchAdminQuestionData() {
        console.log('get admin questions fetch method called');
        fetch('http://localhost:3001/getAdminQuestions',{
            method: 'GET'
        })
            .then(promiseObj => promiseObj.json())
            .then(successObj => {
                this.setState({
                    broadcastquestions: successObj.data.map(element =>
                        element = { 'value': element.id,
                                    'label': element.question,
                                    'admin_id': element.admin_id,
                                    'answer_ids': element.answer_ids,
                                    'answers': element.answers }
                    )
                }, console.log('app state after fetch admin question data success: ', this.state));
            }
            ).catch((error) => { console.error(error) });
    }
    switchUser(){
        if (this.state.userType === 'admin'){
            this.setState({ userType: 'student' })
        } else {
            this.setState({ userType: 'admin' })
        }
    }
    addQuestion(question) {
        let newQuestion = [{ 'id': '4', 'question': question, 'author': 'Guest' }];
        this.setState({ questionQueue: this.state.questionQueue.concat(newQuestion)})
      }
    deleteQuestion(id){
        let questionArr = this.state.questionQueue.filter(questionObj =>{
             return questionObj.id !== id;
        })
           this.setState({questionQueue:questionArr})
        }
    render(){
        return(
            <div id="app" className="container-fluid nopadding">
                <div className="row" style={{'height':101 + 'vh'}}>
                    <button style={{ 'position': 'absolute', 'height': 15 + 'px', 'left': 10 + 'px', 'zIndex': 10 }} onClick={this.switchUser}></button>
                    <Video userType={this.state.userType}
                        data={this.state.broadcastquestions}
                        passQuestionCallback={this.getInputAdminQ}
                    />
                    <SidePanel userType={this.state.userType}
                        add={this.addQuestion}
                        delete={this.deleteQuestion}
                        questionQueue={this.state.questionQueue} />
                </div>
            </div>
        )
    }
}
export default App;