import React from 'react'
import { Filter } from '../containers/body'
import { Card } from '../containers/body'
import isLoggedIn from '../isLoggedIn'
import { bodyActions } from '../redux/body/bodyActions'
import { Pagination } from '../containers/body'
import { paginationActions } from '../redux/pagination/paginationActions'
import Loader from '../../node_modules/react-loader-spinner/index'

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobsData: [],
      roleBasedJobs: [],
      user: JSON.parse(localStorage.getItem('currentUser')),
      loader: true
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(paginationActions.getPageData());
    dispatch(bodyActions.getJobs(1))
  }

  componentWillReceiveProps(nextProps) {
    const { jobs, currentPageData } = nextProps;
    try {
      const filterJobsByComp = currentPageData.filter((ele) => {
        if (this.state.user.name === ele.company) {
          return true;
        }
        return false;
      })
      this.setState({
        jobsData: jobs,
        toFilter: jobs,
        roleBasedJobs: filterJobsByComp,
        roleBasedFilter: filterJobsByComp
      })
      if (nextProps.jobs !== this.jobsData) {
        this.setState({
          roleBasedJobs: filterJobsByComp
        })
      }
    } catch (error) {
      console.log(error.message)
    }
    this.setState({
      jobsData: jobs,
      toFilter: jobs,
      loader: false
    })
  }

  filterMachine = (filterJob) => {
    try {
      if (this.state.user.role === 1) {
        this.setState({
          roleBasedJobs: filterJob,
        })
      }
    } catch (error) {
      console.log("Not a company")
    }
    this.setState({
      jobsData: filterJob
    })
  }

  handleRemoveLogic = (value) => {
    if (value === true) {
      const { dispatch } = this.props;
      dispatch(paginationActions.getPageData());
      dispatch(bodyActions.getJobs(1))
    }
  }

  loaderState = (props) => {
    console.log(props);
    this.setState({
      loader: props
    })
  }

  render() {
    const { jobs } = this.props
    if (this.state.loader) {
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
          !isLoggedIn() && <Filter filteredData={this.filterMachine} data_filter={this.state.toFilter} />
        }
        {
          isLoggedIn() && this.state.user.role === 2 && <Filter filteredData={this.filterMachine} data_filter={this.state.toFilter} />
        }
        {
          isLoggedIn() && this.state.user.role === 0 && <Filter filteredData={this.filterMachine} data_filter={this.state.toFilter} />
        }
        {
          isLoggedIn() && this.state.user.role === 1 && <Filter filteredData={this.filterMachine} data_filter={this.state.roleBasedFilter} />
        }
        {
          jobs && !isLoggedIn() && <Card data={this.state.jobsData} />
        }
        {
          jobs && isLoggedIn() && this.state.user.role === 1 && <Card data={this.state.roleBasedJobs} handleRemove={this.handleRemoveLogic} />
        }
        {
          jobs && isLoggedIn() && this.state.user.role === 2 && <Card data={this.state.jobsData} />
        }
        {
          jobs && isLoggedIn() && this.state.user.role === 0 && <Card data={this.state.jobsData} handleRemove={this.handleRemoveLogic} />
        }
        {
          isLoggedIn() && <Pagination loader={this.loaderState}/>
        }
        {
          !isLoggedIn() && <Pagination loader={this.loaderState}/>
        }
      </div>
    )
  }
}

export default Body;