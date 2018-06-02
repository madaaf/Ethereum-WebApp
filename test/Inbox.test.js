const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const provider = ganache.provider();
const web3 = new Web3(provider);

const { interface, bytecode } = require('../compile');

let accounts;
let inbox;
let inboxChanged;
// Infura API : 1GBYLXJ42UwX5aC5uyZU

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  // Use one of those accounts to deploy the contract
  // deploy to a local test network / real test network (Rinkeby)
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi there!'] })
    .send({ from: accounts[0], gas: '1000000' });

  inbox.setProvider(provider);
});

describe('Inbox', () => {

  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });

  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Hi there!');
  });

  it('can change mmessage', async () => {
    await inbox.methods.setMessage('By there !').send({ from: accounts[0], gas: '1000000' });
    const message = await inbox.methods.message().call();
    assert.equal(message,'By there !');
  });

});
