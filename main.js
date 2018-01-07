var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleFighter = require('role.fighter');
var roleTank = require('role.tank');
var roleRanged = require('role.ranged');
var roleScout = require('role.scout');
var roleClaimer = require('role.claimer');
var advSpawn = require('advSpawn');
var roleHealer = require('role.healer');

module.exports.loop = function () 
{
    
    var numFighters = 0;
    var numRangers = 0;
    var numTanks = 0;
    var numHealers = 0;
    var numScouts = 0;
    var numClaimers = 0;

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) 
        {
            var Home = Memory.creeps[name].home;
            var Role = Memory.creeps[name].role;
            if(Memory.rooms[Home])
            {
                if(Role == 'harvester')
                {
                    Game.rooms[Home].memory.numHarvesters--;
                }
                else if(Role == 'upgrader')
                {
                    Game.rooms[Home].memory.numUpgraders--;
                }
                else if(Role == 'builder')
                {
                    Game.rooms[Home].memory.numBuilders--;
                }
            }
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
        else
        {
            var creep = Game.creeps[name];
            if(creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
    
            else if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
    
            else if(creep.memory.role == 'builder'){
                roleBuilder.run(creep);
            }
            
            if(Game.flags.SiegePhase2)
            {
                if(creep.memory.role == 'fighter')
                {
                    roleFighter.run(creep);
                    numFighters++;
                }
                else if(creep.memory.role == 'ranger')
                {
                    roleRanged.run(creep);
                    numRangers++;
                }
            }
            else if(Game.flags.SiegePhase1)
            {
                if(creep.memory.role == 'tank')
                {
                    roleTank.run(creep);
                    numTanks++;
                }
                if(creep.memory.role == 'healer')
                {
                    roleHealer.run(creep)
                    numHealers++;
                }
            }
            if(Game.flags.Scout && creep.memory.role == 'scout')
            {
                roleScout.run(creep);
                numScouts++;
            }
            if(Game.flags.Claim && creep.memory.role == 'claimer')
            {
                roleClaimer.run(creep);
                numClaimers++;
            }
        }
    }

    var newName;
    
    for(var name in Memory.rooms)
    {
        if(Memory.rooms[name].numHarvesters < 1)
        {
            newName = 'Harvester' + name + Memory.rooms[name].numHarvesters + 1;
            advSpawn.worker(Game.spawns['Spawn1'], newName, 'harvester', name);
        }
        else if(Memory.rooms[name].numUpgraders < 1)
        {
            newName = 'Upgrader' + name + Memory.rooms[name].numUpgraders + 1;
            advSpawn.worker(Game.spawns['Spawn1'], newName, 'upgrader', name);
        }
        else if(Memory.rooms[name].numBuilders < 1)
        {
            newName = 'Builder' + name + Memory.rooms[name].numBuilders + 1;
            advSpawn.worker(Game.spawns['Spawn1'], newName, 'builder', name);
        }
    }


    
    if(Game.flags.SiegePhase2 && numRangers < 1 && Game.spawns['Spawn1'].room.energyCapacityAvailable == Game.spawns['Spawn1'].room.energyAvailable)
    {
        newName = 'Ranger' + Game.time;
        advSpawn.ranged(Game.spawns['Spawn1'], newName, 'ranger', Game.spawns['Spawn1'].room);
    }
    else if(Game.flags.SiegePhase1 && Game.spawns['Spawn1'].room.energyCapacityAvailable == Game.spawns['Spawn1'].room.energyAvailable)
    {
        console.log('here');
        if(numHealers < 1)
        {
            newName = 'Healer' + Game.time;
            advSpawn.healer(Game.spawns['Spawn1'], newName, 'healer', Game.spawns['Spawn1'].room);
        }
        if(numTanks < 1)
        {
            newName = 'Tank' + Game.time;
            advSpawn.tank(Game.spawns['Spawn1'], newName, 'tank', Game.spawns['Spawn1'].room);
        }
    }
    
    if(Game.flags.Scout && Game.spawns['Spawn1'].room.energyCapacityAvailable == Game.spawns['Spawn1'].room.energyAvailable)
    {
        newName = 'Scout' + Game.time;
        if(numScouts < 1)
        {
            advSpawn.ranged(Game.spawns['Spawn1'], newName, 'scout', Game.spawns['Spawn1'].room.name);
        }
    }
    if(Game.flags.Claim && Game.spawns['Spawn1'].room.energyCapacityAvailable == Game.spawns['Spawn1'].room.energyAvailable && numClaimers < 1)
    {
        newName = 'Claimer' + Game.time;
        advSpawn.claimer(Game.spawns['Spawn1'], newName, 'claimer', Game.spawns['Spawn1'].room);
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
    var tower = Game.getObjectById('5a49d0c2ed9f40288cdf02e0')
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
