const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { interface, bytecode} = require('../compile');

const web3 = new Web3(ganache.provider());

// Flow :
// mocha starts
// deploy a new contract
// manipulate the cntract
// make an assertion about the contract

let accounts;
let inbox;

beforeEach(async ()=>{
  // get a lost of all account
  // web3.eth.getAccounts().then(fetchAccounts=>{
  //   console.log(fetchAccounts);
  // })
  accounts = await web3.eth.getAccounts();
  // use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface)).deploy({ data: bytecode, arguments:['Hi there !']}).send({from: accounts[0], gas:'1000000'});

});

describe('deploy contract', () => {
  it('okok ', ()=>{
    console.log(accounts);
    console.log(inbox);
  })
});
