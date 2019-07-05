import Body from '../components/body.component'
import Card from '../components/card.component'
import { connect } from 'react-redux'
import Filter from '../components/filter.component';
import Pagination from '../components/pagination'

function mapStateToProps(state) {
  const { jobs } = state.jobs;
  const {currentPageData} = state.pagination
  const {apply} = state.applyJob
  const appliedjobs = JSON.parse(localStorage.getItem('appliedjobs'));
  return {
    jobs,
    appliedjobs,
    apply,
    currentPageData
  };
}

const connectedBody = connect(mapStateToProps)(Body);
const connectedFilter = connect(mapStateToProps)(Filter)
const connectedCard = connect(mapStateToProps)(Card);
const connectPagination = connect(mapStateToProps)(Pagination)
export {
  connectedBody as Body,
  connectedCard as Card,
  connectedFilter as Filter,
  connectPagination as Pagination
}; 