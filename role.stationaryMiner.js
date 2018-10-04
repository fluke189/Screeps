/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.stationaryMiner');
 * mod.thing == 'a thing'; // true
 */

var roleStationaryMiner = 
{

    run: function(creep)
    {
        //Verify mineSite object id exists
        if(creep.memory.mineSite)
        {
            //if creep is not in range of mineSite move to mine site
            if(creep.harvest(Game.getObjectById(creep.memory.mineSite)) == -9)
            {
                creep.moveTo(Game.getObjectById(creep.memory.mineSite));
            }
        }
    }

};

module.exports= roleStationaryMiner;