function matchesPlayedPerYear(matches) {
  const result = {};
  for (let match of matches) {
    const season = match.season;
    if (result[season]) {
      result[season] += 1;
      //console.log("S "+result[season]);
    } else {
      result[season] = 1;
      //console.log("S "+result[season]);
    }
  }
  //console.log(result);
  return result;
}

module.exports = matchesPlayedPerYear;
