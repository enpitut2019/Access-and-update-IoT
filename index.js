if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
    ethereum.enable()
   web3.eth.getAccounts((error, result) => {
    acc = result[0];
    $('#YoutAccount').text('Your Account is '+acc);
})

const group_contract = "0xedc7cda832a934664fc1489e813fa5bdf88f3f69"; 
const communication_contract = "0x1c9a9cfbeb386ef460eaa4bc4ca7e23527c96161"; 
//コントラクトを更新するたびに変更必要
  
const communication_abi=[
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
	}
]


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
commu_cnt=web3.eth.contract(communication_abi).at(communication_contract)


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
	GID=document.forms.id_form2.join.value.split(",");
    console.log("uw")

    group_cnt
    .requestJoin(GID[0],GID[1],{
        from: acc,
        gas: 1000000,
	},(error,result)=>{})
}

function getAuthenticatedMembers(){
	document.getElementById("authenticated").innerHTML = "";
    group_cnt
    .getAuthenticatedMembers.call(
    (error,res)=>{
    if(!error){
		console.log("wawa")
		for(a=0;a<res.length;a++){
			models=res[a]
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

//     group_cnt
//     .updateinfo(modelHash,modelState,{
//         from: acc,
//         gas: 1000000,
// },(error,result)=>{
// })
// }

function getModels(){
	document.getElementById("hashedmodels").innerHTML = "";
    group_cnt
    .getModels.call(
    (error,res)=>{
    if(!error){
		for(a=0;a<res.length;a++){
		models=res[a]
		console.log("wawa")
		document.getElementById("hashedmodels").innerHTML +="<br>"+ models;
		}
    }
	}
	)

}






				

function getIsSecure(){
	addr=document.forms.id_form3.che.value;

    group_cnt
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

var title, content, txtArea
function onInitFs_w(fs) {
	// titleでファイル名決定
	  fs.root.getFile(title, {create: true, exclusive: false}, function(fileEntry) {
		fileEntry.createWriter(function(fileWriter) {
			 fileWriter.onerror = function(e) {
				errorHandler(e)
			  };
			  fileWriter.onwriteend = function(e) {
				   if (fileWriter.length === 0) {
					// content　が書き込む内容
					var blob = new Blob([content], {type: "text/pain"});
					fileWriter.write(blob);
				} else {
					  console.log('Write completed.' + title);
				}
			  };
			  fileWriter.truncate(0);
		}, errorHandler);
	  }, errorHandler);
}

function WriteFile(_title, _content){
	title = _title;
	content = _content;
	window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

	  window.requestFileSystem(window.TEMPORARY, 1*1024*1024, onInitFs_w, errorHandler);
}

function onInitFs_r(fs) {

	fs.root.getFile(acc, {}, function(fileEntry) {
  
	  // Get a File object representing the file,
	  // then use FileReader to read its contents.
	  fileEntry.file(function(file) {
		 var reader = new FileReader();
  
		 reader.onloadend = function(e) {
		   /*var txtArea = document.createElement('textarea');
		   txtArea.value = this.result;*/
		   $('#firmware').text(this.result)
		   document.body.appendChild(txtArea);
		 };
  
		 reader.readAsText(file);
	  }, errorHandler);
  
	}, errorHandler);
  
}

function GetFile(){
	window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

	window.requestFileSystem(window.TEMPORARY, 1*1024*1024, onInitFs_r, errorHandler);
}
  

function errorHandler(e) {
	var msg = '';

	switch (e.code) {
		case FileError.QUOTA_EXCEEDED_ERR:
			msg = 'QUOTA_EXCEEDED_ERR';
			break;
		  case FileError.NOT_FOUND_ERR:
			msg = 'NOT_FOUND_ERR';
			break;
		  case FileError.SECURITY_ERR:
			msg = 'SECURITY_ERR';
			break;
		  case FileError.INVALID_MODIFICATION_ERR:
			msg = 'INVALID_MODIFICATION_ERR';
			break;
		  case FileError.INVALID_STATE_ERR:
			msg = 'INVALID_STATE_ERR';
			break;
		  default:
			   msg = 'Unknown Error';
			break;
	};

	console.log('Error: ' + msg);
}