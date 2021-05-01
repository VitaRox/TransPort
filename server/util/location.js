const axios = require('axios');
const HttpError = require('../models/http-error');

const API_KEY = 'AIzaSyDHIBCqVXPDRGyUIPs1ZKT4js6VZGEJpl4';

async function getCoordsFromAddress(address) {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );

  const data = response.data;
  if (!data || data.status === 'ZERO_RESULTS') {
    const error = new HttpError("Couldn't find location for specified address", 404);
    throw error;
  }
  const coordinates = data.results[0].geometry.location;

  return coordinates;
}

module.exports = getCoordsFromAddress;
