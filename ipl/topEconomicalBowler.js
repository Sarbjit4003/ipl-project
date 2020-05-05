function topEconomicalBowler(matches,deliveries,year){
    count=0;
    id=[];
    balls={};
    runs={};
    result={};
    for (let match of matches){
        if(match.season === year){
            id.push(match.id);
        }
    }
    for (let i of id){
        for (let delivery of deliveries){
            if (delivery.match_id === i){
                bowler=delivery.bowler;
                if (delivery.extra_runs != 0){
                    count = 1;
                }else{
                    count=0;
                }
                if(result[bowler]){
                    runs[bowler]+=parseInt(delivery.total_runs);
                    balls[bowler] += 1;
                    balls[bowler] -+ count;
                    result[bowler]=((runs[bowler]*6)/balls[bowler]);
                }else{
                    runs[bowler]=parseInt(delivery.total_runs);
                    balls[bowler] = 1;
                    result[bowler]=((runs[bowler]*6)/balls[bowler]);
                }
            }
        }
    }
    var sortable = [];
    for (var vehicle in result) {
        sortable.push([vehicle, parseFloat(result[vehicle])]);
    }

    sortable.sort(function(a, b) {
        return (a[1] - b[1]);
    });

    sortable=sortable.slice(0,10);

    var objSorted = {}
    sortable.forEach(function(item){
        objSorted[item[0]]=parseFloat(item[1].toFixed(2));
    })
    //console.log(objSorted);
    return objSorted;
}
module.exports = topEconomicalBowler;