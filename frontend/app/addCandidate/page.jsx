"use client";
import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import FormData from "form-data";
import VotingContext, { VotingProvider } from "../../context/Voter";
import NavBar from "../../components/NavBar";

export const pinFileToIPFS = async (file) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  let data = new FormData();
  data.append("file", file);
  const JWT = process.env.NEXT_PUBLIC_JWT;
  const response = await axios.post(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${JWT}`,
    },
  });
  return response.data.IpfsHash;
};

const AddCandidate = () => {
  const router = useRouter();
  const { addCandidate } = useContext(VotingContext);
  const [candidate, setCandidate] = useState({
    name: "",
    age: "",
    address: "",
    imageUrl: "",
    ipfs: "",
    partyName: "",
  });
  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const ipfsHash = await pinFileToIPFS(file);
    const url = `https://beige-improved-condor-857.mypinata.cloud/ipfs/${ipfsHash}`;
    setCandidate({ ...candidate, imageUrl: url, ipfs: url });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !candidate.name ||
      !candidate.age ||
      !candidate.address ||
      !candidate.imageUrl ||
      !candidate.partyName
    ) {
      alert("Please fill all the fields");
      return;
    }
    addCandidate(
      candidate.address,
      candidate.age,
      candidate.name,
      candidate.imageUrl,
      candidate.ipfs,
      candidate.partyName
    );
    setTimeout(() => {
      router.push("/showCandidates");
    }, 10000);
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <div className="m-5 bg-[#5BBCFF] h-dvh ">
      <div className="m-5 flex flex-col pt-5">
        <div className="flex justify-end items-start">
          <NavBar />
        </div>
        <div className="flex justify-center">
          <div className="text-4xl font-extrabold"> Add Candidate </div>
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-4">
            <div className="flex flex-col justify-center bg-gray-800 text-blue-200 gap-2 w-3/4 p-5">
              <div className="text-2xl font-bold">
                Create Candidate for Voting
              </div>
              {candidate.imageUrl && (
                <img
                  src={candidate.imageUrl}
                  alt={candidate.name}
                  className=" w-32 h-32 rounded-full "
                />
              )}
              {candidate.name && <h1 className="text-2xl">{candidate.name}</h1>}
              {candidate.age && <h1 className="text-2xl">{candidate.age}</h1>}
              {candidate.partyName && (
                <h1 className="text-2xl">{candidate.partyName}</h1>
              )}

              {candidate.address && (
                <h1>{candidate.address.substring(0, 10) + "..."}</h1>
              )}
            </div>
          </div>
          <div className="col-span-8">
            <form className="m-10 w-3/4 text-2xl" onSubmit={handleSubmit}>
              <div className="flex flex-col ">
                <label>Name</label>
                <input
                  type="text"
                  value={candidate.name}
                  onChange={(event) =>
                    setCandidate({ ...candidate, name: event.target.value })
                  }
                />
              </div>
              <div className="flex flex-col">
                <label>Age</label>
                <input
                  type="text"
                  value={candidate.age}
                  onChange={(event) =>
                    setCandidate({ ...candidate, age: event.target.value })
                  }
                />
              </div>
              <div className="flex flex-col">
                <label>Party Name</label>
                <input
                  type="text"
                  value={candidate.partyName}
                  onChange={(event) =>
                    setCandidate({
                      ...candidate,
                      partyName: event.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col">
                <label>Address</label>
                <input
                  type="text"
                  value={candidate.address}
                  onChange={(event) =>
                    setCandidate({ ...candidate, address: event.target.value })
                  }
                />
              </div>
              <div className="flex flex-col">
                <label>Image</label>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p className="text-xl">
                    Drag 'n' drop some files here, or click to select files
                  </p>
                </div>
              </div>
              <div className="flex flex-col">
                <button
                  className="bg-blue-900 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <VotingProvider>
      <AddCandidate />
    </VotingProvider>
  );
}
