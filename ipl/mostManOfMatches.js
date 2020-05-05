function mostManOfMatches(matches){
    result={}
    for(let match of matches){
        mom=match.player_of_match;
        if(result[mom]){
            result[mom] += 1;
        }else{
            result[mom] = 1;
        }
    }
    var sortable = [];
    for (var player in result) {
        sortable.push([player, result[player]]);
    }

    sortable.sort(function(a, b) {
        return (b[1] - a[1]);
    });

    sortable=sortable.slice(0,15);

    var objSorted = {}
    sortable.forEach(function(item){
        objSorted[item[0]]=(item[1]);
    })
    return objSorted;
}
module.exports = mostManOfMatches;