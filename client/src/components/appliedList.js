import React from 'react'
import { appliedStatusComp } from '../enum/appliedStatus'
import { jobAction } from '../redux/addJob/jobActions'
import isLoggedIn from '../isLoggedIn';
import { ChatApp } from '../containers/chat';


class AppliedList extends React.Component {
  userData = JSON.parse(localStorage.getItem('currentUser'));
  constructor(props) {
    super(props);
    this.state = {
      appliedjobs: [],
      status: 'Pending'
    }
    // document.getElementById('applied').style.display = 'none'
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(jobAction.getAppliedJob(this.userData.name))
    const { appliedjobs } = this.props
    console.log(appliedjobs)
    this.setState({
      appliedjobs: appliedjobs
    })
  }

  componentWillReceiveProps(newProps) {
    const { appliedjobs } = newProps
    console.log(appliedjobs)
    this.setState({
      appliedjobs: appliedjobs
    })
  }

  handleChange = (event) => {
    var id = event.currentTarget.id
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    this.setState({
      [name]: value
    })
    if (event.target) {
      id = id.substring(3)
      var selectList = [...document.querySelectorAll('select')]
      var selectId = []
      selectList.filter((item, index) => {
        return selectId.push(selectList[index].id)
      })
      selectId.map((item) => {
        if (id === item) {
          document.getElementById(item).style.visibility = 'visible';
        }
        return true;
      })
    }

  }

  handleTypingData = (message, data) => {
    if (message === false && data === false) {
      this.setState({
        message: false
      })
    } else {
      this.setState({
        message: message,
        userTyping: data
      })
    }
  }
  openChat = (e) => {
    e.preventDefault();
    const username = e.currentTarget.id;
    this.setState({
      username: username
    }, () => {
      console.log(this.state.username)
    })
    document.getElementById('chatBox').style.display = 'block'
  }

  closeChat = (e) => {
    e.preventDefault();
    document.getElementById('chatBox').style.display = 'none'
  }

  changeStatus = (event) => {
    event.preventDefault();
    let id = event.currentTarget.id;
    id = id.substring(3)
    const { dispatch } = this.props;
    dispatch(jobAction.updateStatus(id, this.state.status))
  }
  render() {
    const imageUrl = 'https://jobportalmern.herokuapp.com'.concat(this.userData.image)
    return (
      <div className="">
        {
          this.userData.role === 1 && this.state.appliedjobs.length === 0 && <h1 className="applyList">No candidate has applied for any jobs yet.</h1>
        }
        {
          this.userData.role === 2 && this.state.appliedjobs.length === 0 && <h1 className="applyList">You haven't applied for any jobs yet. Please apply one:)</h1>
        }
        {
          this.state.appliedjobs.map((item, index) => {
            return (
              <div className="panel panel-primary profile" key={index}>
                <div className="panel-heading">
                  <h3 className="panel-title">Application No. {++index}</h3>
                </div>
                <div className="panel-body">
                  <div className="row">
                    <div className="col-md-3 col-lg-2">
                      {
                        this.userData.image && this.userData.role === 2 && <img className="img-circle" src={imageUrl} alt="Upload Pic" />
                      }
                      {
                        this.userData.role === 1 && item.userDetails.gender === 'Male' && <img className="img-circle" src={'https://jobportalmern.herokuapp.com'.concat(item.userDetails.image)} alt="Upload Pic" />
                      }
                      {
                        this.userData.role === 1 && item.userDetails.gender === 'Female' && <img className="img-circle" src={'https://jobportalmern.herokuapp.com'.concat(item.userDetails.image)} alt="Upload Pic" />
                      }
                    </div>
                    <div className="col-md-4 col-lg-4">
                      <strong>User Details</strong><br />
                      <div>
                        <dl>
                          <dt>Fullname:</dt>
                          <dd>{item.userDetails.name}</dd>
                        </dl>
                        <dl>
                          <dt>Email:</dt>
                          <dd>{item.userDetails.emailId}</dd>
                        </dl>
                        <dl>
                          <dt>Mobile No.:</dt>
                          <dd>{item.userDetails.phone}</dd>
                        </dl>
                        <dl>
                          <dt>Status:</dt>
                          <dd>{item.statusUser}</dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-2 col-lg-2">
                      {
                        this.userData.image && this.userData.role === 1 && <img className="img-circle" src={imageUrl} alt="Upload Pic" />
                      }
                    </div>
                    <div className="col-md-4 col-lg-4">
                      <strong>Job Details</strong><br />
                      <div>
                        <dl>
                          <dt>Company:</dt>
                          <dd>{item.jobDetails.company}</dd>
                        </dl>
                        <dl>
                          <dt>Profile:</dt>
                          <dd>{item.jobDetails.profileType}</dd>
                        </dl>
                        <dl>
                          <dt>Designation:</dt>
                          <dd>{item.jobDetails.designation}</dd>
                        </dl>
                        <dl>
                          <dt>Annual Salary:</dt>
                          <dd>{item.jobDetails.annualSalary}</dd>
                        </dl>
                        <dl>
                          <dt>City:</dt>
                          <dd>{item.jobDetails.city}</dd>
                        </dl>
                        {isLoggedIn() && this.userData.role === 1 && <dl>
                          <dt>Status:</dt>
                          {item.statusComp}
                          {this.userData.role === 1 && <button className="btn btn-link" onClick={this.changeStatus} id={'app' + item._id} onMouseEnter={this.handleChange} >Update Status</button>}
                          <select name="status" onChange={this.handleChange} id={item._id} style={{ visibility: "hidden" }}>
                            <option value={appliedStatusComp[0].value} >{appliedStatusComp[0].value}</option>
                            <option value={appliedStatusComp[1].value}>{appliedStatusComp[1].value}</option>
                            <option value={appliedStatusComp[2].value}>{appliedStatusComp[2].value}</option>
                            <option value={appliedStatusComp[3].value}>{appliedStatusComp[3].value}</option>
                            <option value={appliedStatusComp[4].value}>{appliedStatusComp[4].value}</option>
                          </select>
                        </dl>}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="panel-footer">
                  {
                    this.userData.role === 2 && <button className="btn btn-sm btn-primary" id={item.jobDetails.company} onClick={this.openChat} type="button" data-toggle="tooltip"
                      data-original-title="Send message to user"><i class="glyphicon glyphicon-comment"></i></button>
                  }
                  {
                    this.userData.role === 1 && <button className="btn btn-sm btn-primary" id={item.userDetails.name} onClick={this.openChat} type="button" data-toggle="tooltip"
                      data-original-title="Send message to user"><i className="glyphicon glyphicon-envelope"></i></button>
                  }
                </div>
              </div>
            )
          })
        }
        <div id="chatBox" className="w3-modal w3-animate-opacity">
          <div className="w3-modal-content w3-card-4">
            <header className="w3-container w3-teal">
              <span onClick={this.closeChat}
                className="w3-button w3-large w3-display-topright">&times;</span>
              <h3>Chat</h3>
              {this.state.message && <i><p>{this.state.userTyping.username} is typing...</p></i>}
            </header>
            <div className="w3-container mail">
              {this.state.username && <ChatApp handleTyping={this.handleTypingData} username={this.state.username} />}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AppliedList;