"use client";
import React, { useContext } from "react";
import VotingContext, { VotingProvider } from "../../context/Voter";
import NavBar from "../../components/NavBar";

const ShowCandidates = () => {
  const {
    user,
    message,
    candidateLength,
    voters,
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

  if (user == "not an user") {
    console.log(user);
    return (
      <div className="m-5 bg-[#5BBCFF] h-dvh flex justify-center items-center">
        "You are not authorized to access this page. Please connect again."
      </div>
    );
  }

  return (
    <div className=" m-5 bg-[#5BBCFF] h-dvh ">
      <div className="absolute left-6 flex flex-col items-center justify-center">
        <div className="font-bold font-mono">{message}</div>
        {user && message != "Organizer" && (
          <img
            src={message == "Voter" ? user.voter_image : user.image}
            alt={message == "Voter" ? user.voter_name : user.name}
            className="w-24 h-24 rounded-full"
          />
        )}
      </div>
      {message == "Organizer" && (
        <div className="flex justify-end m-5 pt-5">
          <NavBar />
        </div>
      )}

      <div>
        <h1 className="text-4xl font-extrabold text-center py-2">
          Welcome to Decentralized Voting System
        </h1>
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

      {candidateLength == 0 ? (
        <div className="text-3xl font-bold text-center py-4">
          No Candidates Found
        </div>
      ) : (
        <div className="flex justify-center items-center bg-[#5BBCFF]  flex-wrap ">
          {candidates.map((candidate, index) => {
            return (
              <div
                key={index}
                className="flex flex-col bg-slate-800 text-white items-center m-5 p-5 gap-2"
              >
                <img
                  src={candidate.image}
                  alt={candidate.name}
                  className=" w-32 h-32 rounded-full "
                />
                <h1 className="text-2xl">Name: {candidate.name}</h1>
                <h1 className="text-2xl">Age: {candidate.age} years</h1>
                <h1 className="text-2xl">Party: {candidate.partyName}</h1>

                <button
                  className="bg-blue-900 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                  onClick={() =>
                    handleVote(candidate._address, candidate.candidateId)
                  }
                >
                  Give Vote
                </button>
              </div>
            );
          })}
        </div>
      )}
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
