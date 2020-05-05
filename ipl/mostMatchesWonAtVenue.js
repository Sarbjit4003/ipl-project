function mostMatchesWonAtVenue(matches){
    result={};
    venues=[];
    for (let match of matches){
        if(!venues.includes(match.venue)){
            venues.push(match.venue);
        }
    }
    venues.forEach(venue => {
        result[venue] = getResult(matches,venue);
    });

    function getResult(matches,venue){
        matchesWonAtVenue={};
        for(let match of matches){
            winner=match.winner;
            ground=match.venue;
            if(ground === venue && winner){
                matchesWonAtVenue[winner] = (matchesWonAtVenue[winner] || 0) +1;
            }
        }
        return matchesWonAtVenue;
    }
    return result;
}

module.exports = mostMatchesWonAtVenue;