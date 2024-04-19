"use client";
import React, { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import VotingContext, { VotingProvider } from "../context/Voter";

const CheckWallet = () => {
  const router = useRouter();
  const { message, checkIfWalletIsConnected, connectWallet } =
    useContext(VotingContext);
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  setTimeout(() => {
    if (message == "wallet connected") {
      router.push("/showCandidates");
    }
  }, 1000);

  return (
    <div className="bg-[#5BBCFF] m-5 p-5 h-dvh">
      <div className="flex justify-end items-start m-5 pt-5">
        <button
          onClick={() => {
            connectWallet();
          }}
          className="bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded"
        >
          Connect Wallet
        </button>
      </div>
      <div className="flex justify-center items-center flex-col ">
        <h1 className="text-4xl font-extrabold mb-3">
          Welcome to Decentralized Voting System
        </h1>
        <h1 className="text-2xl font-medium">{message}</h1>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <VotingProvider>
      <CheckWallet />
    </VotingProvider>
  );
}
