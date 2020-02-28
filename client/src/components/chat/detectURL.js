const detectURL = (message) => {
  const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
  return message.replace(urlRegex, (urlMatch) => {
    return `<a href="${urlMatch}">${urlMatch}</a>`;
  });
};

export default detectURL;
