pragma solidity ^0.5.1;


contract Group{
    address[] admins;
    uint256 groupId=0;
    mapping(address => uint256) ownerToGid;
    mapping(address=>address[]) allowedMembers;
    mapping(address=>address[]) authenticatedMembers; // 認証済みメンバー
    mapping(address=>uint256) belongTo;
    uint8 i;
    bool isAdmin;

      modifier onlyOwner(){
          for(i = 0; i<admins.length; i++){
              if(msg.sender==admins[i]){
                  isAdmin = true;
                  }
                }
            if(!isAdmin){
                revert("not allowed");
                _;
                }else{
                    isAdmin = false;
                }
            }

    function createGroup() public{
        groupId++;
        admins.push(msg.sender);
        ownerToGid[msg.sender] = groupId;
    }

    function addMember(address someone) public {
        allowedMembers[msg.sender].push(someone);
    }

    function requestJoin(address admin)public{
        for(i = 0; i<allowedMembers[admin].length; i++){
            if(msg.sender == allowedMembers[admin][i]){
                authenticatedMembers[admin].push(msg.sender);
                belongTo[msg.sender] = ownerToGid[admin];
            }
        }
    }

    function getAuthenticatedMembers()public view returns(address[] memory){//onlyOwnerにしたい
        return authenticatedMembers[msg.sender];
    }

}

contract Communicate is Group{
    mapping(address=>mapping(address=>string[])) public strage;
    
    event SendData(address _from, address _to);
    event StoreData(address _dataowner, address _from, string _data);
    event GetData(address _sender, address _from, string _data);
    
    function sendData(address _to,  string memory _data) public{
        emit SendData(_to,msg.sender);
        if(belongTo[msg.sender] != 0 && belongTo[msg.sender] == belongTo[_to]){
            strage[_to][msg.sender].push(_data);
            emit StoreData(_to, msg.sender, _data);
        }else{
            revert("不正なアクセスです");
        }
    }
    
    function getData(address _from) view public returns(string memory){
        if(belongTo[msg.sender] != 0 && belongTo[msg.sender] == belongTo[_from]){
            return strage[msg.sender][_from][strage[msg.sender][_from].length-1];
        }else{
            revert("不正なアクセスです");
        }
    }
}