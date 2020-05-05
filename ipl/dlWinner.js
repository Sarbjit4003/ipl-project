function dlWinners(matches){
    result={}
    for(let match of matches){
        if(match.dl_applied != 0){
            winner = match.winner;
            if (result[winner]){
                result[winner] += 1;
            }else{
                result[winner] = 1;
            }
        }
    }return result;
}
module.exports = dlWinners;