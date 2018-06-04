const path = require('path');
const fs = require('fs');
const solc = require('solc');
const util = require('util');


const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');
const source = fs.readFileSync(lotteryPath, 'utf8');


const ok = solc.compile(source, 1).contracts[':Lottery'];
module.exports.lottery = solc.compile(source, 1).contracts[':Lottery'];
//console.log(solc.compile(source, 1));
//console.log(util.inspect(ok, false, null))
