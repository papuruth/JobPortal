import axios from 'axios';
import config from '../../config';

/**
 * @author Papu Kumar <papu.kumar@kelltontech.com>
 * @description Redux Service for add job
 * @async
 * @function addJob
 * @param {string} company
 * @param {string} profile
 * @param {string} designation
 * @param {string} salary
 * @param {string} city
 * @param {Object} data - Form Object containing image file
 */
async function addJob(company, profile, designation, salary, city, data) {
  // Calls jobsValidate api to check for duplication
  try {
    const res = await axios.post(`${config.nodeBaseUrl}/getjobsvalidate`, { company, designation });
    if (res.data) {
      // Calls image upload api to upload the image and return the image url
      await axios.post(`${config.nodeBaseUrl}/upload`, data)
        .then(async (url) => {
          const imageURL = `/${url.data}`;
          // Calls the job api to save the job into db
          await axios.post(`${config.nodeBaseUrl}/jobs`, {
            company, profile, designation, salary, city, imageURL,
          })
            .then(async (jobResponse) => jobResponse)
            .catch((err) => err);
        })
        .catch((error) => error);
    }
    return false;
  } catch (err1) {
    return err1;
  }
}

/**
 * @author Papu Kumar <papu.kumar@kelltontech.com>
 * @description Redux Service for edit job
 * @async
 * @function editJob
 * @param {string} id
 */
async function editJob(id) {
  try {
    const res = await axios.get(`${config.nodeBaseUrl}/`.concat(id));
    return res.data;
  } catch (err) {
    return err;
  }
}

/**
 * @author Papu Kumar <papu.kumar@kelltontech.com>
 * @description Redux Service for update job
 * @async
 * @function updateJob
 * @param {string} id
 * @param {string} company
 * @param {string} profileType
 * @param {string} designation
 * @param {string} annualSalary
 * @param {string} city
 */
async function updateJob(id, company, profileType, designation, annualSalary, city) {
  try {
    const res = await axios.put(`${config.nodeBaseUrl}/updatejob/`.concat(id), {
      company, profileType, designation, annualSalary, city,
    });
    return res;
  } catch (err) {
    return err;
  }
}

/**
 * @author Papu Kumar <papu.kumar@kelltontech.com>
 * @description Redux Service for apply job
 * @async
 * @function applyJob
 * @param {string} id
 * @param {string} name
 * @param {string} gender
 */
async function applyJob(id, name, gender) {
  try {
    const res = await axios.post(`${config.nodeBaseUrl}/apply`, { id, name, gender });
    if (res.data.title === 'Successful') {
      return res.data.title;
    }
    const error = res.data.errors[0];
    return error.errorMessage;
  } catch (err) {
    return err;
  }
}

/**
 * @author Papu Kumar <papu.kumar@kelltontech.com>
 * @description Redux Service for fetching applied jobs
 * @async
 * @function getAppliedJob
 * @param {string} name
 */
async function getAppliedJob(name) {
  try {
    const res = await axios.get(`${config.nodeBaseUrl}/appliedjobs`);
    console.log(res.data, name);
    const filteredData = res.data.filter((item) => {
      if (item.jobDetails.company === name) {
        return true;
      }
      if (item.userDetails.name === name) {
        return true;
      }
      return false;
    });
    localStorage.setItem('appliedjobs', JSON.stringify(filteredData));
    console.log(filteredData);
    return filteredData;
  } catch (error) {
    return error.message;
  }
}

/**
 * @author Papu Kumar <papu.kumar@kelltontech.com>
 * @description Redux Service for delete a job
 * @async
 * @function removeJob
 * @param {string} id
 */
async function removeJob(id) {
  try {
    const res = await axios.post(`${config.nodeBaseUrl}/deletejob/`.concat(id));
    return res.data;
  } catch (error) {
    return error;
  }
}

/**
 * @author Papu Kumar <papu.kumar@kelltontech.com>
 * @description Redux Service for update job status
 * @async
 * @function updateStatus
 * @param {string} id
 * @param {string} status
 */
async function updateStatus(id, status) {
  function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toString();
  }
  try {
    const res = await axios.put(`${config.nodeBaseUrl}/updatejobstatus`, { id, status });
    const job = JSON.parse(res.data.data);
    const { statusResponse } = res.data;
    if (statusResponse !== 'Pending') {
      const mailDetails = {
        jobId: job._id,
        status: statusResponse,
        name: job.userDetails.name,
        designation: job.jobDetails.designation,
        company: job.jobDetails.company,
        city: job.jobDetails.city,
        date: randomDate(new Date(2019, 7, 1), new Date()),
      };
      return axios.post(`${config.nodeBaseUrl}/maildetails`, { mailDetails })
        .then((mails) => mails)
        .catch((error) => error.message);
    }
    return false;
  } catch (error1) {
    return error1;
  }
}

const jobService = {
  addJob,
  editJob,
  updateJob,
  applyJob,
  getAppliedJob,
  removeJob,
  updateStatus,
};

export default jobService;
