import axios from 'axios'

export const paginationService = {
  getPageData
};

async function getPageData(page) {
  return await axios.get('http://localhost:4000/pages')
    .then(async jobs => {
      const isJobs = jobs.data
      if (isJobs !== null) {
        return jobs.data.reverse();
      }
      else {
        return false;
      }
    });
}