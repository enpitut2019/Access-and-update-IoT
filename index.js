if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
    ethereum.enable()
   web3.eth.getAccounts((error, result) => {
    acc = result[0];
    $('#YoutAccount').text('Your Account is '+acc);
})

const group_contract = "0x3cdf2e021142f6b2345b12ad4e48f063b0b2c04f"; 
//コントラクトを更新するたびに変更必要

const group_abi=[
	{
		"constant": true,
		"inputs": [],
		"name": "getModels",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "follower",
				"type": "address"
			}
		],
		"name": "removeMember",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getGid",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getAllowedMembers",
		"outputs": [
			{
				"name": "",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "createGroup",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_var",
				"type": "string"
			}
		],
		"name": "getHash",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "follower",
				"type": "address"
			}
		],
		"name": "addMember",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "admin",
				"type": "address"
			},
			{
				"name": "ownmodel",
				"type": "string"
			}
		],
		"name": "requestJoin",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getAuthenticatedMembers",
		"outputs": [
			{
				"name": "",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]


group_cnt=web3.eth.contract(group_abi).at(group_contract)


function createGroup(){
    console.log("wao")
    group_cnt
    .createGroup((error,result)=>{
	}
)
}

function addMember(){
	console.log("uo")

    mem=document.forms.id_form1.add.value;
    group_cnt
    .addMember(mem,{
        from: acc,
        gas: 1000000,
},(error,result)=>{
})
}

function requestJoin(){
	GID=document.forms.id_form2.join.value;
    console.log("uw")

    group_cnt
    .requestJoin(GID,{
        from: acc,
        gas: 1000000,
},(error,result)=>{
})
}

function getAuthenticatedMembers(){

    group_cnt
    .getAuthenticatedMembers.call(
    (error,res)=>{
    if(!error){
		console.log("wawa")
        $('#authenticated').text(res)
    }
	}
	)

}

function informgrp(){

    group_cnt
    .getModels.call(
    (error,res)=>{
    if(!error){
		console.log("wawa")
        $('#hashedmodels').text(res)
    }
	}
	)

}

function getModels(){

    group_cnt
    .getModels.call(
    (error,res)=>{
    if(!error){
		console.log("wawa")
        $('#hashedmodels').text(res)
    }
	}
	)

}



}else{
        document.write('Install <a href="https://metamask.io">METAMASK</a>')
}

    

