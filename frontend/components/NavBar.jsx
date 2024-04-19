"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const router = useRouter();
  const [showNavBar, setShowNavBar] = useState(false);

  return (
    <div className="flex flex-col absolute right-10 ">
      <button
        className="bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded"
        onClick={() => setShowNavBar(!showNavBar)}
      >
        Menu
      </button>
      {showNavBar && (
        <div className="flex flex-col  bg-blue-900 text-white px-5 pb-5 ">
          <button onClick={() => router.push("/showCandidates")}>Home</button>
          <button onClick={() => router.push("/addCandidate")}>
            Candidate Registration
          </button>
          <button onClick={() => router.push("/addVoter")}>
            Voter Registration
          </button>
          <button onClick={() => router.push("/showVoters")}>Voter List</button>
          <button onClick={() => router.push("/showResults")}>Results</button>
        </div>
      )}
    </div>
  );
};

export default NavBar;
