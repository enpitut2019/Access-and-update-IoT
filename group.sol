
    
pragma solidity ^0.5.1;

import './update/Update_vender.sol';

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
    mapping(address => bytes32)followerToModel;//removeで追加
    mapping(bytes32 => uint8) isSecure;//初期値0安全,モデルのハッシュ値で,そのモデル化が安全かチェック
    mapping(address => bytes32[]) hasModels;
  
    bytes32 hashedModel;
    bytes32[] DangerDevices; //function updateで使う,modelに対応するデバイス群
    mapping(address => string) public addrTomodel;
    uint256 count=0;//removeMemberで使う

    
    Vender public ven;

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
    
    constructor(address _vender) public{
        ven = Vender(_vender);
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
                addrTomodel[msg.sender] = ownmodel; //　アドレスに対してモデル名をマッピング
                followerToModel[msg.sender]=hashedModel;
                modelToFollowers[hashedModel].push(msg.sender); //model名とデバイスアドレスのマッピング//無くてもいい?
                isSecure[hashedModel]=0;
                
                if(hasModels[admin].length>0){
                for(j=0;j<hasModels[admin].length;j++){
                     if(hasModels[admin][j] == hashedModel){//既に同じmodelが存在するか
                     }else{
                         hasModels[admin].push(hashedModel);
                         break;
                     }
                }
                }else{
                    hasModels[admin].push(hashedModel);
                }
                
           
               
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
        isFollower[follower]=false;
         for(i = 0; i<authenticatedMembers[msg.sender].length; i++){
             if(authenticatedMembers[msg.sender][i] == follower){
                 authenticatedMembers[msg.sender][i]=address(0x00);
                 allowedMembers[msg.sender][i]=address(0x00);
                 
             }
         }
         
        for(j = 0; j<authenticatedMembers[msg.sender].length;j++){
                 if(followerToModel[authenticatedMembers[msg.sender][j]] == followerToModel[follower]){//同一modelが1つだけの場合
                     count+=1;
                 }
        }
          if(count<1){//被っているモデルの機器(address)がなかったら
              for(k = 0;k<hasModels[msg.sender].length;k++){//hasModelsの何番目のモデルかわからないのでモデルか分からないので舐める
                  if(hasModels[msg.sender][k]==followerToModel[follower]){
                   hasModels[msg.sender][k]=bytes32(0x00);
                  }
              }
             }
              count=0;
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
    
    function getModels() public view returns( bytes32[] memory ){
        return hasModels[msg.sender];
    }
    
    // モデルの状態を入手
    function getIsSecure(string memory _model)public view returns(uint8){
        return ven.getState(_model); 
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
    
    // 管理しているアドレスの状態を入手(モデルがセーフかアウトか)
    function isSecureAdder(address _adder) public view returns(uint8){
        return ven.getState(addrTomodel[_adder]); 
    }
    
    // 管理しているアドレスの状態リストを返す
    function isSecureList(uint8[] memory _inputs) public returns (uint8[] memory){
        for(i = 0; i < allowedMembers[msg.sender].length; i++){
            _inputs[i] = isSecureAdder(allowedMembers[msg.sender][i]);
        }
        return _inputs;
    }
    
    // 該当するモデルを管理しているかどうか(アップデート時に使用)
    function searchModel(string memory _model) view public returns(address[] memory){
        bytes32 model_hash = getHash(_model);
        return modelToFollowers[model_hash];
    }
}

contract Communicate is Group{
    mapping(address=>mapping(address=>string[])) public strage;
    
    event SendData(address _from, address _to);
    event StoreData(address _dataowner, address _from, string _data);
    event GetData(address _sender, address _from, string _data);
    
    constructor(address _vender) Group(_vender) public{}
    
    function sendData(address _to,  string memory _data) public{
        emit SendData(_to,msg.sender);
        if(isSecureAdder(msg.sender)==0 && belongTo[msg.sender] != 0 && belongTo[msg.sender] == belongTo[_to]){
            if(isSecureAdder(_to) == 1) revert("アクセス先が危険です");
            strage[_to][msg.sender].push(_data);
            emit StoreData(_to, msg.sender, _data);
        }else{
            revert("不正なアクセスです");
        }
    }
    
    function getData(address _from) view public returns(string memory){
        if(isSecureAdder(msg.sender)==0 && belongTo[msg.sender] != 0 && belongTo[msg.sender] == belongTo[_from]){
            if(isSecureAdder(_from) == 1) revert("アクセス先が危険です");
            return strage[msg.sender][_from][strage[msg.sender][_from].length-1];
        }else{
            revert("不正なアクセスです");
        }
    }
    
    function access(address _to)view public returns(uint8){
        if(isSecureAdder(msg.sender)==0 && belongTo[msg.sender] != 0 && belongTo[msg.sender] == belongTo[_to]){
//sender is safe/sender is belong to group / sender and receiver belong to the same group
        if(isSecureAdder(_to) == 1) {
            return 1; //access先は危険
        }else{
            return 0;//access先は安全 //同じグループ
        }
        
    }
    
}
}

