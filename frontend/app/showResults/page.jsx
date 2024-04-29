"use client";
import React, { useContext } from "react";
import VotingContext, { VotingProvider } from "../../context/Voter";
import NavBar from "../../components/NavBar";

const ShowCandidates = () => {
  const { candidateLength, voterLength, candidates, getCandidates } =
    useContext(VotingContext);

  const sortedCandidates = [...candidates].sort(
    (a, b) => b.voteCount - a.voteCount
  );

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
      <div className="flex flex-col justify-center items-center  md:flex-row gap-4">
        <div className="text-2xl font-bold"> Candidates </div>
        <button
          className="bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded w-44"
          onClick={getCandidates}
        >
          Get Candidates
        </button>
      </div>

      <div className="flex justify-center items-center bg-[#5BBCFF]  flex-wrap ">
        {sortedCandidates.map((candidate, index) => {
          return (
            <div
              key={candidate.id}
              className={`flex flex-col ${
                index === 0 ? "bg-green-950" : "bg-slate-800"
              } text-white items-center m-5  p-5 gap-2`}
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
