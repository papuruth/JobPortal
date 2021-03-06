import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Card from '../redux-containers/card';
import bodyActions from '../redux/body/bodyActions';
import Filter from './filter.component';
import loader from '../redux/loader/loaderAction';
import fetchJobByCompanyAction from '../redux/fetchJobByCompany/fetchJobByCompanyAction';
import alertActions from '../redux/alert/alertActions';

export default class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobsData: [],
      pager: {},
      toFilter: [],
      roleBasedJobs: [],
      roleBasedFilter: [],
      filterFlag: true,
      user: {}
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { jobs, pager, user } = props;
    if (jobs !== state.jobsData && state.filterFlag) {
      return {
        jobsData: jobs,
        pager
      };
    }
    if (jobs !== state.toFilter) {
      return {
        toFilter: jobs
      };
    }
    if (user !== state.user) {
      return {
        user
      };
    }
    return null;
  }

  componentDidMount() {
    setTimeout(() => {
      const { dispatch, user } = this.props;
      if (Object.keys(user).length) {
        const page = 0;
        const { role, name } = user;
        if (role === 1) {
          dispatch(loader(true));
          dispatch(bodyActions.getJobs(page, role, name));
        } else {
          dispatch(loader(true));
          dispatch(bodyActions.getJobs(0));
        }
      }
    }, 0);
  }

  componentDidUpdate(prevProps) {
    const {
      jobs,
      pager,
      dispatch,
      logoutUser,
      user,
      loaderStatus,
      fetchJobByCompany
    } = this.props;
    if (fetchJobByCompany) {
      if (Object.keys(user).length) {
        const page = 0;
        const { role, name } = user;
        if (role === 1) {
          dispatch(loader(true));
          dispatch(fetchJobByCompanyAction(false));
          dispatch(bodyActions.getJobs(page, role, name));
          dispatch(alertActions.clear());
        } else {
          dispatch(loader(true));
          dispatch(fetchJobByCompanyAction(false));
          dispatch(bodyActions.getJobs(0));
          dispatch(alertActions.clear());
        }
      }
    }
    if (loaderStatus) {
      dispatch(loader(false));
    }
    if (logoutUser) {
      dispatch(bodyActions.getJobs(0));
    }
    if (prevProps.jobs !== jobs) {
      try {
        const filterJobsByComp = jobs.filter((ele) => {
          if (user.name === ele.company) {
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
        if (loaderStatus) {
          dispatch(loader(false));
        }
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
    const { user } = this.state;
    try {
      if (user.role === 1) {
        this.setState({
          roleBasedJobs: filterJob,
          filterFlag: false
        });
      } else {
        this.setState({
          jobsData: filterJob,
          filterFlag: false
        });
      }
    } catch (error) {
      console.log('Not a company');
    }
  };

  handleRemoveLogic = (value) => {
    if (value) {
      const { dispatch } = this.props;
      dispatch(bodyActions.getJobs(0));
    }
  };

  clearFilter = (props) => {
    const { user } = this.props;
    if (user.role === 1) {
      this.setState((state) => ({
        filterFlag: !state.filterFlag,
        roleBasedJobs: props
      }));
    } else {
      this.setState((state) => ({
        filterFlag: !state.filterFlag,
        jobsData: props
      }));
    }
  };

  render() {
    const { dispatch, authenticated } = this.props;
    const {
      toFilter,
      roleBasedFilter,
      roleBasedJobs,
      jobsData,
      pager,
      user
    } = this.state;
    return (
      <div>
        {!authenticated && jobsData.length > 0 && (
          <Filter
            filteredData={this.filterMachine}
            clearFilter={this.clearFilter}
            dataFilter={{ filterData: toFilter, totalJobs: jobsData }}
          />
        )}
        {authenticated && user.role === 2 && jobsData.length > 0 && (
          <Filter
            filteredData={this.filterMachine}
            clearFilter={this.clearFilter}
            dataFilter={{ filterData: toFilter, totalJobs: jobsData }}
          />
        )}
        {authenticated && user.role === 0 && jobsData.length > 0 && (
          <Filter
            filteredData={this.filterMachine}
            clearFilter={this.clearFilter}
            dataFilter={{ filterData: toFilter, totalJobs: jobsData }}
          />
        )}
        {authenticated && user.role === 1 && roleBasedFilter.length > 0 && (
          <Filter
            filteredData={this.filterMachine}
            clearFilter={this.clearFilter}
            dataFilter={{ filterData: roleBasedFilter, totalJobs: jobsData }}
          />
        )}
        {jobsData && pager && !authenticated && (
          <Card data={jobsData} pagerData={pager} dispatch={dispatch} />
        )}
        {jobsData && pager && authenticated && user.role === 1 && (
          <Card
            data={roleBasedJobs}
            handleRemove={this.handleRemoveLogic}
            pagerData={pager}
            dispatch={dispatch}
          />
        )}
        {jobsData && pager && authenticated && user.role === 2 && (
          <Card data={jobsData} pagerData={pager} dispatch={dispatch} />
        )}
        {jobsData && pager && authenticated && user.role === 0 && (
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
  logoutUser: PropTypes.bool,
  user: PropTypes.oneOfType([PropTypes.object]).isRequired,
  authenticated: PropTypes.bool.isRequired,
  loaderStatus: PropTypes.bool.isRequired,
  fetchJobByCompany: PropTypes.bool.isRequired
};

Body.defaultProps = {
  jobs: [],
  logoutUser: true
};
