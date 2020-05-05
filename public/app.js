function fetchAndVisualizeData() {
  fetch("./data.json")
    .then(r => r.json())
    .then(visualizeData);
}

fetchAndVisualizeData();

function visualizeData(data) {
  visualizeMatchesPlayedPerYear(data.matchesPlayedPerYear);
  visualizeWinsByTeams(data.winsByTeams);
  visualizeMatchesWonByTeamsPerYear(data.matchesWonByTeamsPerYear, data.winsByTeams);
  visualizeMostMatchesWonAtVenue(data.mostMatchesWonAtVenue, data.winsByTeams);
  visualizemostDlWinner(data.mostDlWinner);
  visualizemostManOfMatches(data.mostManOfMatches);
  visualizeExtraRuns(data.extraRunsByEachTeam);
  visualizeTopEconomicalBowler(data.topEconomicalBowlers);
  return;
}

function visualizeMatchesPlayedPerYear(matchesPlayedPerYear) {
  const seriesData = [];
  for (let year in matchesPlayedPerYear) {
    seriesData.push([year, matchesPlayedPerYear[year]]);
  }

  Highcharts.chart("matches-played-per-year", {
    chart: {
      type: "column"
    },
    title: {
      text: "MATCHES PLAYED PER YEAR"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches"
      }
    },
    series: [
      {
        name: "Years",
        data: seriesData
      }
    ]
  });
}

//For matches won by teams per year...
function visualizeMatchesWonByTeamsPerYear(matchesWonByTeamsPerYear, winsByTeams) {
  const teams = Object.keys(winsByTeams);
  const seasons=Object.keys(matchesWonByTeamsPerYear);
  let seriesData=[];
  seriesData = teams.map(team => ({
    name: team,
    data: seasons.map(season => matchesWonByTeamsPerYear[season][team] || 0)
  }));

  Highcharts.chart('matches-won-by-teams-per-year', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'MATCHES WON BY EACH TEAM PER YEAR'
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      title: {
        text: "Year"
      },
        categories: seasons,
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Total Wins'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: seriesData
});
}

//No. of matches won by each team...
function visualizeWinsByTeams(winsByTeams) {
  const seriesData = [];
  for (let year in winsByTeams) {
    seriesData.push([year, winsByTeams[year]]);
  }
  Highcharts.chart('matches-won-by-each-team', {
    chart: {
        type: 'pie',
        options3d: {
            enabled: true,
            alpha: 45
        }
    },
    title: {
        text: 'MATCHES WON BY TEAMS'
    },
    subtitle: {
        text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    plotOptions: {
        pie: {
            innerSize: 100,
            depth: 45
        }
    },
    series: [{
        name: 'No. of wins',
        data: seriesData
    }]
});
}

//For most matches won at different venues
function visualizeMostMatchesWonAtVenue(mostMatchesWonAtVenue, winsByTeams) {
  const venues = Object.keys(mostMatchesWonAtVenue);
  const teams = Object.keys(winsByTeams);
  let seriesData = [];
  seriesData = teams.map(team => ({
    name: team,
    data: venues.map(v => mostMatchesWonAtVenue[v][team] || 0)
  }));

  Highcharts.chart("most-matches-won-at-venue", {
    chart: {
      type: "bar"
    },
    title: {
      text: "TOTAL WINS FOR EACH TEAM AT VENUE"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      categories: venues
    },
    yAxis: {
      min: 0,
      title: {
        text: "Total Wins"
      }
    },
    legend: {
      reversed: true
    },
    plotOptions: {
      series: {
        stacking: "normal"
      }
    },
    series: seriesData
  });
}

//For most DL Winner
function visualizemostDlWinner(mostDlWinner) {
  const seriesData = [];
  for (let team in mostDlWinner) {
    seriesData.push([team, mostDlWinner[team]]);
  }

  Highcharts.chart("most-dl-winner", {
    chart: {
      type: "column"
    },
    title: {
      text: "MOST MATCHES WON BY TEAMS (DL METHOD)"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      title: {
        text: "Teams"
      },
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches"
      }
    },
    series: [
      {
        name: "Matches",
        data: seriesData
      }
    ]
  });
}

//For Most Man of The Matches
function visualizemostManOfMatches(mostManOfMatches) {
  const seriesData = [];
  for (let player in mostManOfMatches) {
    seriesData.push([player, mostManOfMatches[player]]);
  }
Highcharts.chart('most-man-of-the-mathches', {
  chart: {
    type: 'column'
  },
  title: {
      text: 'MOST MAN OF THE MATCHES ACROSS ALL SEASONS'
  },

  subtitle: {
      text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
  },

  xAxis: {
    title: {
      text: "Teams"
    },
    type: "category"
  },
  yAxis: {
    min: 0,
    title: {
      text: "Matches"
    }
  },

  series: [{
      name: 'MOM',
      colorByPoint: true,
      data: seriesData,
      showInLegend: false
  }]

});
}

// For extra runs conceded by each team in 2016
function visualizeExtraRuns(extraRuns) {
  const seriesData = [];
  for (let year in extraRuns) {
    seriesData.push([year, extraRuns[year]]);
  }
  Highcharts.chart("extra-runs", {
    chart: {
      type: "column"
    },
    title: {
      text: "EXTRA RUNS CONCEDED BY EACH TEAM IN 2016"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      title: {
        text: "Teams"
      },
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Extra Runs"
      }
    },
    series: [
      {
        name: "Extra Runs",
        data: seriesData
      }
    ]
  });
}

// For top economical bowlers in 2015
function visualizeTopEconomicalBowler(topEconomicalBowler) {
  const seriesData = [];
  for (let year in topEconomicalBowler) {
    seriesData.push([year, parseFloat(topEconomicalBowler[year])]);
  }
  Highcharts.chart("top-economical-bowlers", {
    chart: {
      type: "column"
    },
    title: {
      text: "TOP ECONOMICAL BOWLERS IN SEASON 2015"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      title: {
        text: "Players"
      },
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Economy"
      }
    },
    series: [
      {
        name: "Economy",
        data: seriesData
      }
    ]
  });
}