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
    mapping(address => string) public addrTomodel;
    
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


                modelToFollowers[hashedModel].push(msg.sender); //model名とデバイスアドレスのマッピング//無くてもいい?
                hasModels[admin].push(hashedModel);//adminの担当カ所のfollowerのモデル
                isSecure[hashedModel]=0;
                addrTomodel[msg.sender] = ownmodel; //　アドレスに対してモデル名をマッピング
               
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
}


pragma solidity ^0.5.1;

// 開発者側の処理
contract Vender {
    mapping(bytes32=>uint256) public ver; // モデルに対応したバージョン番号
    mapping(bytes32=>mapping(uint256=>string)) verfier; // モデルのバージョンに対応したファームウェアのハッシュ値(検証用)
    mapping(bytes32=>uint8) public model_state; // 0 safe, 1 脆弱性含む
    string[] public up_model; // 公開したアップデートファイルに対応したモデル名
    
    constructor() public{}
    
    // ハッシュ関数(文字列 -> ハッシュ値)　文字列の比較に使用
    function getHash(string memory _var) public pure returns (bytes32){
        byte b = 0x00;
        uint8 i = 0;
        return keccak256(abi.encodePacked(b, i, _var));
    }
    
    // モデル名に対応したファームウェアのハッシュ値を保存
    function upNewProgram(string memory phash, string memory _model) public{
        bytes32 model_hash = getHash(_model);
        ver[model_hash]+=1; //　バーションは１から
        verfier[model_hash][ver[model_hash]] = phash;
        up_model.push(_model);
    }
    
    // モデルの検証　受け取ったハッシュ値と保存されてる最新のファームウェアのハッシュ値を、ハッシュ値で比較
    // string　の比較がsollidityでないため
    function verify(string memory _hash, string memory _model) view public returns(bool){
        bytes32 model_hash = getHash(_model);
        return getHash(verfier[model_hash][ver[model_hash]]) == getHash(_hash);
    }
    
    // モデルの最新のバージョン番号を取得
    function getVer(string memory _model) view public returns (uint256){
        bytes32 model_hash = getHash(_model);
        return ver[model_hash];
    }
    
    // モデルの最新のファームウェアのハッシュ値を返す
    function getVerifier(string memory _model, uint256 _id) view public returns (string memory) {
        bytes32 model_hash = getHash(_model);
        return verfier[model_hash][_id];
    }
    
    // モデルの状態を危険へ変更
    function badModel(string memory _model) public{
        bytes32 model_hash = getHash(_model);
        model_state[model_hash] = 1;
    }
    
    // モデルの状態を安全へ変更
    function safeModel(string memory _model) public{
        bytes32 model_hash = getHash(_model);
        model_state[model_hash] = 0;
    }
    
    // モデルの状態を取得
    function getState(string memory _model) view public returns(uint8){
        bytes32 model_hash = getHash(_model);
        return model_state[model_hash];
    }
    
    // モデルの状態を入手(リストから)
    function getModelStates(bytes32[] memory _models, uint8[] memory _states) view public returns(uint8[] memory){
        for(uint256 i = 0; i < _models.length; i++){
            _states[i] = model_state[_models[i]];
        }
        return _states;
    }
    
    // 最新のアップデート内容の取得(モデル名とバージョン名)
    function getUpInfo() view public returns(string memory, uint256){
        return (up_model[up_model.length - 1], getVer(up_model[up_model.length - 1]));
    }
}
