import React from 'react'
import Loader from '../../node_modules/react-loader-spinner/index'
import { userActions } from '../redux/user/userActions'
import male from '../images/male.jpg'
import female from '../images/female.png'

class ManageUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allUser: [],
      candidate: [],
      company: [],
      candidateShow: true,
      companyShow: ''
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(userActions.getAllUsers());
    setTimeout(() => {
      document.getElementById('manageuser').style.display = 'none';
    }, 0)
  }

  componentWillUnmount() {
    document.getElementById('manageuser').style.display = 'block';
  }
  componentWillReceiveProps(newProps) {
    const { users } = newProps;
    let company = [];
    let candidate = [];
    let headings = ['Id', 'Fullname', 'Email', 'Password', 'Gender', 'Role', 'Actions'];
    console.log(headings)
    users.filter((item, index) => {
      if (item.role === 1) {
        company.push(item)
      }

      if (item.role === 2) {
        candidate.push(item);
      }
      return false;
    })
    this.setState({
      allUser: users,
      headings: headings,
      candidate: candidate,
      company: company
    })
  }

  showUserDetails = (event) => {
    event.preventDefault();
    const id = event.currentTarget.id;
    const oneUser = this.state.allUser.filter((item) => {
      if (item._id === id) {
        return true;
      }
      return false;
    })

    this.setState({
      clickedUser: oneUser
    }, () => {
      document.getElementById('showUserDetail').style.display = 'block'
    })
    console.log(oneUser);
  }

  closeUserDetail = (e) => {
    document.getElementById('showUserDetail').style.display = 'none'
  }

  candidateShow = (e) => {
    e.preventDefault();
    this.setState({
      candidateShow: true,
      companyShow: ''
    })
  }

  companyShow = (e) => {
    e.preventDefault();
    this.setState({
      candidateShow: '',
      companyShow: true
    })
  }
  render() {
    if (this.state.allUser.length === 0) {
      return (
        // <p className="fa fa-spinner fa-spin"></p>
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
      <div className="container-fluid">
        <div className="row tabs">
          <div className="col-sm-6">
            <div className="list-group" id="list-tab" role="tablist">
              <button onClick={this.candidateShow} id="candidate" className="list-group-item list-group-item-action active"  role="tab">Manage Candidates</button>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="list-group" id="list-tab" role="tablist">
              <button onClick={this.companyShow} id="company" className="list-group-item list-group-item-action active" role="tab">Manage Companies</button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <table className="listing-table table-dark">
              <thead>
                <tr>
                  {
                    this.state.headings.map((item) => {
                      return (
                        <th key={item}>{item}</th>
                      )
                    })
                  }
                </tr>
              </thead>
              <tbody>
                {
                  this.state.candidateShow && this.state.candidate.map((item) => {
                    return (
                      <tr key={item._id}>
                        <td>{item['_id']}</td>
                        <td>{item['name']}</td>
                        <td>{item['emailId']}</td>
                        <td>{item['password']}</td>
                        <td>{item['gender']}</td>
                        <td>{item['role']}</td>
                        <td>
                          <div className="btn-group">
                            <button id={item._id} className="btn btn-primary" onClick={this.showUserDetails}><i className="fa fa-user fa-fw"></i> User</button>
                            <button className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                              <span className="fa fa-caret-down" title="Toggle dropdown menu"></span>
                            </button>
                            <ul className="dropdown-menu">
                              <li><a href="/edit"><i className="fa fa-pencil fa-fw"></i> Edit</a></li>
                              <li><a href="/delete"><i className="fa fa-trash-o fa-fw"></i> Delete</a></li>
                              <li><a href="/ban"><i className="fa fa-ban fa-fw"></i> Ban</a></li>
                              <li className="divider"></li>
                              <li><a href="/promote"><i className="fa fa-unlock"></i> Make admin</a></li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                }
                {
                  this.state.companyShow && this.state.company.map((item) => {
                    return (
                      <tr key={item._id}>
                        <td>{item['_id']}</td>
                        <td>{item['name']}</td>
                        <td>{item['emailId']}</td>
                        <td>{item['password']}</td>
                        <td>{item['gender']}</td>
                        <td>{item['role']}</td>
                        <td>
                          <div className="btn-group">
                            <button id={item._id} className="btn btn-primary" onClick={this.showUserDetails}><i className="fa fa-user fa-fw"></i> User</button>
                            <button className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                              <span className="fa fa-caret-down" title="Toggle dropdown menu"></span>
                            </button>
                            <ul className="dropdown-menu">
                              <li><a href="/edit"><i className="fa fa-pencil fa-fw"></i> Edit</a></li>
                              <li><a href="/delete"><i className="fa fa-trash-o fa-fw"></i> Delete</a></li>
                              <li><a href="/ban"><i className="fa fa-ban fa-fw"></i> Ban</a></li>
                              <li className="divider"></li>
                              <li><a href="/promote"><i className="fa fa-unlock"></i> Make admin</a></li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
        <div id="showUserDetail" className="w3-modal w3-animate-opacity">
          <div className="w3-modal-content w3-card-4">
            <header className="w3-container w3-teal">
              <span onClick={this.closeUserDetail}
                className="w3-button w3-large w3-display-topright">&times;</span>
              <h3>User Details</h3>
            </header>
            <div className="panel panel-primary w3-container">
              <div className="panel-body">
                <div className="row">
                  <div className="col-md-4 col-lg-4">
                    {
                      this.state.clickedUser && !this.state.clickedUser[0].image && this.state.clickedUser[0].gender === 'Male' && <img className="img-circle" src={male} alt="Upload Pic" />
                    }
                    {
                      this.state.clickedUser && !this.state.clickedUser[0].image && this.state.clickedUser[0].gender === 'Female' && <img className="img-circle" src={female} alt="Upload Pic" />
                    }
                    {
                      this.state.clickedUser && this.state.clickedUser[0].image && <img key={new Date()} className="img-circle" src={`http://localhost:4000${this.state.clickedUser[0].image}?${this.state.imageHash}`} alt="Upload Pic" />
                    }
                  </div>
                  <div className="col-md-8 col-lg-8">
                    {this.state.clickedUser && <strong>{this.state.clickedUser[0].name} </strong>}<br />
                    {
                      this.state.clickedUser && <div>
                        <dl>
                          <dt>UID</dt>
                          <dd>{this.state.clickedUser[0]._id}</dd>
                        </dl>
                        <dl>
                          <dt>Fullname</dt>
                          <dd>{this.state.clickedUser[0].name}</dd>
                        </dl>
                        <dl>
                          <dt>Email</dt>
                          <dd>{this.state.clickedUser[0].emailId}</dd>
                        </dl>
                        <dl>
                          <dt>Mobile No.</dt>
                          <dd>{this.state.clickedUser[0].phone}</dd>
                        </dl>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default ManageUser;