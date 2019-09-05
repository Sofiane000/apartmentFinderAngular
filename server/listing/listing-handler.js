const listingFilter = require("./listing-filter");
const { fields, data: listings } = require("./listings.json");

module.exports = ({ query }, res) => {
  const result = listingFilter(listings, query);
  res.send({
    fields,
    data: result.data,
    count: result.count
  });
};
