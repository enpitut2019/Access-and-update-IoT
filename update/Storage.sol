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