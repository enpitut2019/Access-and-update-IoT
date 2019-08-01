pragma solidity ^0.5.1;


contract Group{
    address[] admins;
    uint256 groupId=0;
    mapping(address => uint256) ownerToGid;//ownerの属するグループ
    
    mapping(address=>address[]) allowedMembers;//adminが許可した機器アドレス(まだ認証されてない)
    
    mapping(address=>address[]) authenticatedMembers;//認証された機器
    mapping(address=>uint256) belongTo;//機器が属しているグループID
    mapping(address=>bool) isAdmin;
    mapping(address=>bool) isFollower;
    uint8 i;
 
      modifier onlyOwner(){
          //ifとかforで回す→×
          //require→○
          require(isAdmin[msg.sender] == true);
              _;
          }
      
      modifier onlyIndependent(){//無所属の機器のみ
          require(isAdmin[msg.sender] ==false);
          require(isFollower[msg.sender] ==false);
          _;
      }

    function createGroup() public{//グループを作る
        groupId++;
        admins.push(msg.sender);
        ownerToGid[msg.sender] = groupId;
        isAdmin[msg.sender]=true;
    }
    
    function addMember(address someone) public {//onlyOwnerにしたい
        allowedMembers[msg.sender].push(someone);
    }
    
    function requestJoin(address admin)public onlyIndependent{//グループに参加する
        for(i = 0; i<allowedMembers[admin].length; i++){
            if(msg.sender == allowedMembers[admin][i]){
                authenticatedMembers[admin].push(msg.sender);
                belongTo[msg.sender] = ownerToGid[admin];
                isFollower[msg.sender]=true;
            }
        }
    }

    function getAuthenticatedMembers()public view returns(address[] memory){//onlyOwnerにしたい
        return authenticatedMembers[msg.sender];
    }
    function getGid() public view returns(uint256){//機器のグループ情報取得
        return belongTo[msg.sender];
    }
    
}
