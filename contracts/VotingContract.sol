// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract Create {
    using Counters for Counters.Counter;
    Counters.Counter public _voterId;
    Counters.Counter public _candidateId;

    address public votingOrganizer;

    struct Candidate {
        uint256 candidateId;
        string age;
        string name;
        string image;
        uint256 voteCount;
        address _address;
        string ipfs;
        string partyName; 
    }

    event CandidateCreate(
        uint256 indexed candidateId,
        string age,
        string name,
        string image,
        uint256 voteCount,
        address _address,
        string ipfs,
        string partyName
    );

    address[] public candidateAddress;
    mapping(address => Candidate) public candidates;

    struct Voter {
        uint256 voter_voterId;
        string voter_name;
        uint256 voter_age;
        string voter_image;
        address voter_address;
        bool voter_voted;
        uint256 voter_vote;
        string voter_ipfs;
    }

    event VoterCreated(
        uint256 indexed voter_voterId,
        string voter_name,
        string voter_image,
        address voter_address,
        bool voter_voted,
        uint256 voter_vote,
        string voter_ipfs
    );

    address[] public votedVoters;
    address[] public votersAddress;
    mapping(address => Voter) public voters;

    constructor() {
        votingOrganizer = msg.sender;
    }

    function setCandidate(
        address _address,
        string memory _age,
        string memory _name,
        string memory _image,
        string memory _ipfs,
        string memory _partyName
    ) public {
        require(votingOrganizer == msg.sender, "Only organizer can create a candidate");

        _candidateId.increment();
        uint256 idNumber = _candidateId.current();

        Candidate storage candidate = candidates[_address];
        candidate.age = _age;
        candidate.name = _name;
        candidate.candidateId = idNumber;
        candidate.image = _image;
        candidate.voteCount = 0;
        candidate._address = _address;
        candidate.ipfs = _ipfs;
        candidate.partyName = _partyName;

        candidateAddress.push(_address);

        emit CandidateCreate(
            idNumber,
            _age,
            _name,
            _image,
            candidate.voteCount,
            _address,
            _ipfs,
            _partyName
        );
    }

    function getCandidate() public view returns (address[] memory) {
        return candidateAddress;
    }

    function getCandidateLength() public view returns (uint256) {
        return candidateAddress.length;
    }

    function getCandidatedata(address _address)
        public
        view
        returns (
            string memory,
            string memory,
            uint256,
            string memory,
            uint256,
            address,
            string memory
        )
    {
        return (
            candidates[_address].age,
            candidates[_address].name,
            candidates[_address].candidateId,
            candidates[_address].image,
            candidates[_address].voteCount,
            candidates[_address]._address,
            candidates[_address].partyName
        );
    }

    function setVoter(
        address _address,
        string memory _name,
        uint256 _age,
        string memory _image,
        string memory _ipfs
    ) public {
        require(votingOrganizer == msg.sender, "Only Organizers can create voter");
        require(_age > 18, "Voter must be older than 18");

        _voterId.increment();
        uint256 idNumber = _voterId.current();

        Voter storage voter = voters[_address];
        require(!voter.voter_voted);

        voter.voter_name = _name;
        voter.voter_age = _age;
        voter.voter_image = _image;
        voter.voter_address = _address;
        voter.voter_voterId = idNumber;
        voter.voter_vote = 1000;
        voter.voter_voted = false;
        voter.voter_ipfs = _ipfs;

        votersAddress.push(_address);

        emit VoterCreated(
            idNumber,
            _name,
            _image,
            _address,
            voter.voter_voted,
            voter.voter_vote,
            _ipfs
        );
    }

    function vote(address _candidateAddress, uint256 _candidateVoteId) external {
        Voter storage voter = voters[msg.sender];
        require(voter.voter_voterId > 0, "You are not a voter");
        require(!voter.voter_voted, "You have already voted");

        voter.voter_voted = true;
        voter.voter_vote = _candidateVoteId;

        votedVoters.push(msg.sender);
        candidates[_candidateAddress].voteCount += 1;
    }

    function getVoterLength() public view returns (uint256) {
        return votersAddress.length;
    }

    function getVoterdata(address _address)
        public
        view
        returns (
            uint256,
            string memory,
            string memory,
            address,
            string memory,
            bool
        )
    {
        return (
            voters[_address].voter_voterId,
            voters[_address].voter_name,
            voters[_address].voter_image,
            voters[_address].voter_address,
            voters[_address].voter_ipfs,
            voters[_address].voter_voted
        );
    }

    function getVotedVoterList() public view returns (address[] memory) {
        return votedVoters;
    }

    function getVoterList() public view returns (address[] memory) {
        return votersAddress;
    }
}