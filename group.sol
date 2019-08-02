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
    uint8 i;
    uint8 j;
 
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
    
    function requestJoin(address admin)public onlyIndependent(){
        for(i = 0; i<allowedMembers[admin].length; i++){
            if(msg.sender == allowedMembers[admin][i]){
                authenticatedMembers[admin].push(msg.sender);
                belongTo[msg.sender] = adminToGid[admin];
                isFollower[msg.sender]=true;
            }
        }
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
    
}
