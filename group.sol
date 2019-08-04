pragma solidity ^0.5.1;


contract Group{
    address[] admins;
    uint256 groupId=0;
    mapping(address => uint256) adminToGid;//adminの属するグループ
    
    mapping(address=>address[]) allowedMembers;//adminが許可した機器アドレス(まだ認証されてない)
    mapping(address=>address[]) authenticatedMembers;//認証された機器
    mapping(address=>uint256) belongTo;//機器が属しているグループID
    mapping(address=>bool) isAdmin;
    mapping(address=>bool) isFollower;

    mapping(bytes32 => address[])modelToFollowers;
    mapping(bytes32 => uint8) isSecure;//初期値0安全,モデルのハッシュ値で,そのモデル化が安全かチェック
    mapping(address => bytes32[]) hasModels;
  
    bytes32 hashedModel;
    bytes32[] DangerDevices; //function updateで使う,modelに対応するデバイス群
    mapping(address => string) addrTomodel;

    uint8 i;
    uint8 j;
    uint8 k;
 
      modifier onlyOwner(){
          require(isAdmin[msg.sender] == true);
              _;
          }
      
      modifier onlyIndependent(){
          require(isAdmin[msg.sender] ==false);
          require(isFollower[msg.sender] ==false);
          _;
      }

    function createGroup() public onlyIndependent(){
        groupId++;
        admins.push(msg.sender);
        adminToGid[msg.sender] = groupId;
        isAdmin[msg.sender]=true;
    }

    function addMember(address follower) public onlyOwner() {
          for(j=0;j<allowedMembers[msg.sender].length;j++){//既に認証されていないかcheck
                     if(follower == allowedMembers[msg.sender][j]){
                         revert();
                     }
                 }
        allowedMembers[msg.sender].push(follower);
    }

    function requestJoin(address admin,string memory ownmodel)public onlyIndependent(){
        for(i = 0; i<allowedMembers[admin].length; i++){
            if(msg.sender == allowedMembers[admin][i]){
                authenticatedMembers[admin].push(msg.sender);
                belongTo[msg.sender] = adminToGid[admin];
                isFollower[msg.sender]=true;
                hashedModel=getHash(ownmodel);


                modelToFollowers[hashedModel].push(msg.sender); //model名とデバイスアドレスのマッピング//無くてもいい?
                hasModels[admin].push(hashedModel);//adminの担当カ所のfollowerのモデル
                isSecure[hashedModel]=0;
               
                //既に所有していたら追加しない操作も後で
            }
        }
    }

       function getHash(string memory _var) public pure returns (bytes32){
        byte b = 0x00;
        uint8 a = 0;
        return keccak256(abi.encodePacked(b, a, _var));
    }

  
    
    function removeMember(address follower) public onlyOwner(){
         for(i = 0; i<authenticatedMembers[msg.sender].length; i++){
             if(authenticatedMembers[msg.sender][i] == follower){
                 authenticatedMembers[msg.sender][i]=address(0x00);
                 allowedMembers[msg.sender][i]=address(0x00);
             }
         }
    }

    function getAuthenticatedMembers()public view onlyOwner() returns(address[] memory){
        return authenticatedMembers[msg.sender];
    }
    
    function getGid() public view returns(uint256){
        if(isAdmin[msg.sender]){
            return adminToGid[msg.sender];
        }else{
            return belongTo[msg.sender];
        }
    }
    
    function getAllowedMembers() public view returns(address[] memory){
        return allowedMembers[msg.sender];
    }
    
     function getModels() public view returns( bytes32[] memory ){//jsからinform通知が来たらmodel情報を返す
        return hasModels[msg.sender];
    }
    

      function getIsSecure(bytes32 hashedMdl)public view returns(uint8){
          //adminのpushしていく
        return isSecure[hashedMdl];//adminがfollowerのmodelがセーフかどうか返す
    }
    
    function getDangerDevices()public view returns(bytes32[] memory){
        return DangerDevices;
    }
    
    function updateinfo(bytes32[] memory hashed, uint8[] memory goodbad)public {//adminが呼呼ぶ
    
        for(i=0;i<hashed.length;i++){//hashed->hashedmodel
        isSecure[hashed[i]]=goodbad[i];
         //modelの情報を更新
         if(goodbad[i]==1){
             DangerDevices.push(hashed[i]);
         }
         if(goodbad[i]==0){//0だった場合
             for(j=0;j<DangerDevices.length;j++){//DangerDevice配列内かチェック
                 if(DangerDevices[j]==hashed[i]){
                     DangerDevices[j]=byte(0x00);//DangerDeviceの削除
                 }
             }
         }
        }
        
    }
    }
    
