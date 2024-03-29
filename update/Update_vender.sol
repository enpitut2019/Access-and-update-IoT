pragma solidity ^0.5.1;

// 開発者側の処理
contract Vender {
    mapping(bytes32=>uint256) public ver; // モデルに対応したバージョン番号
    mapping(bytes32=>mapping(uint256=>string)) verfier; // モデルのバージョンに対応したファームウェアのハッシュ値(検証用)
    mapping(bytes32=>uint8) public model_state; // 0 safe, 1 脆弱性含む
    string[] public up_model; // 公開したアップデートファイルに対応したモデル名
    
    event UpNewProgram(address indexed from, string indexed model, string phash, uint256 ver);
    event BadModel(address indexed from, string indexed model);
    event SafeModel(address indexed from, string indexed model);
    
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
        model_state[model_hash] = 0;
        emit UpNewProgram(msg.sender, _model, phash, ver[model_hash]);
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
        emit BadModel(msg.sender, _model);
    }
    
    // モデルの状態を安全へ変更
    function safeModel(string memory _model) public{
        bytes32 model_hash = getHash(_model);
        model_state[model_hash] = 0;
        emit SafeModel(msg.sender, _model);
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
