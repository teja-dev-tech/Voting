"use client";
import React, { useEffect, useContext } from "react";
import Image from "next/image";
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
    <div className="bg-[#5BBCFF] m-5 p-5 h-auto ">
      <div className="flex justify-center md:justify-end items-start m-2  ">
        <button
          onClick={() => {
            connectWallet();
          }}
          className="bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded"
        >
          Connect Wallet
        </button>
      </div>
      <div className="flex justify-center items-center flex-col py-2 ">
        <div className="text-4xl font-extrabold text-center ">
          Welcome to Decentralized Voting System
        </div>
        <div className="text-2xl font-bold  text-center">
          Your Vote, Your Voice, On the Blockchain.
        </div>
        <div className="text-2xl font-bold text-center">{message}</div>
        <div className="w-auto h-auto ">
          <Image
            src="/images/votingDapp.jpg"
            alt="cover photo"
            width={500}
            height={500}
            priority
          />
        </div>
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
