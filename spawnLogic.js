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
        if(Game.flags.remoteHarvest && Game.flags.remoteWork && roleCount.numRemoteWorkers < 2)
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
        var numGuards = roleCount.numGuards;
        
        var newName = "";
        
        if(Game.flags.RallyZergRush && Game.flags.ZergRush && numZerglings < 21)
        {
            newName = 'Zergling ' + NameGenerator.RandomName()
            if(advSpawn.zergling(Spawn, newName, 'zergling', Spawn.room) == 0)
            {
                roleCount.numZerglings++;
            }
        }
        
        if(Game.flags.Guard && numGuards < 6 && Spawn.room.energyAvailable > 4000)
        {
            newName = 'Guard ' + NameGenerator.RandomName();
            if(advSpawn.melee(Spawn, newName, 'guard', Spawn.room) == 0)
            {
                roleCount.numGuards++;
            }
        }
        
        if(numHealers < 3 && (Spawn.room.energyCapacityAvailable == Spawn.room.energyAvailable || Spawn.room.energyAvailable > 6600) && Game.flags.Heal)
        {
            newName = 'Healer ' + NameGenerator.RandomName();
            if(advSpawn.healer(Spawn, newName, 'healer', Spawn.room) == 0)
            {
                roleCount.numHealers++;
            }
        }
        
        if(numFighters < 1 && (Spawn.room.energyCapacityAvailable == Spawn.room.energyAvailable || Spawn.room.energyAvailable > 3900) && Game.flags.Attack)
        {
            newName = 'Fighter ' + NameGenerator.RandomName();
            if(advSpawn.melee(Spawn, newName, 'fighter', Spawn.room) == 0)
            {
                roleCount.numFighters++;
            }
        }
        
        if(numScouts < 1 && (Spawn.room.energyCapacityAvailable == Spawn.room.energyAvailable || Spawn.room.energyAvailable > 3900) && Game.flags.Scout)
        {
            newName = 'Scout ' + NameGenerator.RandomName();
            if(advSpawn.ranged(Spawn, newName, 'scout', Spawn.room) == 0)
            {
                roleCount.numScouts++;
            }
        }
        
        if((numRaiders < 3 && (Spawn.room.energyCapacityAvailable == Spawn.room.energyAvailable || Spawn.room.energyAvailable > 3900) && Game.flags.Raid))
        {
            newName = 'Raider ' + NameGenerator.RandomName();
            if(advSpawn.ranged(Spawn, newName, 'raider', Spawn.room) == 0)
            {
                roleCount.numRaiders++;
            }
        }
        
        if(Game.flags.Claim && numClaimers < 1)
        {
            newName = 'Claimer ' + NameGenerator.RandomName();
            if(advSpawn.claimer(Game.spawns['Spawn10'], newName, 'claimer', Spawn.room) == 0)
            {
                roleCount.numClaimers++;
            }
        }
    }
    ,
    basicWorkersUpdated: function(roleCount)
    {
        
    }
    ,
    run: function(roleCount)
    {
        var DefaultSpawn = Game.spawns['Spawn12'];
        var MilitarySpawns = [Game.spawns['Spawn8'], Game.spawns['Spawn10'], Game.spawns['Spawn13'], Game.spawns['Spawn7'], Game.spawns['Spawn12']];
        var i = 0;
        var length = MilitarySpawns.length;
        
        for(i = 0; i < length; i++)
        {
            spawnLogic.militarySpawning(roleCount, MilitarySpawns[i]);
        }
        
        
        spawnLogic.basicWorkers(DefaultSpawn);
        spawnLogic.remoteNonMilitary(roleCount, DefaultSpawn);
        
        
    }
}

module.exports = spawnLogic;