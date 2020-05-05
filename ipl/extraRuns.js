function extraRuns(matches,deliveries,year){
    //count=0
    id=[]
    result={}
    for (let match of matches){
        if(match.season === year){
            id.push(match.id);
        }
    }
    for (let i of id){
        for (let delivery of deliveries){
            if (delivery.match_id === i){
                team=delivery.bowling_team;
                if(result[team]){
                    result[team]+=parseInt(delivery.extra_runs);
                }else{
                    result[team]=parseInt(delivery.extra_runs);
                }
            }
        }
    }
    return result;
}
module.exports = extraRuns;