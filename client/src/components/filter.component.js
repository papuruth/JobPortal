import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import multiFilter from './multiFilter';

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalJobs: [],
      city: '',
      designation: '',
      company: '',
      optionsComp: [],
      optionsCity: [],
      optionsDesig: [],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { dataFilter } = prevProps;
    const { totalJobs } = dataFilter;
    if(prevProps.dataFilter.totalJobs !== prevState.totalJobs) {
      try {
        let cityList = [];
        let desigList = [];
        let compList = [];
        totalJobs.filter((item) => {
          cityList.push(item.city);
          desigList.push(item.designation);
          compList.push(item.company);
          return true;
        });
        cityList = [...new Set(cityList)];
        desigList = [...new Set(desigList)];
        compList = [...new Set(compList)];
        const optionsComp = compList.map((item) => ({ label: item, value: item }));
        const optionsCity = cityList.map((item) => ({ label: item, value: item }));
  
        const optionsDesig = desigList.map((item) => ({ label: item, value: item }));
        this.setState({
          optionsComp,
          optionsCity,
          optionsDesig,
          totalJobs
        });
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  handleChangeComp = (selectedOption) => {
    this.setState({
      company: selectedOption,
    });
  }

  handleChangeDesig = (selectedOption) => {
    this.setState({
      designation: selectedOption,
    });
  }

  handleChangeCity = (selectedOption) => {
    this.setState({
      city: selectedOption,
    });
  }

  SubmitData = (event) => {
    event.preventDefault();
    const { city, designation, company } = this.state;
    const { dataFilter, filteredData } = this.props;
    const { filterData } = dataFilter;
    const jobData = filterData;
    let data;
    if ((city === '' || city === null)
      && (designation === '' || designation === null)
      && (company === '' || company === null)) {
      data = jobData;
    } else {
      try {
        data = jobData;
        const condition = {
          city: city.value || '',
          company: company.value || '',
          designation: designation.value || '',
        };
        // Calling filter function with condition and original data
        data = multiFilter(jobData, condition);
      } catch (error) {
        console.log(error.message);
      }
    }
    filteredData(data); // Assigning the filter data
  }

  reset = () => {
    const { dataFilter, clearFilter } = this.props;
    const { filterData } = dataFilter;
    this.setState({
      city: '',
      designation: '',
      company: '',
    });
    clearFilter(filterData);
  }

  render() {
    const {
      company,
      designation,
      city,
      optionsCity,
      optionsComp,
      optionsDesig,
    } = this.state;
    return (
      <div className="row filter" id="filter">
        <div className="col-sm-12 col-md-offset-1">
          <form className="form" onSubmit={this.SubmitData} method="POST" id="filterForm">
            <div className="form-group">
              <div className="row">
                <div className="col-sm-3">
                  <Select pageSize={1} options={optionsComp} value={company} onChange={this.handleChangeComp} placeholder="Choose company" isClearable />
                </div>
                <div className="col-sm-3">
                  <Select pageSize={1} options={optionsDesig} value={designation} onChange={this.handleChangeDesig} placeholder="Choose designation" isClearable />
                </div>
                <div className="col-sm-3">
                  <Select pageSize={1} options={optionsCity} value={city} onChange={this.handleChangeCity} placeholder="Choose city" isClearable />
                </div>
                <div className="col-sm-3">
                  <button type="submit" className="space btn btn-primary">Filter</button>
                  <button type="button" onClick={this.reset} className="space btn btn-danger">Clear</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Filter.propTypes = {
  totalJobs: PropTypes.arrayOf(PropTypes.any),
  dataFilter: PropTypes.shape({
    filterData: PropTypes.array,
    totalJobs: PropTypes.array,
  }).isRequired,
  filteredData: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
};

Filter.defaultProps = {
  totalJobs: [],
};

export default Filter;
