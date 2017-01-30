'use strict';

// For geth
if (typeof dapple === 'undefined') {
  var dapple = {};
}

if (typeof web3 === 'undefined' && typeof Web3 === 'undefined') {
  var Web3 = require('web3');
}

dapple['erc20'] = (function builder () {
  var environments = {
      'develop': {
        'erc20': {
          'value': '0xbd770416a3345f91e4b34576cb804a576fa48eb1',
          'type': 'ERC20Base[65533f71a2c47b46c1b0d11c207fa7ab658817fa17c50e3eaa847c667fc8758b]'
        }
      },
      'ropsten': {
        'erc20': {
          'value': '0xd5a296b914218ce5fb2406c1ae2d595d849f306c',
          'type': 'ERC20Base[f63e6e7cf1580e28e9171f130bc6494b55ea2dee7a5a9f4bf0b232244fff49ff]'
        }
      }
    };

  function ContractWrapper (headers, _web3) {
    if (!_web3) {
      throw new Error('Must supply a Web3 connection!');
    }

    this.headers = headers;
    this._class = _web3.eth.contract(headers.interface);
  }

  ContractWrapper.prototype.deploy = function () {
    var args = new Array(arguments);
    args[args.length - 1].data = this.headers.bytecode;
    return this._class.new.apply(this._class, args);
  };

  var passthroughs = ['at', 'new'];
  for (var i = 0; i < passthroughs.length; i += 1) {
    ContractWrapper.prototype[passthroughs[i]] = (function (passthrough) {
      return function () {
        return this._class[passthrough].apply(this._class, arguments);
      };
    })(passthroughs[i]);
  }

  function constructor (_web3, env) {
    if (!env) {
      env = {
      'objects': {
        'erc20': {
          'value': '0xd5a296b914218ce5fb2406c1ae2d595d849f306c',
          'type': 'ERC20Base[f63e6e7cf1580e28e9171f130bc6494b55ea2dee7a5a9f4bf0b232244fff49ff]'
        }
      },
      'type': 'ropsten'
    };
    }
    if(typeof env === "object" && !("objects" in env)) {
      env = {objects: env};
    }
    while (typeof env !== 'object') {
      if (!(env in environments)) {
        throw new Error('Cannot resolve environment name: ' + env);
      }
      env = {objects: environments[env]};
    }

    if (typeof _web3 === 'undefined') {
      if (!env.rpcURL) {
        throw new Error('Need either a Web3 instance or an RPC URL!');
      }
      _web3 = new Web3(new Web3.providers.HttpProvider(env.rpcURL));
    }

    this.headers = {
      'Callback': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'addr',
                'type': 'address'
              },
              {
                'name': 'eventName',
                'type': 'string'
              },
              {
                'name': 'functioncall',
                'type': 'string'
              }
            ],
            'name': 'on',
            'outputs': [],
            'payable': false,
            'type': 'function'
          }
        ],
        'bytecode': '606060405234610000575b610124806100196000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680636985e72414603c575b6000565b3460005760f0600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190505060f2565b005b5b5050505600a165627a7a72305820de4e188934d9ab503f1b7b9dffe4b7753b872ff3ab8ed85e81e25869338679c20029'
      },
      'ConfigERC20': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'name',
                'type': 'bytes32'
              },
              {
                'name': 'addr',
                'type': 'address'
              }
            ],
            'name': 'export',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'txoff',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'txon',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'inputs': [],
            'payable': false,
            'type': 'constructor'
          },
          {
            'payable': false,
            'type': 'fallback'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'name',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'number',
                'type': 'uint256'
              }
            ],
            'name': 'exportNumber',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'name',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'addr',
                'type': 'address'
              }
            ],
            'name': 'exportObject',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'flag',
                'type': 'bool'
              }
            ],
            'name': 'setCalls',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'origin',
                'type': 'address'
              }
            ],
            'name': 'setOrigin',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'chaintype',
                'type': 'bytes32'
              }
            ],
            'name': 'assertChain',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'env',
                'type': 'bytes32'
              }
            ],
            'name': 'pushEnv',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'env',
                'type': 'bytes32'
              }
            ],
            'name': 'popEnv',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'addr',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'eventName',
                'type': 'string'
              },
              {
                'indexed': false,
                'name': 'functioncall',
                'type': 'string'
              }
            ],
            'name': 'on',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'input',
                'type': 'bytes'
              },
              {
                'indexed': false,
                'name': 'result',
                'type': 'uint256'
              }
            ],
            'name': 'shUint',
            'type': 'event'
          }
        ],
        'bytecode': '606060405234610000575b5b5b73bd770416a3345f91e4b34576cb804a576fa48eb1600060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555073d5a296b914218ce5fb2406c1ae2d595d849f306c600260000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555073d5a296b914218ce5fb2406c1ae2d595d849f306c600460000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b727202eeaad2c871c74c094231d1a4d28028321b600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555073127202eeaad2c871c74c094231d1a4d28028321b600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b5b6101e3806101d06000396000f30060606040523615610055576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680635067a4bd146100635780639fc288d1146100a3578063d900596c146100b2575b34610000576100615b5b565b005b34610000576100a160048080356000191690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506100c1565b005b34610000576100b0610139565b005b34610000576100bf610178565b005b7fdeb8643b9b3399f6925a9b6f1f780d90946f75267aaab1d59685d28dd846b9c382826040518083600019166000191681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a15b5050565b7fe68392b8656cb7ab571c539efc7ce5a43464478a591f773a55db9984c089f4d16001604051808215151515815260200191505060405180910390a15b565b7fe68392b8656cb7ab571c539efc7ce5a43464478a591f773a55db9984c089f4d16000604051808215151515815260200191505060405180910390a15b5600a165627a7a723058202b81922660f43610fa3490045afde6ee4b86fedf5bb34891d85709cda8efe9400029'
      },
      'DappleEnv': {
        'interface': [
          {
            'inputs': [],
            'payable': false,
            'type': 'constructor'
          }
        ],
        'bytecode': '606060405234610000575b73bd770416a3345f91e4b34576cb804a576fa48eb1600060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555073d5a296b914218ce5fb2406c1ae2d595d849f306c600260000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555073d5a296b914218ce5fb2406c1ae2d595d849f306c600460000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b6035806101226000396000f30060606040525b60005600a165627a7a72305820968b92590a24f9540c37192aff3e8229b7cff5a20e352691cbab0ea965cac8000029'
      },
      'DappleLogger': {
        'interface': [],
        'bytecode': '6060604052346000575b60358060166000396000f30060606040525b60005600a165627a7a72305820b1334ba2c16e6a5df25c32ce6c884d48530296e8c2b8a19e31a26586864439050029'
      },
      'DeployERC20': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'name',
                'type': 'bytes32'
              },
              {
                'name': 'addr',
                'type': 'address'
              }
            ],
            'name': 'export',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'txoff',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'txon',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'inputs': [],
            'payable': false,
            'type': 'constructor'
          },
          {
            'payable': false,
            'type': 'fallback'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'name',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'number',
                'type': 'uint256'
              }
            ],
            'name': 'exportNumber',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'name',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'addr',
                'type': 'address'
              }
            ],
            'name': 'exportObject',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'flag',
                'type': 'bool'
              }
            ],
            'name': 'setCalls',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'origin',
                'type': 'address'
              }
            ],
            'name': 'setOrigin',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'chaintype',
                'type': 'bytes32'
              }
            ],
            'name': 'assertChain',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'env',
                'type': 'bytes32'
              }
            ],
            'name': 'pushEnv',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'env',
                'type': 'bytes32'
              }
            ],
            'name': 'popEnv',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'addr',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'eventName',
                'type': 'string'
              },
              {
                'indexed': false,
                'name': 'functioncall',
                'type': 'string'
              }
            ],
            'name': 'on',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'input',
                'type': 'bytes'
              },
              {
                'indexed': false,
                'name': 'result',
                'type': 'uint256'
              }
            ],
            'name': 'shUint',
            'type': 'event'
          }
        ],
        'bytecode': '606060405234610000575b5b5b73bd770416a3345f91e4b34576cb804a576fa48eb1600060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555073d5a296b914218ce5fb2406c1ae2d595d849f306c600260000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555073d5a296b914218ce5fb2406c1ae2d595d849f306c600460000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b727202eeaad2c871c74c094231d1a4d28028321b600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555073127202eeaad2c871c74c094231d1a4d28028321b600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b7fdeb8643b9b3399f6925a9b6f1f780d90946f75267aaab1d59685d28dd846b9c369152d02c7e14af68000006040516109628061046f83390180828152602001915050604051809103906000f080156100005760405180807f65726332300000000000000000000000000000000000000000000000000000008152506020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a15b5b6101e38061028c6000396000f30060606040523615610055576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680635067a4bd146100635780639fc288d1146100a3578063d900596c146100b2575b34610000576100615b5b565b005b34610000576100a160048080356000191690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506100c1565b005b34610000576100b0610139565b005b34610000576100bf610178565b005b7fdeb8643b9b3399f6925a9b6f1f780d90946f75267aaab1d59685d28dd846b9c382826040518083600019166000191681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a15b5050565b7fe68392b8656cb7ab571c539efc7ce5a43464478a591f773a55db9984c089f4d16001604051808215151515815260200191505060405180910390a15b565b7fe68392b8656cb7ab571c539efc7ce5a43464478a591f773a55db9984c089f4d16000604051808215151515815260200191505060405180910390a15b5600a165627a7a723058204b863d023d6502f7f18ce979ff76f12fc395992429046653e01dbcc82335e7b5002960606040523461000057604051602080610962833981016040528080519060200190919050505b80600060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550806002819055505b505b6108df806100836000396000f30060606040523615610076576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063095ea7b31461007b57806318160ddd146100cf57806323b872dd146100f257806370a0823114610165578063a9059cbb146101ac578063dd62ed3e14610200575b610000565b34610000576100b5600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610266565b604051808215151515815260200191505060405180910390f35b34610000576100dc610359565b6040518082815260200191505060405180910390f35b346100005761014b600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610364565b604051808215151515815260200191505060405180910390f35b3461000057610196600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610624565b6040518082815260200191505060405180910390f35b34610000576101e6600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061066e565b604051808215151515815260200191505060405180910390f35b3461000057610250600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061081a565b6040518082815260200191505060405180910390f35b600081600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a3600190505b92915050565b600060025490505b90565b600081600060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410156103b257610000565b81600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101561043b57610000565b610484600060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054836108a2565b151561048f57610000565b81600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190505b9392505050565b6000600060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490505b919050565b600081600060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410156106bc57610000565b610705600060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054836108a2565b151561071057610000565b81600060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190505b92915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490505b92915050565b600082828401101590505b929150505600a165627a7a72305820a3cac541de59c39e66ee1f2fd992a7a0f623548dcc781e03a4a0a8d6233805f70029'
      },
      'ERC20': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'spender',
                'type': 'address'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'approve',
            'outputs': [
              {
                'name': 'ok',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'totalSupply',
            'outputs': [
              {
                'name': 'supply',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'from',
                'type': 'address'
              },
              {
                'name': 'to',
                'type': 'address'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'transferFrom',
            'outputs': [
              {
                'name': 'ok',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'who',
                'type': 'address'
              }
            ],
            'name': 'balanceOf',
            'outputs': [
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'to',
                'type': 'address'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'transfer',
            'outputs': [
              {
                'name': 'ok',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'owner',
                'type': 'address'
              },
              {
                'name': 'spender',
                'type': 'address'
              }
            ],
            'name': 'allowance',
            'outputs': [
              {
                'name': '_allowance',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'from',
                'type': 'address'
              },
              {
                'indexed': true,
                'name': 'to',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'Transfer',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'owner',
                'type': 'address'
              },
              {
                'indexed': true,
                'name': 'spender',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'Approval',
            'type': 'event'
          }
        ],
        'bytecode': ''
      },
      'ERC20Base': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'spender',
                'type': 'address'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'approve',
            'outputs': [
              {
                'name': 'ok',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'totalSupply',
            'outputs': [
              {
                'name': 'supply',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'from',
                'type': 'address'
              },
              {
                'name': 'to',
                'type': 'address'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'transferFrom',
            'outputs': [
              {
                'name': 'ok',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'who',
                'type': 'address'
              }
            ],
            'name': 'balanceOf',
            'outputs': [
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'to',
                'type': 'address'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'transfer',
            'outputs': [
              {
                'name': 'ok',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'owner',
                'type': 'address'
              },
              {
                'name': 'spender',
                'type': 'address'
              }
            ],
            'name': 'allowance',
            'outputs': [
              {
                'name': '_allowance',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'inputs': [
              {
                'name': 'initial_balance',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'constructor'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'from',
                'type': 'address'
              },
              {
                'indexed': true,
                'name': 'to',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'Transfer',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'owner',
                'type': 'address'
              },
              {
                'indexed': true,
                'name': 'spender',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'Approval',
            'type': 'event'
          }
        ],
        'bytecode': '60606040523461000057604051602080610962833981016040528080519060200190919050505b80600060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550806002819055505b505b6108df806100836000396000f30060606040523615610076576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063095ea7b31461007b57806318160ddd146100cf57806323b872dd146100f257806370a0823114610165578063a9059cbb146101ac578063dd62ed3e14610200575b610000565b34610000576100b5600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610266565b604051808215151515815260200191505060405180910390f35b34610000576100dc610359565b6040518082815260200191505060405180910390f35b346100005761014b600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610364565b604051808215151515815260200191505060405180910390f35b3461000057610196600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610624565b6040518082815260200191505060405180910390f35b34610000576101e6600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061066e565b604051808215151515815260200191505060405180910390f35b3461000057610250600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061081a565b6040518082815260200191505060405180910390f35b600081600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a3600190505b92915050565b600060025490505b90565b600081600060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410156103b257610000565b81600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101561043b57610000565b610484600060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054836108a2565b151561048f57610000565b81600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190505b9392505050565b6000600060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490505b919050565b600081600060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410156106bc57610000565b610705600060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054836108a2565b151561071057610000565b81600060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190505b92915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490505b92915050565b600082828401101590505b929150505600a165627a7a72305820a3cac541de59c39e66ee1f2fd992a7a0f623548dcc781e03a4a0a8d6233805f70029'
      },
      'ERC20BaseFactory': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'initial_balance',
                'type': 'uint256'
              }
            ],
            'name': 'createERC20Base',
            'outputs': [
              {
                'name': 'b',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'function'
          }
        ],
        'bytecode': '606060405234610000575b610b18806100196000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680631dd4ae771461003e575b610000565b3461000057610059600480803590602001909190505061009b565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6000816040516109628061018b83390180828152602001915050604051809103906000f080156100005790508073ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b156100005760325a03f1156100005750505060405180519050508090505b919050560060606040523461000057604051602080610962833981016040528080519060200190919050505b80600060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550806002819055505b505b6108df806100836000396000f30060606040523615610076576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063095ea7b31461007b57806318160ddd146100cf57806323b872dd146100f257806370a0823114610165578063a9059cbb146101ac578063dd62ed3e14610200575b610000565b34610000576100b5600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610266565b604051808215151515815260200191505060405180910390f35b34610000576100dc610359565b6040518082815260200191505060405180910390f35b346100005761014b600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610364565b604051808215151515815260200191505060405180910390f35b3461000057610196600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610624565b6040518082815260200191505060405180910390f35b34610000576101e6600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061066e565b604051808215151515815260200191505060405180910390f35b3461000057610250600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061081a565b6040518082815260200191505060405180910390f35b600081600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a3600190505b92915050565b600060025490505b90565b600081600060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410156103b257610000565b81600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101561043b57610000565b610484600060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054836108a2565b151561048f57610000565b81600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190505b9392505050565b6000600060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490505b919050565b600081600060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410156106bc57610000565b610705600060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054836108a2565b151561071057610000565b81600060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190505b92915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490505b92915050565b600082828401101590505b929150505600a165627a7a72305820a3cac541de59c39e66ee1f2fd992a7a0f623548dcc781e03a4a0a8d6233805f70029a165627a7a723058202277f9ca7cb843e01d346c5122bd0f96a4bbf89e2b28b2b2f5e31ee9835c09bc0029'
      },
      'ERC20Constant': {
        'interface': [
          {
            'constant': true,
            'inputs': [],
            'name': 'totalSupply',
            'outputs': [
              {
                'name': 'supply',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'who',
                'type': 'address'
              }
            ],
            'name': 'balanceOf',
            'outputs': [
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'owner',
                'type': 'address'
              },
              {
                'name': 'spender',
                'type': 'address'
              }
            ],
            'name': 'allowance',
            'outputs': [
              {
                'name': '_allowance',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          }
        ],
        'bytecode': ''
      },
      'ERC20Events': {
        'interface': [
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'from',
                'type': 'address'
              },
              {
                'indexed': true,
                'name': 'to',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'Transfer',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'owner',
                'type': 'address'
              },
              {
                'indexed': true,
                'name': 'spender',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'Approval',
            'type': 'event'
          }
        ],
        'bytecode': '6060604052346000575b60358060166000396000f30060606040525b60005600a165627a7a7230582058557948f86314b45cb579eb7cb10a36f3c9c668408ca833e5888942122699700029'
      },
      'ERC20Stateful': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'spender',
                'type': 'address'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'approve',
            'outputs': [
              {
                'name': 'ok',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'from',
                'type': 'address'
              },
              {
                'name': 'to',
                'type': 'address'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'transferFrom',
            'outputs': [
              {
                'name': 'ok',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'to',
                'type': 'address'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'transfer',
            'outputs': [
              {
                'name': 'ok',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          }
        ],
        'bytecode': ''
      },
      'ERC20Tester': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'to',
                'type': 'address'
              },
              {
                'name': 'amount',
                'type': 'uint256'
              }
            ],
            'name': 'doTransfer',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'from',
                'type': 'address'
              },
              {
                'name': 'to',
                'type': 'address'
              },
              {
                'name': 'amount',
                'type': 'uint256'
              }
            ],
            'name': 'doTransferFrom',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'target',
                'type': 'address'
              }
            ],
            'name': '_target',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'recipient',
                'type': 'address'
              },
              {
                'name': 'amount',
                'type': 'uint256'
              }
            ],
            'name': 'doApprove',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'who',
                'type': 'address'
              }
            ],
            'name': 'doBalanceOf',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'owner',
                'type': 'address'
              },
              {
                'name': 'spender',
                'type': 'address'
              }
            ],
            'name': 'doAllowance',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'payable': false,
            'type': 'fallback'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes'
              }
            ],
            'name': 'logs',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'int256'
              },
              {
                'indexed': false,
                'name': 'decimals',
                'type': 'uint256'
              }
            ],
            'name': 'log_named_decimal_int',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'uint256'
              },
              {
                'indexed': false,
                'name': 'decimals',
                'type': 'uint256'
              }
            ],
            'name': 'log_named_decimal_uint',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bool'
              }
            ],
            'name': 'log_bool',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bool'
              }
            ],
            'name': 'log_named_bool',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'uint256'
              }
            ],
            'name': 'log_uint',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'uint256'
              }
            ],
            'name': 'log_named_uint',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'int256'
              }
            ],
            'name': 'log_int',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'int256'
              }
            ],
            'name': 'log_named_int',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'address'
              }
            ],
            'name': 'log_address',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'address'
              }
            ],
            'name': 'log_named_address',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes'
              }
            ],
            'name': 'log_bytes',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes'
              }
            ],
            'name': 'log_named_bytes',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes1'
              }
            ],
            'name': 'log_bytes1',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes1'
              }
            ],
            'name': 'log_named_bytes1',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes2'
              }
            ],
            'name': 'log_bytes2',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes2'
              }
            ],
            'name': 'log_named_bytes2',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes3'
              }
            ],
            'name': 'log_bytes3',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes3'
              }
            ],
            'name': 'log_named_bytes3',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes4'
              }
            ],
            'name': 'log_bytes4',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes4'
              }
            ],
            'name': 'log_named_bytes4',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes5'
              }
            ],
            'name': 'log_bytes5',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes5'
              }
            ],
            'name': 'log_named_bytes5',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes6'
              }
            ],
            'name': 'log_bytes6',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes6'
              }
            ],
            'name': 'log_named_bytes6',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes7'
              }
            ],
            'name': 'log_bytes7',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes7'
              }
            ],
            'name': 'log_named_bytes7',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes8'
              }
            ],
            'name': 'log_bytes8',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes8'
              }
            ],
            'name': 'log_named_bytes8',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes9'
              }
            ],
            'name': 'log_bytes9',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes9'
              }
            ],
            'name': 'log_named_bytes9',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes10'
              }
            ],
            'name': 'log_bytes10',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes10'
              }
            ],
            'name': 'log_named_bytes10',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes11'
              }
            ],
            'name': 'log_bytes11',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes11'
              }
            ],
            'name': 'log_named_bytes11',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes12'
              }
            ],
            'name': 'log_bytes12',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes12'
              }
            ],
            'name': 'log_named_bytes12',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes13'
              }
            ],
            'name': 'log_bytes13',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes13'
              }
            ],
            'name': 'log_named_bytes13',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes14'
              }
            ],
            'name': 'log_bytes14',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes14'
              }
            ],
            'name': 'log_named_bytes14',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes15'
              }
            ],
            'name': 'log_bytes15',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes15'
              }
            ],
            'name': 'log_named_bytes15',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes16'
              }
            ],
            'name': 'log_bytes16',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes16'
              }
            ],
            'name': 'log_named_bytes16',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes17'
              }
            ],
            'name': 'log_bytes17',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes17'
              }
            ],
            'name': 'log_named_bytes17',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes18'
              }
            ],
            'name': 'log_bytes18',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes18'
              }
            ],
            'name': 'log_named_bytes18',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes19'
              }
            ],
            'name': 'log_bytes19',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes19'
              }
            ],
            'name': 'log_named_bytes19',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes20'
              }
            ],
            'name': 'log_bytes20',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes20'
              }
            ],
            'name': 'log_named_bytes20',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes21'
              }
            ],
            'name': 'log_bytes21',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes21'
              }
            ],
            'name': 'log_named_bytes21',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes22'
              }
            ],
            'name': 'log_bytes22',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes22'
              }
            ],
            'name': 'log_named_bytes22',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes23'
              }
            ],
            'name': 'log_bytes23',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes23'
              }
            ],
            'name': 'log_named_bytes23',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes24'
              }
            ],
            'name': 'log_bytes24',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes24'
              }
            ],
            'name': 'log_named_bytes24',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes25'
              }
            ],
            'name': 'log_bytes25',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes25'
              }
            ],
            'name': 'log_named_bytes25',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes26'
              }
            ],
            'name': 'log_bytes26',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes26'
              }
            ],
            'name': 'log_named_bytes26',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes27'
              }
            ],
            'name': 'log_bytes27',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes27'
              }
            ],
            'name': 'log_named_bytes27',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes28'
              }
            ],
            'name': 'log_bytes28',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes28'
              }
            ],
            'name': 'log_named_bytes28',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes29'
              }
            ],
            'name': 'log_bytes29',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes29'
              }
            ],
            'name': 'log_named_bytes29',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes30'
              }
            ],
            'name': 'log_bytes30',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes30'
              }
            ],
            'name': 'log_named_bytes30',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes31'
              }
            ],
            'name': 'log_bytes31',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes31'
              }
            ],
            'name': 'log_named_bytes31',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes32'
              }
            ],
            'name': 'log_bytes32',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'bytes32'
              }
            ],
            'name': 'log_named_bytes32',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'key',
                'type': 'string'
              },
              {
                'indexed': false,
                'name': 'val',
                'type': 'string'
              }
            ],
            'name': 'log_named_string',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'gas',
                'type': 'uint256'
              }
            ],
            'name': '_log_gas_use',
            'type': 'event'
          }
        ],
        'bytecode': '606060405234610000575b610835806100196000396000f30060606040523615610076576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630f24f5c8146100f35780632b4a3b31146101475780634bbb216c146101ba578063a8484938146101ed578063bc2a4dd614610241578063fa566ddd14610288575b34610000576100f15b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16600036604051808383808284378201915050925050506000604051808303816000866161da5a03f191505015156100ee57610000565b5b565b005b346100005761012d600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080359060200190919050506102ee565b604051808215151515815260200191505060405180910390f35b34610000576101a0600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919080359060200190919050506103d4565b604051808215151515815260200191505060405180910390f35b34610000576101eb600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506104ef565b005b3461000057610227600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610534565b604051808215151515815260200191505060405180910390f35b3461000057610272600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061061a565b6040518082815260200191505060405180910390f35b34610000576102d8600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506106f7565b6040518082815260200191505060405180910390f35b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb84846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b156100005760325a03f115610000575050506040518051905090505b92915050565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd8585856000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050602060405180830381600087803b156100005760325a03f115610000575050506040518051905090505b9392505050565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b50565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663095ea7b384846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b156100005760325a03f115610000575050506040518051905090505b92915050565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231836000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905090505b919050565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663dd62ed3e84846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200192505050602060405180830381600087803b156100005760325a03f115610000575050506040518051905090505b929150505600a165627a7a72305820de785df360de84c8a30c50fdc161fb37133aec2e1d11784c784e4aa96d0af8630029'
      },
      'SMS': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'number',
                'type': 'string'
              },
              {
                'name': 'message',
                'type': 'string'
              }
            ],
            'name': 'send',
            'outputs': [],
            'payable': false,
            'type': 'function'
          }
        ],
        'bytecode': '606060405234610000575b610104806100196000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063bd6de11c14603c575b6000565b3460005760d1600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190505060d3565b005b5b50505600a165627a7a7230582003306f2e706ce34ac06cf4384551b0fe5ef471b8801f68d00183f17df6e04a2f0029'
      },
      'Script': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'name',
                'type': 'bytes32'
              },
              {
                'name': 'addr',
                'type': 'address'
              }
            ],
            'name': 'export',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'txoff',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'txon',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'inputs': [],
            'payable': false,
            'type': 'constructor'
          },
          {
            'payable': false,
            'type': 'fallback'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'name',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'number',
                'type': 'uint256'
              }
            ],
            'name': 'exportNumber',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'name',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'addr',
                'type': 'address'
              }
            ],
            'name': 'exportObject',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'flag',
                'type': 'bool'
              }
            ],
            'name': 'setCalls',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'origin',
                'type': 'address'
              }
            ],
            'name': 'setOrigin',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'chaintype',
                'type': 'bytes32'
              }
            ],
            'name': 'assertChain',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'env',
                'type': 'bytes32'
              }
            ],
            'name': 'pushEnv',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'env',
                'type': 'bytes32'
              }
            ],
            'name': 'popEnv',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'addr',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'eventName',
                'type': 'string'
              },
              {
                'indexed': false,
                'name': 'functioncall',
                'type': 'string'
              }
            ],
            'name': 'on',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'input',
                'type': 'bytes'
              },
              {
                'indexed': false,
                'name': 'result',
                'type': 'uint256'
              }
            ],
            'name': 'shUint',
            'type': 'event'
          }
        ],
        'bytecode': '606060405234610000575b5b73bd770416a3345f91e4b34576cb804a576fa48eb1600060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555073d5a296b914218ce5fb2406c1ae2d595d849f306c600260000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555073d5a296b914218ce5fb2406c1ae2d595d849f306c600460000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b727202eeaad2c871c74c094231d1a4d28028321b600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555073127202eeaad2c871c74c094231d1a4d28028321b600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b6101e3806101ce6000396000f30060606040523615610055576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680635067a4bd146100635780639fc288d1146100a3578063d900596c146100b2575b34610000576100615b5b565b005b34610000576100a160048080356000191690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506100c1565b005b34610000576100b0610139565b005b34610000576100bf610178565b005b7fdeb8643b9b3399f6925a9b6f1f780d90946f75267aaab1d59685d28dd846b9c382826040518083600019166000191681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a15b5050565b7fe68392b8656cb7ab571c539efc7ce5a43464478a591f773a55db9984c089f4d16001604051808215151515815260200191505060405180910390a15b565b7fe68392b8656cb7ab571c539efc7ce5a43464478a591f773a55db9984c089f4d16000604051808215151515815260200191505060405180910390a15b5600a165627a7a723058207d3d89794e1eae5fd82e4079133a862be4aa89e37a83fb890fb8d752793183a70029'
      },
      'System': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'input',
                'type': 'string'
              }
            ],
            'name': 'to_uint',
            'outputs': [
              {
                'name': 'output',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          }
        ],
        'bytecode': '606060405234610000575b60dc806100186000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806360cfa96314603c575b6000565b34600057608e600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190505060a4565b6040518082815260200191505060405180910390f35b6000600b90505b9190505600a165627a7a723058204ace58d566d29116659938c0ebbdc625870ab24147fc6359ca4fb43e9223c7e10029'
      }
    };

    this.classes = {};
    for (var key in this.headers) {
      this.classes[key] = new ContractWrapper(this.headers[key], _web3);
    }

    this.objects = {};
    for (var i in env.objects) {
      var obj = env.objects[i];
      if(!(obj['type'].split('[')[0] in this.classes)) continue;
      this.objects[i] = this.classes[obj['type'].split('[')[0]].at(obj.value);
    }
  }

  return {
    class: constructor,
    environments: environments
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = dapple['erc20'];
}
