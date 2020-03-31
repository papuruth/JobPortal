import React from 'react';
import PropTypes from 'prop-types';
import { appliedStatusComp } from '../enum/appliedStatus';
import jobAction from '../redux/addJob/jobActions';
import config from '../config';

class AppliedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appliedjobs: [],
      status: 'Pending'
    };
    // document.getElementById('applied').style.display = 'none';
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.appliedjobs !== prevState.appliedjobs) {
      return {
        appliedjobs: nextProps.appliedjobs
      };
    }
    return null;
  }

  componentDidMount() {
    const { dispatch, user } = this.props;
    dispatch(jobAction.getAppliedJob(user.name));
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if(prevProps.someValue!==this.props.someValue){
  //     //Perform some operation here
  //     this.setState({someState: someValue});
  //     this.classMethod();
  //   }
  // }

  handleChange = (event) => {
    let { id } = event.currentTarget;
    const { name, value } = event.currentTarget;
    this.setState({
      [name]: value
    });
    if (event.target) {
      id = id.substring(3);
      const selectList = [...document.querySelectorAll('select')];
      const selectId = [];
      selectList.filter((item, index) => selectId.push(selectList[index].id));
      selectId.map((item) => {
        if (id === item) {
          document.getElementById(item).style.visibility = 'visible';
        }
        return true;
      });
    }
  };

  handleChangeClose = (event) => {
    if (event.target) {
      let { id } = event.currentTarget;
      id = id.substring(3);
      const selectList = [...document.querySelectorAll('select')];
      const selectId = [];
      selectList.filter((item, index) => selectId.push(selectList[index].id));
      selectId.map((item) => {
        if (id === item) {
          document.getElementById(item).style.visibility = 'hidden';
        }
        return true;
      });
    }
  };

  changeStatus = (event) => {
    event.preventDefault();
    const { status } = this.state;
    let { id } = event.currentTarget;
    id = id.substring(3);
    const { dispatch } = this.props;
    dispatch(jobAction.updateStatus(id, status));
  };

  render() {
    const { user, authenticated } = this.props;
    const imageUrl = config.firebase_url.concat(user.image);
    const { appliedjobs } = this.state;
    const statusIndex = [0, 1, 2, 3, 4];
    return (
      <div className="">
        {user.role === 1 && appliedjobs.length === 0 && (
          <h1 className="applyList">
            No candidate has applied for any jobs yet.
          </h1>
        )}
        {user.role === 2 && appliedjobs.length === 0 && (
          <h1 className="applyList">
            You haven&apos;t applied for any jobs yet. Please apply one:)
          </h1>
        )}
        {appliedjobs.map((item, index) => (
          <div className="panel panel-primary profile" key={item._id}>
            <div className="panel-heading">
              <h3 className="panel-title">Application No. {index + 1}</h3>
            </div>
            <div className="panel-body">
              <div className="row">
                <div className="col-md-3 col-lg-2">
                  {user.image && user.role === 2 && (
                    <img
                      className="img-circle"
                      src={`${imageUrl}?alt=media`}
                      alt="Upload Pic"
                    />
                  )}
                  {user.role === 1 && item.userDetails.gender === 'Male' && (
                    <img
                      className="img-circle"
                      src={config.firebase_url.concat(
                        `${item.userDetails.image}?alt=media`
                      )}
                      alt="Upload Pic"
                    />
                  )}
                  {user.role === 1 && item.userDetails.gender === 'Female' && (
                    <img
                      className="img-circle"
                      src={config.firebase_url.concat(
                        `${item.userDetails.image}?alt=media`
                      )}
                      alt="Upload Pic"
                    />
                  )}
                </div>
                <div className="col-md-4 col-lg-4">
                  <strong>User Details</strong>
                  <br />
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
                  {user.image && user.role === 1 && (
                    <img
                      className="img-circle"
                      src={`${imageUrl}?alt=media`}
                      alt="Upload Pic"
                    />
                  )}
                </div>
                <div className="col-md-4 col-lg-4">
                  <strong>Job Details</strong>
                  <br />
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
                    {authenticated && user.role === 1 && (
                      <dl onMouseLeave={this.handleChangeClose} id={`app${item._id}`}>
                        <dt>Status:</dt>
                        {item.statusComp}
                        {user.role === 1 && (
                          <button
                            type="button"
                            className="btn btn-link"
                            onClick={this.changeStatus}
                            id={`app${item._id}`}
                            onMouseEnter={this.handleChange}
                          >
                            Update Status
                          </button>
                        )}
                        <select
                          name="status"
                          onChange={this.handleChange}
                          id={item._id}
                          style={{ visibility: 'hidden' }}
                        >
                          {statusIndex.map((data) => (
                            <option
                              value={appliedStatusComp[data].value}
                              key={appliedStatusComp[data].value}
                            >
                              {appliedStatusComp[data].value}
                            </option>
                          ))}
                        </select>
                      </dl>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

AppliedList.propTypes = {
  appliedjobs: PropTypes.arrayOf(PropTypes.any),
  dispatch: PropTypes.func,
  user: PropTypes.oneOfType([PropTypes.object]).isRequired,
  authenticated: PropTypes.bool.isRequired
};

AppliedList.defaultProps = {
  dispatch: Function,
  appliedjobs: Array
};

export default AppliedList;
