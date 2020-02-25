const multiFilter = (item, condition) => {
  const filterKeys = Object.keys(condition);
  return item.filter((eachObj) =>
    filterKeys.every((eachKey) => {
      if (!condition[eachKey].length) {
        return true; // passing an empty filter means that filter is ignored.
      }
      // Checking for case and as well as matching the filter condition with items
      // if matches returns true else false
      return condition[eachKey]
        .toString()
        .toLowerCase()
        .includes(eachObj[eachKey].toString().toLowerCase());
    })
  );
};

export default multiFilter;
