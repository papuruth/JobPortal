import React from 'react'
import { bodyActions } from '../redux/body/bodyActions'
import isLoggedIn from '../isLoggedIn'

export default class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      user: JSON.parse(localStorage.getItem('currentUser')),
      current_page: 1,
      pageNumbers: []
    }
  }

  componentWillReceiveProps(props) {
    const { currentPageData } = props;
    try {
      if (this.state.user.role === 1) {
        const compData = currentPageData.filter((item) => {
          if (item.company === this.state.user.name) {
            return true;
          }
          return false;
        })
        this.setState({
          compData: compData
        })
      } else {
        this.setState({
          data: currentPageData
        })
      }
    } catch (error) {
      console.log(error.message)
    }
    this.setState({
      data: currentPageData
    })
    const pageNumbers = [];
    try {
      if (isLoggedIn() && this.state.user.role === 1) {
        this.state.compData.map((item, index) => {
          if ((index + 1) === (pageNumbers.length + 1) * 4 && (index + 1) % 2 === 0) {
            pageNumbers.push((index + 1) / 4);
          }
          return true;
        })
        if (this.state.compData.length % 4 !== 0) {
          const remain = this.state.compData.length / 4;
          if (remain < 4) {
            const pageToAdd = pageNumbers.length + 1;
            pageNumbers.push(pageToAdd);
          }
        }
      } else {
        this.state.data.map((item, index) => {
          if ((index + 1) === (pageNumbers.length + 1) * 5 && (index + 1) % 2 !== 0) {
            pageNumbers.push((index + 1) / 5);
          }
          if ((index + 1) === (pageNumbers.length + 1) * 5 && (index + 1) % 2 === 0) {
            pageNumbers.push((index + 1) / 5);
          }
          return true;
        })

        if (this.state.data.length % 5 !== 0) {
          const remain = this.state.data.length / 5;
          if (remain < 5) {
            const pageToAdd = pageNumbers.length + 1;
            pageNumbers.push(pageToAdd);
          }
        }
      }
    } catch (error) {
      console.log(error.message)
    }
    this.setState({
      pageNumbers: pageNumbers
    })
  }
  getData = (number) => {
    // e.preventDefault();
    const page = number
    this.setState({
      current_page: page
    }, () => {
      const last = this.state.pageNumbers.length
      const { dispatch } = this.props;
      if (this.state.current_page === this.state.pageNumbers.length) {
        dispatch(bodyActions.getJobs(this.state.current_page, last))
      } else {
        dispatch(bodyActions.getJobs(this.state.current_page))
      }
    })
  }

  handleLeft = (e) => {
    e.preventDefault();
    if (this.state.current_page > 1) {
      this.setState({
        current_page: this.state.current_page - 1
      }, () => {
        const last = this.state.pageNumbers.length
        const { dispatch } = this.props;
        if (this.state.current_page === this.state.pageNumbers.length) {
          dispatch(bodyActions.getJobs(this.state.current_page, last))
        } else {
          dispatch(bodyActions.getJobs(this.state.current_page))
        }
      })
    } else {
      this.setState({
        current_page: this.state.pageNumbers.length
      }, () => {
        const last = this.state.pageNumbers.length
        const { dispatch } = this.props;
        if (this.state.current_page === this.state.pageNumbers.length) {
          dispatch(bodyActions.getJobs(this.state.current_page, last))
        } else {
          dispatch(bodyActions.getJobs(this.state.current_page))
        }
      })
    }
  }

  handleRight = (e) => {
    e.preventDefault();
    if (this.state.current_page <= this.state.pageNumbers.length - 1) {
      this.setState({
        current_page: this.state.current_page + 1
      }, () => {
        const last = this.state.pageNumbers.length
        const { dispatch } = this.props;
        if (this.state.current_page === this.state.pageNumbers.length) {
          dispatch(bodyActions.getJobs(this.state.current_page, last))
        } else {
          dispatch(bodyActions.getJobs(this.state.current_page))
        }
      })
    } else {
      this.setState({
        current_page: 1
      }, () => {
        const last = this.state.pageNumbers.length
        const { dispatch } = this.props;
        if (this.state.current_page === this.state.pageNumbers.length) {
          dispatch(bodyActions.getJobs(this.state.current_page, last))
        } else {
          dispatch(bodyActions.getJobs(this.state.current_page))
        }
      })
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-12 pagination">
          <span onClick={this.handleLeft}>&laquo;</span>
          {
            this.state.pageNumbers.map((number) => {
              let classes = this.state.current_page === number ? 'active' : '';
              if (number === 1 || number === this.state.pageNumbers.length || (number >= this.state.current_page - 1 && number <= this.state.current_page + 1)) {
                return (
                  <span key={number} className={classes} onClick={() => this.getData(number)}>{number}</span>
                );
              }
              return false;
            })
          }
          <span onClick={this.handleRight}>&raquo;</span>
        </div>
      </div>
    )
  }
}