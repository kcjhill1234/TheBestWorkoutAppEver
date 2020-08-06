// https://wger.de/api/v2/exercise/?format=json&language=2
const axios = require('axios');

function api (){
    axios.get('https://wger.de/api/v2/exercise/?format=json&language=2')
.then(response => {
    console.dir(response)
    console.log(response.data.url);
    console.log(response.data.explanation);
  })
  .catch(error => {
    console.log(error);
  });
};

module.exports = api;