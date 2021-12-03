const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
      'Campaign.sol': {
        content: source,
      },
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*'],
        },
      },
    },
  };

  const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Campaign.sol'];
  //const output = solc.compile(JSON.stringify(input)).contracts;
  //console.log(input);

  fs.ensureDirSync(buildPath);

//   fs.outputFileSync(
//     path.resolve(buildPath, 'contract.json'),
//     output
//   );
  

  for(let contract in output) {
      fs.outputFileSync(
          path.resolve(buildPath, contract + '.json'),
          JSON.stringify(output[contract])
      )
  }
