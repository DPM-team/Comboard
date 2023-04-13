// To check if form fields are missing and need to filled!
const fieldsAreMissing = function (dataObj) {
  for (const field of Object.entries(dataObj)) {
    const [key, value] = [...field];

    if (!value) {
      return new Error(`Field '${key}' is missing!`);
    }
  }
};

module.exports = fieldsAreMissing;
