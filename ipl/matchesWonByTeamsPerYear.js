function matchesWonByTeamsPerYear(matches) {
    let result = {};
    let years = [];
    for (let match of matches) {
      if (!years.includes(match.season)) {
        years.push(match.season);
      }
    }
    years.forEach(year => {
      result[year] = getResults(matches, year);
    });
    //console.log(result);
    return result;
    function getResults(matches, year) {
      let matchesWon = {};
      for (let match of matches) {
        let team = match.winner;
        let season = match.season;
        if (season === year && team) {
          matchesWon[team] = (matchesWon[team] || 0) + 1;
        }
      }
      return matchesWon;
    }
}
  module.exports = matchesWonByTeamsPerYear;