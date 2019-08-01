pragma solidity ^0.5.1;


contract Group{
    address[] admins;
    uint256 groupId=0;
    mapping(address => uint256) ownerToGid;
    mapping(address=>address[]) allowedMembers;
    mapping(address=>address[]) authenticatedMembers;
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

    function addMember(address someone) public onlyOwner(){
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
