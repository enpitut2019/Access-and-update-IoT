pragma solidity ^0.5.8;

// とりあえずブロックチェーンをストレージとして使用
contract MyStrage {
    // モデル名でファームウェアを管理(リストの最新が最新のファームウェア)
    mapping(string=>string[]) public programs;
    address public owner;
//    modifier onlyOwner(){ if (msg.sender != owner) revert(); _; }
    
    constructor() public{
        owner = msg.sender;
    }
    
    // ハッシュ関数(文字列 -> ハッシュ値)
    function getHash(string memory _var) public pure returns (bytes32){
        byte b = 0x00;
        uint8 i = 0;
        return keccak256(abi.encodePacked(b, i, _var));
    }
    
    // モデル名(_model)を元にファームウェア(_program)を保存
    function storeProgram(string memory _model, string memory _program)public{// onlyOwner public{
        programs[_model].push(_program);
    }
    
    // モデル名とid(バージョン番号 0から)をから対応するファームウェアを取得
    function getProgram(string memory _model,uint256 _id) public view returns (string memory){
        if(_id >=programs[_model].length) revert("該当する引数は存在しません");
        return programs[_model][_id];
    }
}

// 開発者側の処理
contract Vender {
    mapping(string=>uint256) public ver; // モデルに対応したバージョン番号
    mapping(string=>mapping(uint256=>string)) verfier; // モデルのバージョンに対応したファームウェアのハッシュ値(検証用)
    
    constructor() public{
    }
    
    // ハッシュ関数(文字列 -> ハッシュ値)　文字列の比較に使用
    function getHash(string memory _var) public pure returns (bytes32){
        byte b = 0x00;
        uint8 i = 0;
        return keccak256(abi.encodePacked(b, i, _var));
    }
    
    // モデル名に対応したファームウェアのハッシュ値を保存
    function upNewProgram(string memory phash, string memory _model) public{
        ver[_model]+=1; //　バーションは１から
        verfier[_model][ver[_model]] = phash;
    }
    
    // モデルの検証　受け取ったハッシュ値と保存されてる最新のファームウェアのハッシュ値を、ハッシュ値で比較
    // string　の比較がsollidityでないため
    function verify(string memory _hash, string memory _model) view public returns(bool){
        return getHash(verfier[_model][ver[_model]]) == getHash(_hash);
    }
    
    // モデルの最新のバージョン番号を取得
    function getVer(string memory _model) view public returns (uint256){
        return ver[_model];
    }
    
    // モデルの最新のファームウェアのハッシュ値を返す
    function getVerifier(string memory _model, uint256 _id) view public returns (string memory) {
        return verfier[_model][_id];
    }
}