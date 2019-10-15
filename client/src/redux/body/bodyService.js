import axios from 'axios'

export const bodyService = {
  getJobs
};

async function getJobs(page, last) {
  return await axios.get('/jobs', {
    params: {
      page: page,
      last: last
    }
  })
    .then(async jobs => {
      console.log(jobs.data)
      await axios.get('/appliedjobs')
        .then((resp) => {
          localStorage.setItem('appliedjobs', JSON.stringify(resp.data))
        })
        .catch((error) => {
          console.log(error.message)
        })
      const isJobs = jobs.data
      if (isJobs !== null) {
        return jobs.data;
      }
      else {
        return false;
      }
    });
}