import axios from 'axios';
import config from '../../config';

async function getJobs(page, role, name) {
  const jobs = await axios.get(`${config.nodeBaseUrl}/api/v1/jobs`, {
    params: {
      page,
      role,
      name
    }
  });
  if (jobs.data) {
    return jobs.data;
  }
  return false;
}

const bodyService = {
  getJobs
};

export default bodyService;
