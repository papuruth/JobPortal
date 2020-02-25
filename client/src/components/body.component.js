/* eslint-disable react/jsx-no-undef */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Card from '../redux-containers/card';
import isLoggedIn from '../isLoggedIn';
import bodyActions from '../redux/body/bodyActions';
import Filter from './filter.component';
import loader from '../redux/loader/loaderAction';

export default class Body extends Component {
  user = JSON.parse(localStorage.getItem('currentUser'));

  constructor(props) {
    super(props);
    this.state = {
      jobsData: [],
      pager: {},
      roleBasedJobs: [],
      filterFlag: true
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps)
    const { jobs, pager } = nextProps;
    if (jobs !== prevState.jobs && prevState.filter) {
      return {
        jobsData: jobs,
        pager
      };
    }
    return null;
  }

  componentDidMount() {
    const { dispatch } = this.props;
    if (this.user) {
      const page = 0;
      const { role, name } = this.user;
      if (this.user.role === 1) {
        dispatch(loader(true));
        dispatch(bodyActions.getJobs(page, role, name));
      } else {
        dispatch(loader(true));
        dispatch(bodyActions.getJobs(0));
      }
    } else {
      dispatch(loader(true));
      dispatch(bodyActions.getJobs(0));
    }
  }

  componentDidUpdate(prevProps) {
    const { jobs, pager, dispatch, logoutUser } = this.props;
    dispatch(loader(false));
    if (logoutUser) {
      dispatch(bodyActions.getJobs(0));
    }
    if (prevProps.jobs !== jobs) {
      try {
        const filterJobsByComp = jobs.filter((ele) => {
          if (this.user.name === ele.company) {
            return true;
          }
          return false;
        });
        this.setState({
          jobsData: jobs,
          toFilter: jobs,
          pager,
          roleBasedJobs: filterJobsByComp,
          roleBasedFilter: filterJobsByComp
        });
        if (prevProps.jobs !== jobs) {
          this.setState({
            roleBasedJobs: filterJobsByComp,
            roleBasedFilter: filterJobsByComp,
            pager
          });
        }
        dispatch(loader(false));
      } catch (error) {
        console.log(error.message);
      }
      this.setState({
        jobsData: jobs,
        toFilter: jobs,
        pager
      });
    }
  }

  filterMachine = (filterJob) => {
    try {
      if (this.user.role === 1) {
        this.setState({
          roleBasedJobs: filterJob,
          filterFlag: false
        });
      }
    } catch (error) {
      console.log('Not a company');
    }
    this.setState({
      jobsData: filterJob,
      filterFlag: false
    });
  };

  handleRemoveLogic = (value) => {
    if (value) {
      const { dispatch } = this.props;
      dispatch(bodyActions.getJobs(0));
    }
  };

  clearFilter = (props) => {
    this.setState((state) => ({
      filterFlag: !state.filterFlag,
      jobsData: props
    }));
  };

  render() {
    console.log(this.user, this.state.jobsData.length)
    const { dispatch } = this.props;
    const {
      toFilter,
      roleBasedFilter,
      roleBasedJobs,
      jobsData,
      pager
    } = this.state;
    return (
      <div>
        {!isLoggedIn() && jobsData.length > 0 && (
          <Filter
            filteredData={this.filterMachine}
            clearFilter={this.clearFilter}
            dataFilter={{ filterData: toFilter, totalJobs: jobsData }}
          />
        )}
        {isLoggedIn() && this.user.role === 2 && jobsData.length > 0 && (
          <Filter
            filteredData={this.filterMachine}
            clearFilter={this.clearFilter}
            dataFilter={{ filterData: toFilter, totalJobs: jobsData }}
          />
        )}
        {isLoggedIn() && this.user.role === 0 && jobsData.length > 0 && (
          <Filter
            filteredData={this.filterMachine}
            clearFilter={this.clearFilter}
            dataFilter={{ filterData: toFilter, totalJobs: jobsData }}
          />
        )}
        {isLoggedIn() && this.user.role === 1 && jobsData.length > 0 && (
          <Filter
            filteredData={this.filterMachine}
            dataFilter={roleBasedFilter}
          />
        )}
        {jobsData && pager && !isLoggedIn() && (
          <Card data={jobsData} pagerData={pager} dispatch={dispatch} />
        )}
        {jobsData && pager && isLoggedIn() && this.user.role === 1 && (
          <Card
            data={roleBasedJobs}
            handleRemove={this.handleRemoveLogic}
            pagerData={pager}
            dispatch={dispatch}
          />
        )}
        {jobsData && pager && isLoggedIn() && this.user.role === 2 && (
          <Card data={jobsData} pagerData={pager} dispatch={dispatch} />
        )}
        {jobsData && pager && isLoggedIn() && this.user.role === 0 && (
          <Card
            data={jobsData}
            pagerData={pager}
            handleRemove={this.handleRemoveLogic}
            dispatch={dispatch}
          />
        )}
      </div>
    );
  }
}

Body.propTypes = {
  dispatch: PropTypes.func.isRequired,
  jobs: PropTypes.arrayOf(PropTypes.any),
  pager: PropTypes.oneOfType([PropTypes.object]).isRequired,
  logoutUser: PropTypes.bool.isRequired,
};

Body.defaultProps = {
  jobs: [],
};
