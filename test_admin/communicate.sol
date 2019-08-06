
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
        if(isSecureAdder(msg.sender)==0 && belongTo[msg.sender] != 0  ){
//sender is safe/sender is belong to group / sender and receiver belong to the same group
        if(isSecureAdder(_to) == 1) {
            return 1; //access先は危険
        }else{
            if(!(belongTo[msg.sender] == belongTo[_to])) {
                return 2;//異なるグループ
            }else{
            return 0;//access先は安全 //同じグループ
        }
    }
}else if(isSecureAdder(msg.sender)==1){
     return 1;//senderが危険
}else{
    return 2; //グループに属してない
}
}
}