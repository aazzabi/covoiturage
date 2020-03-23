var distance = require('google-distance');
distance.apiKey = 'AIzaSyDtJlOlL_sZhchii9wg4A6yi7vZutilBeg';

distance.get(
  {
      // origin: pt.lng + ' , 'pt.lat,
    origin: 'Djerba',
    destination: 'Gafsa',
    // origin: '36.890727, 10.181488',
    // destination: '36.9021642,10.1868739',
    metric : 'meter'
  },
  function(err, data) {
    if (err) return console.log(err);
    console.log(data);
});
