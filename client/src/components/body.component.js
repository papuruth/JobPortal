import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Filter from './filter.component';
import Card from '../containers/card';
import isLoggedIn from '../isLoggedIn';
import bodyActions from '../redux/body/bodyActions';
import Loader from '../../node_modules/react-loader-spinner/index';

class Body extends Component {
  user = JSON.parse(localStorage.getItem('currentUser'));

  constructor(props) {
    super(props);
    this.state = {
      jobsData: [],
      pager: {},
      roleBasedJobs: [],
      loader: true,
      filterFlag: true,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { jobs, pager } = nextProps;
    if (jobs !== prevState.jobs && prevState.filter) {
      return {
        jobsData: jobs,
        pager,
      };
    }
    return null;
  }

  componentDidMount() {
    console.log('incdm')
    const { dispatch } = this.props;
    if (this.user) {
      const page = 0;
      const { role, name } = this.user;
      if (this.user.role === 1) {
        dispatch(bodyActions.getJobs(page, role, name));
      } else {
        dispatch(bodyActions.getJobs(0));
      }
    } else {
      dispatch(bodyActions.getJobs(0));
    }
  }

  componentDidUpdate(prevProps) {
    const { jobs, pager, dispatch, logoutUser } = this.props;
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
          roleBasedFilter: filterJobsByComp,
        });
        if (prevProps.jobs !== jobs) {
          this.setState({
            roleBasedJobs: filterJobsByComp,
            roleBasedFilter: filterJobsByComp,
            pager,
          });
        }
      } catch (error) {
        console.log(error.message);
      }
      this.setState({
        jobsData: jobs,
        toFilter: jobs,
        pager,
        loader: false,
      });
    }
  }

  filterMachine = (filterJob) => {
    try {
      if (this.user.role === 1) {
        this.setState({
          roleBasedJobs: filterJob,
          filterFlag: false,
        });
      }
    } catch (error) {
      console.log('Not a company');
    }
    this.setState({
      jobsData: filterJob,
      filterFlag: false,
    });
  }

  handleRemoveLogic = (value) => {
    if (value) {
      const { dispatch } = this.props;
      dispatch(bodyActions.getJobs(0));
    }
  }

  loaderState = (props) => {
    this.setState({
      loader: props,
    });
  }

  clearFilter = (props) => {
    this.setState((state) => ({
      filterFlag: !state.filterFlag,
      jobsData: props,
    }));
  }

  render() {
    const { dispatch } = this.props;
    const {
      toFilter,
      roleBasedFilter,
      roleBasedJobs,
      jobsData,
      pager,
      loader,
    } = this.state;
    if (loader) {
      return (
        <div className="spinner">
          <Loader
            type="Puff"
            color="#00BFFF"
            height="80"
            width="80"
          />
        </div>
      );
    }
    return (
      <div>
        {
          !isLoggedIn() && <Filter
            filteredData={this.filterMachine}
            clearFilter={this.clearFilter}
            dataFilter={{ filterData: toFilter, totalJobs: jobsData }}
          />
        }
        {
          isLoggedIn() && this.user.role === 2
          && (
            <Filter
              filteredData={this.filterMachine}
              clearFilter={this.clearFilter}
              dataFilter={{ filterData: toFilter, totalJobs: jobsData }}
            />
          )
        }
        {
          isLoggedIn() && this.user.role === 0
          && (
            <Filter
              filteredData={this.filterMachine}
              clearFilter={this.clearFilter}
              dataFilter={{ filterData: toFilter, totalJobs: jobsData }}
            />
          )
        }
        {
          isLoggedIn() && this.user.role === 1
          && <Filter filteredData={this.filterMachine} dataFilter={roleBasedFilter} />
        }
        {
          jobsData && pager && !isLoggedIn() && <Card data={jobsData} pagerData={pager} dispatch={dispatch} />
        }
        {
          jobsData && pager && isLoggedIn() && this.user.role === 1
          && <Card data={roleBasedJobs} handleRemove={this.handleRemoveLogic} pagerData={pager} dispatch={dispatch} />
        }
        {
          jobsData && pager && isLoggedIn() && this.user.role === 2 && <Card data={jobsData} pagerData={pager} dispatch={dispatch} />
        }
        {
          jobsData && pager && isLoggedIn() && this.user.role === 0
          && <Card data={jobsData} pagerData={pager} handleRemove={this.handleRemoveLogic} dispatch={dispatch} />
        }
      </div>
    );
  }
}

Body.propTypes = {
  dispatch: PropTypes.func.isRequired,
  jobs: PropTypes.arrayOf(PropTypes.any),
  pager: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

Body.defaultProps = {
  jobs: [],
};

export default Body;
