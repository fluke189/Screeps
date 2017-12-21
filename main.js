var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleFighter = require('role.fighter');
var roleTank = require('role.tank');
var advSpawn = require('advSpawn');

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    var numHarvesters = 0;
    var numUpgraders = 0;
    var numBuilders = 0;
    var numFighters = 0;
    var numTanks = 0;

    for(var name in Game.creeps) 
    {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
            numHarvesters++;
        }

        else if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
            numUpgraders++;
        }

        else if(creep.memory.role == 'builder'){
            roleBuilder.run(creep);
            numBuilders++;
        }
        
        if(Game.flags.SiegePhase2)
        {
            if(creep.memory.role == 'fighter')
            {
                roleFighter.run(creep);
                numFighters++;
            }
        }
        else if(Game.flags.SiegePhase1)
        {
            if(creep.memory.role == 'tank')
            {
                roleTank.run(creep);
                numTanks++;
            }
        }
    }
    var newName;
    if(numHarvesters == 0)
    {
        newName = 'Harvester' + Game.time;
        advSpawn.worker(Game.spawns['Spawn1'], newName, 'harvester');
    }
    else if(numBuilders == 0)
    {
        newName = 'Builder' + Game.time;
        advSpawn.worker(Game.spawns['Spawn1'], newName, 'builder');
    }
    else if(numUpgraders == 0)
    {
        newName = 'Upgrader' + Game.time;
        advSpawn.worker(Game.spawns['Spawn1'], newName, 'upgrader');
    }
    
    else if(Game.flags.SiegePhase2 && numFighters < 1 && Game.spawns['Spawn1'].energyCapacity == Game.spawns['Spawn1'].energy)
    {
        newName = 'Fighter' + Game.time;
        advSpawn.melee(Game.spawns['Spawn1'], newName, 'fighter');
    }
    else if(Game.flags.SiegePhase1 && Game.spawns['Spawn1'].energyCapacity == Game.spawns['Spawn1'].energy)
    {
        if(numTanks < 1)
        {
            advSpawn.tank(Game.spawns['Spawn1'], newName, 'fighter');
        }
    }
    
    var tower = Game.getObjectById('5a1cdd499b5f6024f6d1389a')
    if(tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        } else {
            if(tower.energy > 900){
                var closestDamagedStructure = tower.room.find(FIND_STRUCTURES, {filter: (s) => s.hits < s.hitsMax * 3/4});
                if(closestDamagedStructure) {
                    closestDamagedStructure.sort((a,b) => a.hits - b.hits);
	 	            tower.repair(closestDamagedStructure[0]);
                }
            }
        }
    }
    var tower = Game.getObjectById('5a2c7edafeb3e018ba1bceed')
    if(tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        } else {
            if(tower.energy > 900){
                var closestDamagedStructure = tower.room.find(FIND_STRUCTURES, {filter: (s) => s.hits < s.hitsMax * 3/4});
                if(closestDamagedStructure) {
                    closestDamagedStructure.sort((a,b) => a.hits - b.hits);
	 	            tower.repair(closestDamagedStructure[0]);
                }
            }
        }
    }
}
