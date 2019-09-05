module.exports = (
  listings,
  { offset = 0, limit = 10, bedrooms, bathrooms, price }
) => {
  const data = listings.filter(
    ([listingBeds, listingPrice, listingBaths]) =>
      (bedrooms == null || listingBeds >= bedrooms) &&
      (bathrooms == null || listingBaths >= bathrooms) &&
      (price == null || listingPrice <= price)
  );

  return { data: data.slice(offset, limit), count: data.length };
};
