"use client";
import React, { useContext } from "react";
import VotingContext, { VotingProvider } from "../../context/Voter";
import NavBar from "../../components/NavBar";

const ShowCandidates = () => {
  const {
    candidateLength,
    voters,
    voterLength,
    candidates,
    getCandidates,
    giveVote,
  } = useContext(VotingContext);
  const handleVote = async (candidateAddress, candidateId) => {
    try {
      giveVote(candidateAddress, candidateId);
      let voter = voters.find((voter) => voter.voter_address === account);
      if (voter && voter.voter_voted) {
        alert("Voted Successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" m-5 bg-[#5BBCFF] h-dvh ">
      <div className="flex justify-end m-5 pt-5">
        <NavBar />
      </div>
      <div>
        <h1 className="text-4xl font-extrabold text-center py-2">Results</h1>

        <div className="flex justify-center items-center gap-3 py-2 ">
          <div className="text-2xl font-medium">
            Total Candidates: {candidateLength}
          </div>
          <div className="text-2xl font-medium">
            Total Voters: {voterLength}
          </div>
        </div>
      </div>
      <div className="flex gap-4 justify-center">
        <div className="text-4xl font-extrabold"> Candidates </div>
        <button
          className="bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded"
          onClick={getCandidates}
        >
          Get Candidates
        </button>
      </div>

      <div className="flex justify-center items-center bg-[#5BBCFF]  flex-wrap ">
        {candidates.map((candidate, index) => {
          return (
            <div
              key={index}
              className="flex flex-col bg-slate-800 text-white items-center m-5  p-5 gap-2"
            >
              <img
                src={candidate.image}
                alt={candidate.name}
                className="w-32 h-32 rounded-full"
              />
              <h1 className="text-2xl">{candidate.name}</h1>
              <h1 className="text-2xl">Age: {candidate.age}</h1>
              <h1 className="text-2xl">Party: {candidate.partyName}</h1>

              <button className="bg-blue-900  text-white font-bold py-2 px-4 rounded">
                Total Votes
              </button>
              <h1 className="text-2xl">{Number(candidate.voteCount)}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const page = () => {
  return (
    <VotingProvider>
      <ShowCandidates />
    </VotingProvider>
  );
};

export default page;
