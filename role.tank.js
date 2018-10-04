var roleTank = {
    run: function(creep) {
        if(Game.flags.Tank && creep.hits > creep.hitsMax * .9){
            creep.moveTo(Game.flags.Tank);
        }
        else if(Game.flags.Heal)
        {
            creep.moveTo(Game.flags.Heal);
        }
    }
};

module.exports = roleTank;