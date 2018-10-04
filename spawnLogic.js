var advSpawn = require('advSpawn');
var NameGenerator = require('randomNameGen');


var spawnLogic = 
{
    basicWorkers: function(DefaultSpawn)
    {
        var newName;
        var Spawns;
        var Spawn;
        var currentRoom = 0;
        var index = 0;
        index = 0;
        
        for(var name in Memory.rooms)
        {
            if(Game.rooms[name].controller.level > 0)
            {
                Spawns = Game.rooms[name].find(FIND_MY_STRUCTURES, 
            
            {
                filter: (structure) => 
                {
                     return (structure.structureType == STRUCTURE_SPAWN);
                    
                }
            });
            }        
            
            Spawn = DefaultSpawn; //Default spawn
            
            index = 0;
    
            if(Spawns.length == 0)
            {
                Spawns = [];
                Spawns.push(DefaultSpawn);   
            }
            
            var offset = 1;
            index = 0;
            var temp = 0;
            var spawnSuccessful = false;
            
            for(index = 0; index < Spawns.length; index++)
            {
                Spawn = Spawns[index];
                if(Memory.rooms[name].numHarvesters < 1)
                {
                    newName = 'Harvester ' + NameGenerator.RandomName();
                    advSpawn.worker(Spawn, newName, 'harvester', name);
                }
                else if(Memory.rooms[name].numUpgraders < 1)
                {
                    newName = 'Upgrader ' + NameGenerator.RandomName();
                    advSpawn.worker(Spawn, newName, 'upgrader', name);
                }
                else if(Memory.rooms[name].numBuilders < 1)
                {
                    newName = 'Builder ' + NameGenerator.RandomName();
                    advSpawn.worker(Spawn, newName, 'builder', name);
                }
            }
        }
    }
    ,
    remoteNonMilitary: function(roleCount, Spawn)
    {
        if(Game.flags.remoteHarvest && Game.flags.remoteWork && roleCount.numRemoteWorkers < 1)
        {
            newName = 'RemoteWorker ' + NameGenerator.RandomName();
            advSpawn.worker(Spawn, newName, 'remoteWorker', Spawn.room.name);
        }
    }
    ,
    militarySpawning: function(roleCount, Spawn)
    {
        var numFighters = roleCount.numFighters;
        var numRangers = roleCount.numRangers;
        var numTanks = roleCount.numTanks;
        var numHealers = roleCount.numHealers;
        var numScouts = roleCount.numScouts;
        var numClaimers = roleCount.numClaimers;
        var numZerglings = roleCount.numZerglings;
        var numRaiders = roleCount.numRaiders;
        var numHealers = roleCount.numHealers;
        
        var newName = "";
        
        if(Game.flags.RallyZergRush && Game.flags.ZergRush && numZerglings < 21)
        {
            newName = 'Zergling ' + NameGenerator.RandomName()
            advSpawn.zergling(Spawn, newName, 'zergling', Spawn.room);
        }
        
        if(numHealers < 1 && (Spawn.room.energyCapacityAvailable == Spawn.room.energyAvailable || Spawn.room.energyAvailable > 6000) && Game.flags.Heal)
        {
            newName = 'Healer ' + NameGenerator.RandomName();
            advSpawn.healer(Spawn, newName, 'healer', Spawn.room);
        }
        
        if(numFighters < 1 && (Spawn.room.energyCapacityAvailable == Spawn.room.energyAvailable || Spawn.room.energyAvailable > 3900) && Game.flags.Attack)
        {
            newName = 'Fighter ' + NameGenerator.RandomName();
            advSpawn.melee(Spawn, newName, 'fighter', Spawn.room);
        }
        
        if(numScouts < 1 && (Spawn.room.energyCapacityAvailable == Spawn.room.energyAvailable || Spawn.room.energyAvailable > 3900) && Game.flags.Scout)
        {
            newName = 'Scout ' + NameGenerator.RandomName();
            advSpawn.ranged(Spawn, newName, 'scout', Spawn.room);
        }
        
        if((numRaiders < 2 && (Spawn.room.energyCapacityAvailable == Spawn.room.energyAvailable || Spawn.room.energyAvailable > 3900) && Game.flags.Raid))
        {
            newName = 'Raider ' + NameGenerator.RandomName();
            advSpawn.ranged(Spawn, newName, 'raider', Spawn.room);
        }
        
        if(Game.flags.Claim && Game.spawns['Spawn4'].room.energyCapacityAvailable == Game.spawns['Spawn4'].room.energyAvailable && numClaimers < 1)
        {

            newName = 'Claimer' + NameGenerator.RandomName();
            advSpawn.claimer(Game.spawns['Spawn4'], newName, 'claimer', Spawn.room);
        }
    }
    ,
    run: function(roleCount)
    {
        var DefaultSpawn = Game.spawns['Spawn9'];
        var MilitarySpawns = Game.spawns['Spawn4'];
        
        spawnLogic.basicWorkers(DefaultSpawn);
        spawnLogic.militarySpawning(roleCount, MilitarySpawns);
        spawnLogic.remoteNonMilitary(roleCount, DefaultSpawn);
    }
}

module.exports = spawnLogic;