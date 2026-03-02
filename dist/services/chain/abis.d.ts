/**
 * ABIs for on-chain interactions.
 * Aligned to FabricRegistry.sol and FabricIdentity.sol contracts.
 */
export declare const ERC20_ABI: readonly [{
    readonly name: "balanceOf";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "account";
        readonly type: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
}, {
    readonly name: "allowance";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "owner";
        readonly type: "address";
    }, {
        readonly name: "spender";
        readonly type: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
}, {
    readonly name: "approve";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly name: "spender";
        readonly type: "address";
    }, {
        readonly name: "value";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
    }];
}, {
    readonly name: "transfer";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly name: "to";
        readonly type: "address";
    }, {
        readonly name: "value";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
    }];
}, {
    readonly name: "transferFrom";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly name: "from";
        readonly type: "address";
    }, {
        readonly name: "to";
        readonly type: "address";
    }, {
        readonly name: "value";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
    }];
}, {
    readonly name: "decimals";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint8";
    }];
}];
export declare const ERC8004_REGISTRY_ABI: readonly [{
    readonly name: "registerAgent";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly name: "name";
        readonly type: "string";
    }, {
        readonly name: "category";
        readonly type: "string";
    }, {
        readonly name: "endpoint";
        readonly type: "string";
    }];
    readonly outputs: readonly [{
        readonly name: "agentId";
        readonly type: "uint256";
    }];
}, {
    readonly name: "updateAgent";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly name: "agentId";
        readonly type: "uint256";
    }, {
        readonly name: "newEndpoint";
        readonly type: "string";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "deactivateAgent";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly name: "agentId";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "reactivateAgent";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly name: "agentId";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "updateReputation";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly name: "agentId";
        readonly type: "uint256";
    }, {
        readonly name: "newScore";
        readonly type: "uint256";
    }, {
        readonly name: "additionalInteractions";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "batchUpdateReputation";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly name: "agentIds";
        readonly type: "uint256[]";
    }, {
        readonly name: "scores";
        readonly type: "uint256[]";
    }, {
        readonly name: "interactions";
        readonly type: "uint256[]";
    }];
    readonly outputs: readonly [];
}, {
    readonly name: "getAgent";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "agentId";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "owner";
            readonly type: "address";
        }, {
            readonly name: "endpoint";
            readonly type: "string";
        }, {
            readonly name: "category";
            readonly type: "string";
        }, {
            readonly name: "name";
            readonly type: "string";
        }, {
            readonly name: "reputationScore";
            readonly type: "uint256";
        }, {
            readonly name: "totalInteractions";
            readonly type: "uint256";
        }, {
            readonly name: "registeredAt";
            readonly type: "uint256";
        }, {
            readonly name: "active";
            readonly type: "bool";
        }];
    }];
}, {
    readonly name: "getAgentsByCategory";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "category";
        readonly type: "string";
    }, {
        readonly name: "offset";
        readonly type: "uint256";
    }, {
        readonly name: "limit";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "owner";
            readonly type: "address";
        }, {
            readonly name: "endpoint";
            readonly type: "string";
        }, {
            readonly name: "category";
            readonly type: "string";
        }, {
            readonly name: "name";
            readonly type: "string";
        }, {
            readonly name: "reputationScore";
            readonly type: "uint256";
        }, {
            readonly name: "totalInteractions";
            readonly type: "uint256";
        }, {
            readonly name: "registeredAt";
            readonly type: "uint256";
        }, {
            readonly name: "active";
            readonly type: "bool";
        }];
    }];
}, {
    readonly name: "getAgentsByOwner";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "ownerAddr";
        readonly type: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256[]";
    }];
}, {
    readonly name: "totalAgents";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
}, {
    readonly name: "AgentRegistered";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly name: "agentId";
        readonly type: "uint256";
        readonly indexed: true;
    }, {
        readonly name: "owner";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "name";
        readonly type: "string";
        readonly indexed: false;
    }, {
        readonly name: "category";
        readonly type: "string";
        readonly indexed: false;
    }, {
        readonly name: "endpoint";
        readonly type: "string";
        readonly indexed: false;
    }];
}, {
    readonly name: "AgentUpdated";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly name: "agentId";
        readonly type: "uint256";
        readonly indexed: true;
    }, {
        readonly name: "newEndpoint";
        readonly type: "string";
        readonly indexed: false;
    }];
}, {
    readonly name: "ReputationUpdated";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly name: "agentId";
        readonly type: "uint256";
        readonly indexed: true;
    }, {
        readonly name: "newScore";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "totalInteractions";
        readonly type: "uint256";
        readonly indexed: false;
    }];
}];
export declare const FABRIC_IDENTITY_ABI: readonly [{
    readonly name: "mintIdentity";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly name: "to";
        readonly type: "address";
    }, {
        readonly name: "registryId";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "tokenId";
        readonly type: "uint256";
    }];
}, {
    readonly name: "registryIdOf";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "tokenId";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
}, {
    readonly name: "tokenOfRegistryId";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "registryId";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
}, {
    readonly name: "ownerOf";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "tokenId";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
    }];
}, {
    readonly name: "balanceOf";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly name: "owner";
        readonly type: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
}, {
    readonly name: "totalSupply";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
}, {
    readonly name: "IdentityMinted";
    readonly type: "event";
    readonly inputs: readonly [{
        readonly name: "tokenId";
        readonly type: "uint256";
        readonly indexed: true;
    }, {
        readonly name: "to";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "registryId";
        readonly type: "uint256";
        readonly indexed: true;
    }];
}];
//# sourceMappingURL=abis.d.ts.map