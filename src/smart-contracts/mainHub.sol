pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

contract mainHub{

    address payable private masterOfMasters;


    constructor() public{


        masterOfMasters=msg.sender;
    }

    mapping(address=>address)public scAndAccountAddress;
    mapping(address=>User) public addressToUser;

    address[] public arrayOfSmartContracts;

    // User[] public arrayOfUsers;

    function changeMaster(address payable newMaster) external{

        require(msg.sender==masterOfMasters,'Only master can become new master');
        masterOfMasters=newMaster;
    }

    function returnAllSmartContracts() external view returns(address [] memory){
        return arrayOfSmartContracts;
    }

    function createNewUser() payable external {
        require(msg.value>=10000 && scAndAccountAddress[msg.sender]==0x0000000000000000000000000000000000000000,'Insuffcicent funds for creating new user=>10000wei');

        User oneUser=new User(msg.sender,masterOfMasters);

        address addressOfCurrentUser=address(oneUser);

        addressToUser[msg.sender]=oneUser;
        scAndAccountAddress[msg.sender]=addressOfCurrentUser;
        arrayOfSmartContracts.push(addressOfCurrentUser);
        // oneUser.transfer(msg.value);

    }
    //replicated user functions haven't found workaroung




}


contract User {

    address public owner;
    address payable internal masterica;


    constructor(address someDude,address payable master) public {
        masterica=master;
        owner=someDude;

    }

    event NewTrade(
        string encryptedData,
        address real,
        uint date
    );

    struct productDescription{
        uint256 priceWei;
        string description;
        uint256 quantity;
        string imageUrl;
        string name;
        uint256 index;
    }
    function withdrawEther(address payable where) external {
        require(msg.sender==owner || msg.sender==masterica);

        where.transfer(address(this).balance);

    }
    uint256 counter;
    productDescription[] public arrayOfItems;

    modifier onlyAdmin{
        require(msg.sender==owner,"permission not allowed");
        _;
    }

    function wipe() external{
        require(msg.sender==masterica || msg.sender==owner,'Wipe All items!');
        delete arrayOfItems;
    }
    function addItem(uint256 price,string calldata description,uint256 quantity,string calldata imageUrl, string calldata names) external onlyAdmin  {
        //function to add new mapping;


        arrayOfItems.push(productDescription(price,description,quantity,imageUrl,names,counter));
        counter++;

    }

    function updateItemByIndex(uint256 indexNum,uint256 price,string calldata description,uint256 quantity,string calldata imageUrl, string calldata names) external onlyAdmin{

        arrayOfItems[indexNum]=productDescription(price,description,quantity,imageUrl,names,indexNum);
    }

    function acceptPaymentAndEmitEvent(uint256 indexNum,uint256 quantity,string calldata userData) external payable{

        uint256 amountToPayPlusFee=((arrayOfItems[indexNum].priceWei*quantity)*105)/100;

        require( msg.value>=amountToPayPlusFee && quantity<=arrayOfItems[indexNum].quantity,"Not sufficient amount sent" );

        uint256 realDeal=amountToPayPlusFee*5/105;
        sendFee(realDeal);
        arrayOfItems[indexNum].quantity-=quantity;

        emit NewTrade(userData,msg.sender,now);

    }
    function sendFee(uint256 amount) internal{
        masterica.transfer(amount);
    }

    function returnArrayOfItems() external view returns( productDescription[] memory){
        return arrayOfItems;
    }

}
