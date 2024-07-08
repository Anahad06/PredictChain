pragma solidity ^0.8.0;

contract PredictionMarket {
    struct Market {
        string description;
        uint numOptions;
        uint totalBetOnMarket;
        bool resolved;
        uint winningOption;
        mapping(uint => string) options;
        mapping(address => uint) betOnMarket;
        mapping(address => uint) amountBet;
        mapping(uint => uint) totalBetOnOption; // Total amount bet on each option
        mapping(uint => mapping(address => uint)) bets; // Amount each address bet on each option
    }
    
    Market[] public markets;

    event MarketCreated(uint marketId, string description, uint numOptions);
    event OptionAdded(uint marketId, uint optionId, string option);
    event MarketResolved(uint marketId, uint winningOption);
    event BetPlaced(uint marketId, address indexed user, uint optionId, uint amount);

    function createMarket(string memory _description, uint _numOptions, string[] memory _options) public {
        require(_options.length == _numOptions, "Number of options must match numOptions");

        markets.push();
        uint marketId = markets.length - 1;
        Market storage newMarket = markets[marketId];
        newMarket.description = _description;
        newMarket.numOptions = _numOptions;
        newMarket.resolved = false;

        for (uint i = 0; i < _numOptions; i++) {
            newMarket.options[i] = _options[i];
            emit OptionAdded(marketId, i, _options[i]);
        }

        emit MarketCreated(marketId, _description, _numOptions);
    }

    function placeBet(uint _marketId, uint _optionId) public payable {
        require(_marketId < markets.length, "Invalid market ID");
        Market storage market = markets[_marketId];
        require(!market.resolved, "Market already resolved");
        require(_optionId < market.numOptions, "Invalid option index");
        require(msg.value > 0, "Bet amount must be greater than 0");

        market.totalBetOnMarket += msg.value;
        market.amountBet[msg.sender] += msg.value;
        market.bets[_optionId][msg.sender] += msg.value;
        market.totalBetOnOption[_optionId] += msg.value;

        emit BetPlaced(_marketId, msg.sender, _optionId, msg.value);
    }

    function resolveMarket(uint _marketId, uint _winningOption) public {
        require(_marketId < markets.length, "Invalid market ID");
        Market storage market = markets[_marketId];
        require(!market.resolved, "Market already resolved");
        require(_winningOption < market.numOptions, "Invalid option index");

        market.resolved = true;
        market.winningOption = _winningOption;

        emit MarketResolved(_marketId, _winningOption);
    }

    function claimPayout(uint _marketId) public {
        require(_marketId < markets.length, "Invalid market ID");
        Market storage market = markets[_marketId];
        require(market.resolved, "Market not resolved yet");
        uint winningOption = market.winningOption;
        uint userBet = market.bets[winningOption][msg.sender];
        require(userBet > 0, "No winning bet to claim");

        uint totalWinningBets = market.totalBetOnOption[winningOption];
        uint payout = (userBet * market.totalBetOnMarket) / totalWinningBets;

        // Reset the user's bet to prevent double claiming
        market.bets[winningOption][msg.sender] = 0;

        // Transfer the payout
        payable(msg.sender).transfer(payout);
    }

    function getMarket(uint _marketId) public view returns (string memory, uint, bool, uint) {
        require(_marketId < markets.length, "Invalid market ID");
        Market storage market = markets[_marketId];
        return (market.description, market.numOptions, market.resolved, market.winningOption);
    }

    function getOption(uint _marketId, uint _optionId) public view returns (string memory) {
        require(_marketId < markets.length, "Invalid market ID");
        Market storage market = markets[_marketId];
        require(_optionId < market.numOptions, "Invalid option index");

        return market.options[_optionId];
    }
}
