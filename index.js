const fs = require("fs");
const csv = require("csvtojson");
const matchesPlayedPerYear = require("./ipl/matchesPlayedPerYear");
const winsByTeams = require("./ipl/winsByTeams");
const matchesWonByTeamsPerYear = require("./ipl/matchesWonByTeamsPerYear");
const mostMatchesWonAtVenues = require("./ipl/mostMatchesWonAtVenue");
const dlWinner = require("./ipl/dlWinner");
const mostManOfMatches = require("./ipl/mostManOfMatches");
const extraRuns = require("./ipl/extraRuns");
const topEconomicalBowler = require("./ipl/topEconomicalBowler");

const MATCHES_FILE_PATH = "./csv_data/matches.csv";
const DELIVERIES_FILE_PATH = "./csv_data/deliveries.csv";
const JSON_OUTPUT_FILE_PATH = "./public/data.json";

function main() {
  csv()
    .fromFile(MATCHES_FILE_PATH)
    .then(matches => {
      csv()
        .fromFile(DELIVERIES_FILE_PATH)
        .then(deliveries => {
      let result = matchesPlayedPerYear(matches);
      let winsByTeamsRes = winsByTeams(matches);
      let matchesWinRes = matchesWonByTeamsPerYear(matches);
      let matchesWonAtVenuesRes = mostMatchesWonAtVenues(matches);
      let dlWinnerRes = dlWinner(matches);
      let manOfMatchesRes = mostManOfMatches(matches);
      let extraRunsRes = extraRuns(matches,deliveries,'2016');
      let topEconomicalBowlerRes = topEconomicalBowler(matches,deliveries,'2015');
      saveMatchesPlayedPerYear(result, winsByTeamsRes, matchesWinRes, matchesWonAtVenuesRes, dlWinnerRes, manOfMatchesRes, extraRunsRes, topEconomicalBowlerRes);
    });
    });
}

function saveMatchesPlayedPerYear(result, winsByTeamsRes, matchesWinRes, matchesWonAtVenuesRes, dlWinnerRes, manOfMatchesRes, extraRunsRes, topEconomicalBowlerRes) {
  const jsonData = {
    matchesPlayedPerYear: result,
    winsByTeams: winsByTeamsRes,
    matchesWonByTeamsPerYear: matchesWinRes,
    mostMatchesWonAtVenue: matchesWonAtVenuesRes,
    mostDlWinner: dlWinnerRes,
    mostManOfMatches: manOfMatchesRes,
    extraRunsByEachTeam: extraRunsRes,
    topEconomicalBowlers: topEconomicalBowlerRes
  };
  const jsonString = JSON.stringify(jsonData);
  fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", err => {
    if (err) {
      console.error(err);
    }
  });
}

main();
