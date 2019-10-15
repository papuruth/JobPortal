/* eslint-disable react/no-deprecated */
import React from 'react';
import '../App.css'
import isLoggedIn from '../isLoggedIn'
import jobAction from '../redux/addJob/jobActions';
import history from '../_helpers/history'
import config from '../config';

class Card extends React.Component {
  user = JSON.parse(localStorage.getItem('currentUser'));

  constructor(props) {
    super(props);
    this.state = {
      currentJobId: '',
      apply: '',
      data: []
    }
  }
  editJob = (event) => {
    event.preventDefault();
    const id = event.target.id;
    const { dispatch } = this.props
    dispatch(jobAction.editJob(id))
  }

  componentWillReceiveProps(props) {
    const { data } = props
    this.setState({
      apply: props.apply,
      appliedjobs: props.appliedjobs,
      jobs: this.props.jobs,
      data: data
    }, () => {
      if (isLoggedIn() && this.state.appliedjobs) {
        this.state.appliedjobs.map((job, index) => {
          this.state.jobs.map((item, innerIndex) => {
            if (job.jobDetails.company === item.company && job.jobDetails.designation === item.designation && job.userDetails.name === this.user.name) {
              try {
                document.getElementById('btn' + innerIndex).innerHTML = 'Applied';
                document.getElementById('btn' + innerIndex).style.background = 'red';
              } catch (error) {
                console.log(error.message)
              }
            }
            return true;
          })
          return true;
        })
      }
    })
  }

  apply = (e) => {
    e.preventDefault();
    const id = e.target.name;
    this.setState({
      currentJobId: id
    })
    if (isLoggedIn()) {
      const { dispatch } = this.props
      const { name, gender } = this.user
      dispatch(jobAction.applyJob(id, name, gender))
    } else {
      history.push('/login')
    }
  }

  removeJob = (event) => {
    event.preventDefault();
    const id = event.target.id;
    const { dispatch } = this.props;
    dispatch(jobAction.removeJob(id))
    this.props.handleRemove(true);
  }
  render() {
    return (
      <div className="row">
        <div className="col-sm-12 content">
          <ul className="searchlist">
            {
              isLoggedIn() && this.props.data.length === 0 && this.user.role === 1 && <h1 style={{ textAlign: 'center' }}>No jobs posted yet. Please post some jobs!</h1>
            }
            {
              isLoggedIn() && this.props.data.length === 0 && this.user.role === 2 && <h1 style={{ textAlign: 'center' }}>No jobs posted yet. Please wait for companies!</h1>
            }
            {
              isLoggedIn() && this.props.data.length === 0 && this.user.role === 0 && <h1 style={{ textAlign: 'center' }}>No jobs posted yet. Please wait for companies or post some jobs!</h1>
            }
            {
              !isLoggedIn() && this.props.data.length === 0 && <h1 style={{ textAlign: 'center' }}>No jobs posted yet. Please wait for companies!</h1>
            }
            {
              this.props.data.length > 0 && this.state.data.map((job, index) => {
                let src = config.firebase_url.concat(job.imageURL + '?alt=media');
                return (
                  <li className="active1" key={index}>
                    <div className="row">
                      <div className="col-sm-4 col-lg-2 col-4">
                        <div className="doc-image rounded-circle">
                          <img src={src} className="img-fluid image" width="78" height="78" alt={job.company} />
                        </div>
                      </div>
                      <div className="col-sm-4 col-lg-6 col-4 cardBorder">
                        <div className="doc-details">
                          <h5 className="m-0 h51" id={'comp' + index}>{job.company}</h5>
                          <p className="grey-text txt-uppercase" >Profile: {job.profileType}</p>
                          <span className="salary">Salary: {job.annualSalary}</span>
                          <p id={'des' + index}>{job.designation}</p>
                        </div>
                      </div>
                      <div className="col-sm-4 col-lg-4 col-4">
                        {isLoggedIn() && this.user.role !== 2 && <i className="fa fa-times cross" id={job._id} onClick={this.removeJob}></i>}
                        {isLoggedIn() && this.user.role !== 2 && <i className="fa fa-edit cross" onClick={this.editJob} id={job._id}></i>}
                        <div>
                          <span className="font14 font-medium">Venue: {job.venue}</span>
                        </div>
                        <div>
                          <span className="font14 font-medium">Location: {job.city}</span>
                        </div>
                        <div>
                          <h5 className="m-1">Status: {job.status}</h5>
                        </div>
                      </div>
                      {
                        isLoggedIn() && this.user.role === 2 &&
                        <button type="button" className="btn1" name={job._id} id={'btn' + index} onClick={this.apply}>
                          Apply
                        </button>
                      }
                      {!isLoggedIn() && <button type="button" className="btn1" id={job._id} onClick={this.apply}>Apply</button>}
                    </div>
                  </li>
                );
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default Card;