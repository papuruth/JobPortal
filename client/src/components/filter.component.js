import React from 'react';
import { multiFilter } from './multiFilter'
import history from '../_helpers/history'
import Select from 'react-select'

class Filter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      city: '',
      designation: '',
      company: '',
      cityList: [],
      desigList: [],
      compList: [],
      optionsComp: [],
      optionsCity: [],
      optionsDesig: []
    }
  }

  handleChangeComp = (selectedOption) => {
    this.setState({
      company: selectedOption
    });
  }

  handleChangeDesig = (selectedOption) => {
    this.setState({
      designation: selectedOption
    });
  }

  handleChangeCity = (selectedOption) => {
    this.setState({
      city: selectedOption
    });
  }

  componentWillReceiveProps(nextProps) {
    const { currentPageData } = nextProps
    try {
      var cityList = [];
      var desigList = [];
      var compList = [];
      currentPageData.filter((item) => {
        return (cityList.push(item.city), desigList.push(item.designation), compList.push(item.company))
      })
      cityList = [...new Set(cityList)]
      desigList = [...new Set(desigList)]
      compList = [...new Set(compList)]
      const optionsComp = compList.map((item) => {
        return { 'label': item, 'value': item }
      })
      const optionsCity = cityList.map((item) => {
        return { 'label': item, 'value': item }
      })

      const optionsDesig = desigList.map((item) => {
        return { 'label': item, 'value': item }
      })
      this.setState({
        cityList: cityList,
        desigList: desigList,
        compList: compList,
        optionsComp: optionsComp,
        optionsCity: optionsCity,
        optionsDesig: optionsDesig
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  SubmitData = (event) => {
    event.preventDefault();
    var job_data = this.props.data_filter;
    if ((this.state.city === '' || this.state.city === null) &&
     (this.state.designation === '' || this.state.designation === null) &&
      (this.state.company === '' || this.state.company === null)) {
      var data = job_data;
      console.log(data)
    }
    else {
     try {
      data = job_data;
      const condition = {
        city: this.state.city.value || '',
        company: this.state.company.value || '',
        designation: this.state.designation.value || ''
      }
      console.log(condition)
      data = multiFilter(job_data, condition); // Calling filter function with condition and original data
    }
    catch (error) {
       console.log(error.message)
     }
  }
  console.log(data)
  this.props.filteredData(data); // Assigning the filter data
}

  reset = () => {
    this.setState({
      city: '',
      designation: '',
      company: ''
    })
    history.push('/')
  }

  render() {
    const { company, designation, city } = this.state;
    return (
      <div className="row filter" id="filter">
        <div className="col-sm-12 col-md-offset-1">
          <form className="form" onSubmit={this.SubmitData} method="POST" id="filterForm">
            <div className="form-group">
              <div className="row">
                <div className="col-sm-3">
                  <Select pageSize={1} options={this.state.optionsComp} value={company} onChange={this.handleChangeComp} placeholder="Choose company" isClearable={true} />
                </div>
                <div className="col-sm-3">
                  <Select pageSize={1} options={this.state.optionsDesig} value={designation} onChange={this.handleChangeDesig} placeholder="Choose designation" isClearable={true} />
                </div>
                <div className="col-sm-3">
                  <Select pageSize={1} options={this.state.optionsCity} value={city} onChange={this.handleChangeCity} placeholder="Choose city" isClearable={true} />
                </div>
                <div className="col-sm-3">
                  <button type="submit" className="space btn btn-primary">Filter</button>
                  <button type="reset" onClick={this.reset} className="space btn btn-danger">Clear</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Filter;