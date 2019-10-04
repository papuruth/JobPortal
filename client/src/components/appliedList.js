import React from 'react'
import { appliedStatusComp } from '../enum/appliedStatus'
import { jobAction } from '../redux/addJob/jobActions'
import isLoggedIn from '../isLoggedIn';
import { ChatApp } from '../containers/chat';
import config from '../config';


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

  changeStatus = (event) => {
    event.preventDefault();
    let id = event.currentTarget.id;
    id = id.substring(3)
    const { dispatch } = this.props;
    dispatch(jobAction.updateStatus(id, this.state.status))
  }
  render() {
    const imageUrl = config.firebase_url.concat(this.userData.image)
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
                        this.userData.image && this.userData.role === 2 && <img className="img-circle" src={imageUrl + '?alt=media'} alt="Upload Pic" />
                      }
                      {
                        this.userData.role === 1 && item.userDetails.gender === 'Male' && <img className="img-circle" src={config.firebase_url.concat(item.userDetails.image + '?alt=media')} alt="Upload Pic" />
                      }
                      {
                        this.userData.role === 1 && item.userDetails.gender === 'Female' && <img className="img-circle" src={config.firebase_url.concat(item.userDetails.image + '?alt=media')} alt="Upload Pic" />
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
                        this.userData.image && this.userData.role === 1 && <img className="img-circle" src={imageUrl + '?alt=media'} alt="Upload Pic" />
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
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default AppliedList;