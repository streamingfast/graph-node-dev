pragma solidity >=0.6.6 <0.7.0;

// **Important** This contract is
contract Omnibus {
    mapping(address => uint256) _balances;

    function airdrop(address to, uint256 value) public returns (bool success) {}

    function name() public pure returns (string memory) {
        return "omnibus";
    }

    function symbol() public pure returns (string memory) {
        return "OMNI";
    }

    function decimals() public pure returns (uint8) {
        return 4;
    }

    function totalSupply() public pure returns (uint256) {
        return 100_000_000;
    }

    function balanceOf(address owner) public view returns (uint256 balance) {
        return _balances[owner];
    }

    function transfer(address to, uint256 value) public returns (bool success) {
        uint256 balance = _balances[to];
        require(
            balance >= value,
            "account balance does not have enough tokens to spend"
        );

        _balances[to] = balance - value;
        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool success) {
        require(false, "transferFrom not implemented");
    }

    function approve(address _spender, uint256 _value)
        public
        returns (bool success)
    {
        require(false, "approve not implemented");
    }

    function allowance(address _owner, address _spender)
        public
        view
        returns (uint256 remaining)
    {
        require(false, "allowance not implemented");
    }
}
