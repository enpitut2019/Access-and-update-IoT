var acc
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
    ethereum.enable()
   web3.eth.getAccounts((error, result) => {
    acc = result[0];
    console.log("a; "+ acc)
    GetFile();
    })


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
}