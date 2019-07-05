import axios from 'axios'

export const jobService = {
  addJob,
  editJob,
  updateJob,
  applyJob,
  getAppliedJob,
  removeJob,
  updateStatus,
  getMails
};

async function addJob(company, profile, designation, salary, city, data) {
  return await axios.post('http://localhost:4000/getjobsvalidate', { company, designation })
    .then(async (res) => {
      if (res.data !== 'false') {
        await axios.post('http://localhost:4000/upload', data)
          .then(async (response) => {
            const url = '/' + response.data
            const imageURL = url
            await axios.post('http://localhost:4000/jobs', { company, profile, designation, salary, city, imageURL })
              .then(async (res) => {
                return res;
              })
              .catch((err) => {
                return err;
              });
          })
          .catch((error) => {
            return error;
          });
      } else {
        return true;
      }

    })
    .catch((err) => {
      return err
    })
}

async function editJob(id) {
  return await axios.get('http://localhost:4000/'.concat(id))
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      return err
    })
}

async function updateJob(id, company, profileType, designation, annualSalary, city) {
  console.log('hello')
  return await axios.put('http://localhost:4000/updatejob/'.concat(id), { company, profileType, designation, annualSalary, city })
    .then((res) => {
      return res
    })
    .catch((err) => {
      return err
    })
}

async function applyJob(id, name, gender) {
  console.log(id, name)
  return await axios.post('http://localhost:4000/apply', { id, name, gender })
    .then(async (res) => {
      await axios.get('http://localhost:4000/appliedjobs')
        .then((res) => {
          localStorage.setItem('appliedjobs', JSON.stringify(res.data))
          const filteredData = res.data.filter((item) => {
            if (item.jobDetails.company === name) {
              return true;
            }
            return false;
          })
          return filteredData;
        })
        .catch((error) => {
          console.log(error.message)
        })
      if (res.data.title === 'Successful') {
        return res.data.title;
      } else {
        const error = res.data.errors[0]
        return error.errorMessage
      }
    })
    .catch((err) => {
      return err
    })
}

async function getAppliedJob(name) {
  return await axios.get('http://localhost:4000/appliedjobs')
    .then((res) => {
      localStorage.setItem('appliedjobs', JSON.stringify(res.data))
      const filteredData = res.data.filter((item) => {
        if (item.jobDetails.company === name) {
          return true;
        }

        if (item.userDetails.name === name) {
          return true;
        }
        return false;
      })
      localStorage.setItem('appliedjobs', JSON.stringify(filteredData))
      return filteredData;
    })
    .catch((error) => {
      console.log(error.message)
    })
}

async function removeJob(id) {
  return await axios.post('http://localhost:4000/deletejob/'.concat(id))
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      return error
    })
}

async function updateStatus(id, status) {
  return await axios.put('http://localhost:4000/updatejobstatus', { id, status })
    .then(async (res) => {
      const job = JSON.parse(res.data.data);
      const statusResponse = res.data.statusResponse;
      const mailDetails = {
        jobId: job._id,
        status: statusResponse,
        name: job.userDetails.name,
        designation: job.jobDetails.designation,
        company: job.jobDetails.company,
        city: job.jobDetails.city,
        date: randomDate(new Date(2019, 7, 1), new Date())
      }
      return await axios.post('http://localhost:4000/maildetails', { mailDetails })
        .then(async (res) => {
          return res;
        })
        .catch((error) => {
          return error.message;
        })
    })
    .catch((error) => {
      return error
    })
  function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toString();
  }
}

async function getMails() {
  return await axios.get('http://localhost:4000/mails')
    .then((mails) => {
      localStorage.setItem('mails', JSON.stringify(mails.data));
      const mailData = JSON.parse(localStorage.getItem('mails'));
      return mailData;
    })
    .catch((error) => {
      return error.message;
    })
}