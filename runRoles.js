var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleFighter = require('role.fighter');
var roleTank = require('role.tank');
var roleRanged = require('role.ranged');
var roleScout = require('role.scout');
var roleClaimer = require('role.claimer');
var roleZergling = require('role.zergling');
var roleRaider = require('role.raider');
var roleRemoteWorker = require('role.remoteWorker');
var roleHealer = require('role.healer');

var runRoles =
{
    run: function(roleCount)
    {   
        roleCount.numHarvesters = 0;
        roleCount.numUpgraders = 0;
        roleCount.numBuilders = 0;
        roleCount.numFighters = 0;
        roleCount.numRangers = 0;
        roleCount.numTanks = 0;
        roleCount.numHealers = 0;
        roleCount.numScouts = 0;
        roleCount.numClaimers = 0;
        roleCount.numZerglings = 0;
        roleCount.numRaiders = 0;
        roleCount.numRemoteWorkers = 0;
        
        
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
                console.log('Clearing non-existing creep memory: RIP ', name);
            }
            else
            {
                var creep = Game.creeps[name];
                
                //console.log(Memory.allies.hasOwnProperty(creep.owner.username));
                
                if(creep.memory.role == 'harvester') {
                    roleHarvester.run(creep);
                    roleCount.numHarvesters++;
                }
        
                else if(creep.memory.role == 'upgrader') {
                    roleUpgrader.run(creep);
                    roleCount.numUpgraders++;
                }
        
                else if(creep.memory.role == 'builder'){
                    roleBuilder.run(creep);
                    roleCount.numBuilders++;
                }
                
                else if(creep.memory.role == 'remoteWorker'){
                    roleRemoteWorker.run(creep);
                    roleCount.numRemoteWorkers++;
                }
            
                else if(creep.memory.role == 'fighter')
                {
                    roleFighter.run(creep);
                    roleCount.numFighters++;
                }
                else if(creep.memory.role == 'ranger')
                {
                    roleRanged.run(creep);
                    roleCount.numRangers++;
                }
                    
                if(creep.memory.role == 'healer')
                {
                    roleHealer.run(creep)
                    roleCount.numHealers++;
                }
                if(Game.flags.Scout && creep.memory.role == 'scout')
                {
                    roleScout.run(creep);
                    roleCount.numScouts++;
                }
                if(creep.memory.role == 'raider')
                {
                    roleRaider.run(creep);
                    roleCount.numRaiders++;
                }
                if(Game.flags.Claim && creep.memory.role == 'claimer')
                {
                    roleClaimer.run(creep);
                    roleCount.numClaimers++;
                }
                if(Game.flags.RallyZergRush && Game.flags.ZergRush && creep.memory.role == 'zergling')
                {
                    if(Memory.ZergRushBeginWave)
                    {
                        creep.memory.rally = false;
                    }
                    roleZergling.run(creep);
                    roleCount.numZerglings++;
                }
            }
        }
    }
}

module.exports = runRoles;