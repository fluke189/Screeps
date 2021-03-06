var runRoles = require('runRoles');
var RoomSecurity = require('RoomSecurity');
var spawnLogic = require('spawnLogic');

module.exports.loop = function () 
{
    //Principality of Antioch
    var roleCount = {};
    
    RoomSecurity.run();
    runRoles.run(roleCount);
    spawnLogic.run(roleCount);
}
/*
    TODO:
    public ramparts code
    {
        Add field to room memory safe
    }
    REMOTE MINING
    {
        Spawning as well as testing existing remote miner role
        Test hauler role
        write code
    }
    MINERAL MINING
    {
        Mineral miner harvesting maybe implemented using remote mining / haulers
        Lab reactions / creep buffing
    }
    Breaking Walls
    {
        Update targeting for walls
    }
    observers
    {
        create queue of jobs for observers to do related to scouting / pathfinding.
    }
    role.zealot
    {
        create new role zealot that acts as a scout and signs any room controllers that are not already signed by allies.
        
        create list of "teachings" for the zealot to preach
        
        create protocol for scouting new rooms utilitizng observers
        {
            see observers
        }
    }
    updated default spawn stuff
    {
        list of potential default spawns
        
        Choose closest
        
        if invalid, place a site for rebuild and remove from list
    }
*/