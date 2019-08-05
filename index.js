if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
    ethereum.enable()
   web3.eth.getAccounts((error, result) => {
    acc = result[0];
    $('#YoutAccount').text('Your Account is '+acc);
})

const group_contract = "0xedc7cda832a934664fc1489e813fa5bdf88f3f69"; 
//コントラクトを更新するたびに変更必要

const group_abi=[
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
		"inputs": [
			{
				"name": "_vender",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
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
	var html='';

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



// function changeInfo(){

// 	// modelHash=document.forms.id_form3.cmodel.value;
// 	// modelState=document.forms.id_form3.cstate.value;
// 	modelHash=[]
// 	modelHash.push(document.forms.id_form3.cmodel.value)
// 	modelState=[]
// 	modelState.push(document.forms.id_form3.cstate.value)
//     console.log("uw")

//     group_cnt
//     .updateinfo(modelHash,modelState,{
//         from: acc,
//         gas: 1000000,
// },(error,result)=>{
// })
// }

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




function getDangerDevices(){
	var response=[]
	var adder;
	document.getElementById("Models").innerHTML = "";
	group_cnt.getAllowedMembers.call((error, res)=>{
		if(!error){
			console.log("1" + res)
			for(var i = 0; i < res.length; i++){
				adder = res[i]
				group_cnt.isSecureAdder.call(res[i],(error2, res2)=>{
					console.log("2:" + res2)
					response.push(res[i]+": "+res2);
					
					if(res2==0){
						sod="安全"
					}else{
						sod="危険"
					}

					//$('#DangerModels').text(res[i]+": "+res2)
					document.getElementById("Models").innerHTML += adder+": "+sod
				})
			}
		}
	})
}
// function getDangerDevices(){
// 	var response=[]

//     group_cnt
//     .getDangerDevices.call(
//     (error,res)=>{
//     if(!error){
// 		for(i=0;i<res.length;i++){
// 			if(res[i]==0x0000000000000000000000000000000000000000000000000000000000000000){
// 				console.log('wao')
// 				continue;
// 			}else{
// 				console.log('uu')
// 				response.push(res[i])
// 			}
// 		}
// 		if(response.length<1){
// 			$('#NoDanger').text("No Dangerous Device")
// 		}else{
// 		$('#DangerModels').text(response)
// 		}
//     }
// 	}
// 	)
// }


}else{
        document.write('Install <a href="https://metamask.io">METAMASK</a>')
}

    

