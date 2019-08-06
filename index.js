if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
    ethereum.enable()
   web3.eth.getAccounts((error, result) => {
    acc = result[0];
    $('#YoutAccount').text('Your Account is '+acc);
})


const group_contract = "0x1c484187e8783e39fd17ebbb7c4d07d239a101d4"; 
const communication_contract = "0x0dbd3828ad98292ec73dade197d0b9b776076cd0"; 
//コントラクトを更新するたびに変更必要
  
const communication_abi=[
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
		"inputs": [],
		"name": "createGroup",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_inputs",
				"type": "uint8[]"
			}
		],
		"name": "isSecureList",
		"outputs": [
			{
				"name": "",
				"type": "uint8[]"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
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
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_data",
				"type": "string"
			}
		],
		"name": "sendData",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "hashed",
				"type": "bytes32[]"
			},
			{
				"name": "goodbad",
				"type": "uint8[]"
			}
		],
		"name": "updateinfo",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_vender",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_to",
				"type": "address"
			}
		],
		"name": "SendData",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_dataowner",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_data",
				"type": "string"
			}
		],
		"name": "StoreData",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_sender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_data",
				"type": "string"
			}
		],
		"name": "GetData",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			}
		],
		"name": "access",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "addrTomodel",
		"outputs": [
			{
				"name": "",
				"type": "string"
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
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getDangerDevices",
		"outputs": [
			{
				"name": "",
				"type": "bytes32[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_from",
				"type": "address"
			}
		],
		"name": "getData",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
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
		"constant": true,
		"inputs": [
			{
				"name": "_model",
				"type": "string"
			}
		],
		"name": "getIsSecure",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getModels",
		"outputs": [
			{
				"name": "",
				"type": "bytes32[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_adder",
				"type": "address"
			}
		],
		"name": "isSecureAdder",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_model",
				"type": "string"
			}
		],
		"name": "searchModel",
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
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "strage",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "ven",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]


//commu_cnt=web3.eth.contract(group_abi).at(group_contract)
commu_cnt=web3.eth.contract(communication_abi).at(communication_contract)


function createGroup(){
    console.log("wao")
    commu_cnt
    .createGroup((error,result)=>{
	}
)
}

function addMember(){
	console.log("uo")

    mem=document.forms.id_form1.add.value;
    commu_cnt
    .addMember(mem,{
        from: acc,
        gas: 1000000,
},(error,result)=>{
})
}

function removeMember(){
	console.log("uo")

    memb=document.forms.delete.del.value;
    commu_cnt
    .removeMember(memb,{
        from: acc,
        gas: 1000000,
},(error,result)=>{
})
}

function requestJoin(){
	GID=document.forms.id_form2.join.value.split(",");
    console.log("uw")

    commu_cnt
    .requestJoin(GID[0],GID[1],{
        from: acc,
        gas: 1000000,
	},(error,result)=>{})
}

function getAuthenticatedMembers(){
	document.getElementById("authenticated").innerHTML = "";
    commu_cnt
    .getAuthenticatedMembers.call(
    (error,res)=>{
    if(!error){
		console.log("wawa")
		for(a=0;a<res.length;a++){
			models=res[a]
			if(models=="0x0000000000000000000000000000000000000000"){
				continue;
			}
			console.log("wawa")
			document.getElementById("authenticated").innerHTML +="<br>"+ models;
			}
	
    }
	}
	)

}



// function changeInfo(){

// 	// modelHash=document.forms.id_form3.cmodel.value;
// 	// modelState=document.forms.id_form3.cstate.value;
// 	modelHash=[]
// 	modelHash.push(document.forms.id_form3.cmodel.value)
// 	modelState=[]
// 	modelState.push(document.forms.id_form3.cstate.value)
//     console.log("uw")

//     commu_cnt
//     .updateinfo(modelHash,modelState,{
//         from: acc,
//         gas: 1000000,
// },(error,result)=>{
// })
// }

function getModels(){
	document.getElementById("hashedmodels").innerHTML = "";
    commu_cnt
    .getModels.call(
    (error,res)=>{
    if(!error){
		for(a=0;a<res.length;a++){
		models=res[a]
		console.log("wawa")
		if(models=="0x0000000000000000000000000000000000000000000000000000000000000000"){
			continue;
		}
	
		document.getElementById("hashedmodels").innerHTML +="<br>"+ models;
		}
    }
	}
	)

}






				

function getIsSecure(){
	addr=document.forms.id_form3.che.value;

    commu_cnt
    .isSecureAdder(addr,
    (error,res)=>{
		if(!error){
			if(res==1){
			$('#isDanger').text("Dangerous")
			}else{
			$('#isDanger').text("No problem")
			}
		}
	})

	}

function accessCamera(){

	addr=document.forms.id_form3.access.value;
    console.log("uw")

    commu_cnt
    .access(addr,{
        from: acc,
        gas: 1000000,
},(error,res)=>{
	if(res==0){
		$('#acresult').text("Authorized")
	}else{
		$('#acresult').text("unAuthorized")
	}
})
}

}else{
        document.write('Install <a href="https://metamask.io">METAMASK</a>')
}