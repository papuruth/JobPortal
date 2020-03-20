import PropTypes from 'prop-types';
import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingOverlay from 'react-loading-overlay';
import { withRouter } from 'react-router';
import { SyncLoader } from 'react-spinners';
import '../App.css';
import config from '../config';
import jobAction from '../redux/addJob/jobActions';
import bodyActions from '../redux/body/bodyActions';
import loader from '../redux/loader/loaderAction';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMore: true,
      appliedjobs: []
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let state = prevState;
    if (nextProps.pagerData.currentPage + 1 < nextProps.pagerData.pages) {
      state = {
        ...state,
        hasMore: true
      };
    }

    if (nextProps.appliedjobs !== prevState.appliedjobs) {
      return {
        appliedjobs: nextProps.appliedjobs
      };
    }
    return state;
  }

  componentDidMount() {
    const { dispatch, user } = this.props;
    if (user) {
      dispatch(jobAction.getAppliedJob(user.name));
    }
  }

  componentDidUpdate() {
    const { data, appliedjobs, apply, user, authenticated } = this.props;
    if (authenticated && appliedjobs) {
      appliedjobs.map((job) => {
        data.map((item, innerIndex) => {
          if (
            job.jobDetails.company === item.company &&
            job.jobDetails.designation === item.designation &&
            job.userDetails.name === user.name
          ) {
            try {
              document.getElementById(`btn${innerIndex}`).innerHTML = 'Applied';
              document.getElementById(`btn${innerIndex}`).style.background =
                'red';
            } catch (error) {
              console.log(error.message);
            }
          }
          return true;
        });
        return true;
      });
    }

    if (apply) {
      const { dispatch } = this.props;
      dispatch(jobAction.getAppliedJob(user.name));
    }
  }

  editJob = (event) => {
    event.preventDefault();
    const { id } = event.target;
    const { dispatch } = this.props;
    dispatch(jobAction.editJob(id));
  };

  apply = (e) => {
    e.preventDefault();
    const { history, authenticated } = this.props;
    const id = e.target.name;
    if (authenticated) {
      const { dispatch, user } = this.props;
      const { name, gender } = user;
      dispatch(jobAction.applyJob(id, name, gender));
    } else {
      history.push('/login');
    }
  };

  removeJob = (event) => {
    const { handleRemove } = this.props;
    event.preventDefault();
    const { id } = event.target;
    const { dispatch } = this.props;
    dispatch(jobAction.removeJob(id));
    handleRemove(true);
  };

  fetchMoreData = () => {
    const { pagerData, user } = this.props;
    if (pagerData.currentPage === pagerData.pages - 1 || !pagerData.pages) {
      this.setState({
        hasMore: false
      });
    } else if (Object.keys(pagerData).length > 0) {
      const page = pagerData.currentPage ? pagerData.currentPage + 1 : 0 + 1;
      const { dispatch } = this.props;
      if (user) {
        const { role, name } = user;
        if (role === 1) {
          dispatch(bodyActions.getJobs(page, role, name));
          dispatch(loader(true));
        } else {
          dispatch(bodyActions.getJobs(page));
          dispatch(loader(true));
        }
      } else {
        dispatch(bodyActions.getJobs(page));
        dispatch(loader(true));
      }
    }
  };

  render() {
    const { data, user, authenticated } = this.props;
    const { hasMore } = this.state;
    return (
      <div className="col-sm-12">
        <ul className="searchlist">
          <LoadingOverlay
            active={data.length === 0 ? true : this.props.loaderStatus}
            spinner={<SyncLoader />}
            text="Loading your content..."
          >
            {authenticated && data.length === 0 && user.role === 1 && (
              <h1 style={{ textAlign: 'center' }}>
                No jobs posted yet. Please post some jobs!
              </h1>
            )}
            {authenticated && data.length === 0 && user.role === 2 && (
              <h1 style={{ textAlign: 'center' }}>
                No jobs posted yet. Please wait for companies!
              </h1>
            )}
            {authenticated && data.length === 0 && user.role === 0 && (
              <h1 style={{ textAlign: 'center' }}>
                No jobs posted yet. Please wait for companies or post some jobs!
              </h1>
            )}
            {!authenticated && data.length === 0 && (
              <h1 style={{ textAlign: 'center' }}>
                No jobs posted yet. Please wait for companies!
              </h1>
            )}
            <InfiniteScroll
              dataLength={data.length} // This is important field to render the next data
              next={this.fetchMoreData}
              hasMore={hasMore}
              endMessage={(
                <p style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              )}
              // below props only if you need pull down functionality
              // refreshFunction={this.refresh}
              // pullDownToRefresh
              // pullDownToRefreshContent={
              //   <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
              // }
              // releaseToRefreshContent={
              //   <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
              // }
            >
              {data.length > 0 &&
                data.map((job, index) => {
                  const src = config.firebase_url.concat(
                    `${job.imageURL}?alt=media`
                  ) || null;
                  return (
                    <li
                      className={job.status === 'New' ? 'active1' : 'closed'}
                      key={'index'.concat(index)}
                    >
                      <div className="row">
                        <div className="col-sm-4 col-lg-2 col-4">
                          <div className="doc-image rounded-circle">
                            {src ? (
                              <img
                                src={src}
                                className="img-fluid image"
                                width="78"
                                height="78"
                                alt={job.company}
                              />
                            ) : (
                              <Skeleton
                                variant="circle"
                                width={78}
                                height={78}
                                animation="wave"
                              />
                            )}
                          </div>
                        </div>
                        <div className="col-sm-4 col-lg-6 col-4 cardBorder">
                          <div className="doc-details">
                            <h5 className="m-0 h51" id={`comp${index}`}>
                              {job.company}
                            </h5>
                            <p className="grey-text txt-uppercase">
                              Profile: {job.profileType}
                            </p>
                            <span className="salary">
                              Salary: {job.annualSalary}
                            </span>
                            <p id={`des${index}`}>{job.designation}</p>
                          </div>
                        </div>
                        <div className="col-sm-4 col-lg-4 col-4">
                          {authenticated && user.role !== 2 && (
                            <i
                              className="fa fa-times cross"
                              id={job._id}
                              onClick={this.removeJob}
                              onKeyPress={this.removeJob}
                              role="button"
                              tabIndex={0}
                              aria-label="Remove Job"
                            />
                          )}
                          {authenticated && user.role !== 2 && (
                            <i
                              className="fa fa-edit cross"
                              onClick={this.editJob}
                              id={job._id}
                              onKeyPress={this.editJob}
                              role="button"
                              tabIndex={0}
                              aria-label="Edit Job"
                            />
                          )}
                          <div>
                            <span className="font14 font-medium">
                              Venue: {job.venue}
                            </span>
                          </div>
                          <div>
                            <span className="font14 font-medium">
                              Location: {job.city}
                            </span>
                          </div>
                          <div>
                            <h5 className="m-1">Status: {job.status}</h5>
                          </div>
                          {job.status !== 'New' && (
                            <div>
                              <h5 className="m-1 closedJob">
                                Early bird catches the worm!
                              </h5>
                            </div>
                          )}
                        </div>
                        {authenticated && user.role === 2 && (
                          <button
                            type="button"
                            className={
                              job.status === 'New' ? 'btn1' : 'btnDisabled'
                            }
                            name={job._id}
                            id={`btn${index}`}
                            onClick={this.apply}
                            disabled={job.status === 'Closed'}
                          >
                            Apply
                          </button>
                        )}
                        {!authenticated && (
                          <button
                            type="button"
                            className={
                              job.status === 'New' ? 'btn1' : 'btnDisabled'
                            }
                            id={job._id}
                            onClick={this.apply}
                            disabled={job.status === 'Closed'}
                          >
                            Apply
                          </button>
                        )}
                      </div>
                    </li>
                  );
                })}
            </InfiniteScroll>
          </LoadingOverlay>
        </ul>
      </div>
    );
  }
}

Card.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
  appliedjobs: PropTypes.arrayOf(PropTypes.any),
  handleRemove: PropTypes.func,
  dispatch: PropTypes.func,
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
  apply: PropTypes.oneOfType([PropTypes.bool]),
  pagerData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  loaderStatus: PropTypes.bool.isRequired,
  user: PropTypes.oneOfType([PropTypes.object]).isRequired,
  authenticated: PropTypes.bool.isRequired
};

Card.defaultProps = {
  data: [],
  dispatch: PropTypes.func,
  handleRemove: PropTypes.func,
  appliedjobs: [],
  apply: false
};

export default withRouter(Card);
