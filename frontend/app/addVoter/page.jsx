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

const AddVoter = () => {
  const router = useRouter();
  const { addVoter } = useContext(VotingContext);
  const [voter, setVoter] = useState({
    name: "",
    age: "",
    address: "",
    imageUrl: "",
    ipfs: "",
  });
  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const ipfsHash = await pinFileToIPFS(file);
    const url = `https://beige-improved-condor-857.mypinata.cloud/ipfs/${ipfsHash}`;
    setVoter({ ...voter, imageUrl: url, ipfs: url });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!voter.name || !voter.age || !voter.address || !voter.imageUrl) {
      alert("Please fill all the fields");
      return;
    }

    addVoter(voter.address, voter.name, voter.age, voter.imageUrl, voter.ipfs);
    router.push("/showVoters");
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <div className="m-5 bg-[#5BBCFF] h-auto md:h-dvh ">
      <div className="m-5 flex flex-col pt-5">
        <div className="flex justify-end items-start">
          <NavBar />
        </div>
        <div className="flex justify-center">
          <div className="text-4xl font-extrabold mt-2 md:mt-0">
            {" "}
            Add Voter{" "}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="col-span-4">
            <div className="flex flex-col justify-center bg-gray-800 text-blue-200 gap-2 md:w-3/4 p-5">
              <div className="text-2xl font-bold">Create Voter to Vote</div>
              {voter.imageUrl && (
                <img
                  src={voter.imageUrl}
                  alt="Uploaded to IPFS"
                  className=" w-32 h-32 rounded-full "
                />
              )}
              {voter.name && <h1 className="text-2xl">{voter.name}</h1>}
              {voter.age && <h1 className="text-2xl">{voter.age}</h1>}
              {voter.address && (
                <h1>{voter.address.substring(0, 10) + "..."}</h1>
              )}
            </div>
          </div>
          <div className="col-span-8">
            <form className="m-10 md:w-3/4 text-2xl" onSubmit={handleSubmit}>
              <div className="flex flex-col ">
                <label>Name</label>
                <input
                  type="text"
                  value={voter.name}
                  onChange={(event) =>
                    setVoter({ ...voter, name: event.target.value })
                  }
                />
              </div>
              <div className="flex flex-col">
                <label>Age</label>
                <input
                  type="text"
                  value={voter.age}
                  onChange={(event) =>
                    setVoter({ ...voter, age: event.target.value })
                  }
                />
              </div>
              <div className="flex flex-col">
                <label>Address</label>
                <input
                  type="text"
                  value={voter.address}
                  onChange={(event) =>
                    setVoter({ ...voter, address: event.target.value })
                  }
                />
              </div>
              <div className="flex flex-col">
                <label>Image</label>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p className="text-xl my-2 border  bg-[#FFFFFF] text-black p-2 md:p-16">
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
      <AddVoter />
    </VotingProvider>
  );
}
