const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');



/**
law gentle crouch truck present dutch lunch suggest castle cute recipe primary
**/

const provider = new HDWalletProvider(
'law gentle crouch truck present dutch lunch suggest castle cute recipe primary',
'https://rinkeby.infura.io/1GBYLXJ42UwX5aC5uyZU'
);

const web3 = new Web3(provider);

// deployement to Rinkeby
const deploy = async() => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account ' + accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({data: '0x'+bytecode, arguments:['Hi there ! ']})
  .send({ gas:'1000000', from: accounts[0]});

  console.log('Contract deployed. Contact address : ', result.options.address);
};


try {
  deploy();
} catch (e) {
  console.error(`try/catch(${e})`);
}
