"use client";
import React, { useState, createContext, useEffect } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { VotingAddress, VotingAddressABI } from "./constants";
import { usePathname } from "next/navigation";

export const VotingContext = createContext();

export function VotingProvider({ children }) {
  const currentPage = usePathname();
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("Connect wallet");
  const [organizerAddress, setOrganizerAddress] = useState(null);
  const [contract, setContract] = useState(null);
  const [candidateLength, setCandidateLength] = useState(0);
  const [candidates, setCandidates] = useState([]);
  const [voterLength, setVoterLength] = useState(0);
  const [voters, setVoters] = useState([]);
  useEffect(() => {
    if (currentPage !== "/") {
      getContract();
    }
  }, []);

  const getContract = async () => {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const smartContract = new ethers.Contract(
      VotingAddress,
      VotingAddressABI,
      signer
    );
    setContract(smartContract);

    const organizerAddress = await smartContract.votingOrganizer();
    setOrganizerAddress(organizerAddress);
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];

    setMessage("not an user");

    if (organizerAddress.toLowerCase() == account.toLowerCase())
      setMessage("Organizer");

    const voterAddress = await smartContract.getVoterList();
    for (let address of voterAddress) {
      const voter = await smartContract.voters(address);
      if (address.toLowerCase() === account.toLowerCase()) {
        setMessage("Voter");
        setUser(voter);
      }
    }

    const candidateAddress = await smartContract.getCandidate();
    for (let address of candidateAddress) {
      const candidate = await smartContract.candidates(address);
      if (address.toLowerCase() === account.toLowerCase()) {
        setMessage("Candidate");
        setUser(candidate);
      }
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!window.ethereum) return setMessage("Please Install MetaMask");
      else {
        console.log("in checkIfWalletIsConnected");
      }
    } catch (error) {
      console.error(
        "An error occurred while checking the wallet connection:",
        error
      );
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setMessage("wallet connected");
        console.log("wallet connected");
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("Install Metamask");
    }
  };

  const addCandidate = async (address, age, name, image, ipfs, partyName) => {
    try {
      const candidateAddress = await contract.getCandidate();
      for (let candidate of candidateAddress) {
        if (candidate.toLowerCase() === address.toLowerCase()) {
          alert("Candidate already exists");
          return;
        }
      }
      const transaction = await contract.setCandidate(
        address,
        age,
        name,
        image,
        ipfs,
        partyName
      );
      await transaction.wait();
    } catch (error) {
      console.log(error.reason);
      alert(error.reason);
    }
  };

  const getCandidateLength = async () => {
    try {
      const candidateLength = await contract.getCandidateLength();
      const candidateLengthNumber = Number(candidateLength._hex);
      setCandidateLength(candidateLengthNumber);
    } catch (error) {
      console.log(error.reason);
      alert(error.reason);
    }
  };

  const getCandidates = async () => {
    try {
      getCandidateLength();
      getVoterLength();

      const candidateAddress = await contract.getCandidate();
      setCandidates([]);
      candidateAddress.map(async (address) => {
        const candidate = await contract.candidates(address);
        setCandidates((prev) => [...prev, candidate]);
      });
      console.log(candidates);
    } catch (error) {
      console.log(error.reason);
      alert(error.reason);
    }
  };

  const addVoter = async (address, name, age, image, ipfs) => {
    try {
      const voterAddress = await contract.getVoterList();
      for (let voter of voterAddress) {
        if (voter.toLowerCase() === address.toLowerCase()) {
          alert("Voter already exists");
          return;
        }
      }

      const transaction = await contract.setVoter(
        address,
        name,
        age,
        image,
        ipfs
      );
      console.log(address, age, name, image, ipfs);
      await transaction.wait();
      setMessage("Voter Added");
    } catch (error) {
      console.log(error.reason);
      alert(error.reason);
    }
  };

  const getVoterLength = async () => {
    try {
      const voterLength = await contract.getVoterLength();
      const voterLengthNumber = Number(voterLength._hex);
      console.log(voterLengthNumber);
      setVoterLength(voterLengthNumber);
    } catch (error) {
      console.log(error.reason);
      alert(error.reason);
    }
  };

  const getVoters = async () => {
    try {
      getVoterLength();
      const voterAddress = await contract.getVoterList();
      setVoters([]);
      voterAddress.map(async (address) => {
        const voter = await contract.voters(address);
        console.log(voter);
        setVoters((prev) => [...prev, voter]);
      });
      console.log(voters);
    } catch (error) {
      console.log(error.reason);
      alert(error.reason);
    }
  };

  const giveVote = async (candidateAddress, candidateId) => {
    try {
      const transaction = await contract.vote(candidateAddress, candidateId);
      await transaction.wait();
      console.log("Voted Successfully");
    } catch (error) {
      console.error(error.message);
      if (
        error.data &&
        error.data.originalError &&
        error.data.originalError.message
      ) {
        console.log(error.data.originalError.message);
        alert(error.data.originalError.message);
      } else {
        console.log(error.reason);
        alert(error.reason);
      }
    }
  };

  return (
    <VotingContext.Provider
      value={{
        message,
        user,
        organizerAddress,
        candidates,
        voters,
        candidateLength,
        voterLength,

        checkIfWalletIsConnected,
        connectWallet,
        addCandidate,
        getCandidates,
        addVoter,
        getVoters,
        giveVote,
      }}
    >
      {children}
    </VotingContext.Provider>
  );
}

export default VotingContext;
