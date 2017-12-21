var roleTank = {
    run: function(creep) {
        if(creep.room != Game.flags.Attack.room){
            creep.moveTo(Game.flags.Attack, {visualizePathStyle: {stroke: '#ff0000'}});
        }
    }
};

module.exports = roleTank;