"use client";
import React, { useContext } from "react";
import VotingContext, { VotingProvider } from "../../context/Voter";
import NavBar from "../../components/NavBar";

const ShowVoters = () => {
  const { voterLength, voters, getVoters } = useContext(VotingContext);

  return (
    <div className=" m-5 bg-[#5BBCFF] h-dvh ">
      <div className="flex justify-end m-5 pt-5">
        <NavBar />
      </div>
      <div className="flex gap-4 justify-center">
        <div className="text-4xl font-extrabold"> Voters </div>
        <button
          className="bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded"
          onClick={getVoters}
        >
          Get Voters
        </button>
      </div>

      {voterLength === 0 ? (
        <div className="flex justify-center items-center m-5">
          <h1 className="text-3xl font-bold">No Voters Found</h1>
        </div>
      ) : (
        <div className="flex justify-center items-center bg-[#5BBCFF]  flex-wrap ">
          {voters.map((voter, index) => {
            return (
              <div
                key={index}
                className="flex flex-col bg-slate-800 text-white items-center p-5 m-5 w-52"
              >
                <img
                  src={voter.voter_image}
                  alt={voter.voter_name}
                  className="w-32 h-32 rounded-full pt-3"
                />
                <h1 className="text-2xl my-2">{voter.voter_name}</h1>
                <h1 className="text-2xl my-2">
                  Age: {Number(voter.voter_age)}
                </h1>

                <button className="bg-blue-900  text-white font-bold py-2 px-4 rounded">
                  {voter.voter_voted ? "Voted" : "Not Voted"}
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
      <ShowVoters />
    </VotingProvider>
  );
};

export default page;
