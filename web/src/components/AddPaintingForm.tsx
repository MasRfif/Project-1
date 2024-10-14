"use client";

import React, { useState, useEffect } from "react";

interface Painting {
  id: number;
  name: string;
  thumbnail: string;
  description: string;
  price: number;
  imageUrl: string;
}

export default function PaintingForm() {
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [selectedPainting, setSelectedPainting] = useState<Painting | null>(
    null
  );

  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const response = await fetch("http://localhost:4000/paintings");
        const data = await response.json();
        setPaintings(data);
      } catch (error) {
        console.error("Error fetching paintings:", error);
      }
    };

    fetchPaintings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPainting = { name, thumbnail, description, price, imageUrl };

    const response = await fetch("http://localhost:4000/paintings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPainting),
    });

    if (response.ok) {
      const savedPainting = await response.json();
      setPaintings([...paintings, savedPainting]);
      setName("");
      setThumbnail("");
      setDescription("");
      setPrice(0);
      setImageUrl("");
    } else {
      const errorData = await response.json();
      alert(`Error adding painting: ${errorData.error || "Unknown error"}`);
    }
  };

  const handleThumbnailClick = (painting: Painting) => {
    setSelectedPainting(painting);
  };

  return (
    <div className="w-full h-full flex bg-gray-50">
      <div className="flex flex-wrap w-1/2 bg-white p-4">
        {paintings.map((painting, index) => (
          <div
            key={index}
            className="w-64 h-64 bg-gray-100 rounded-lg shadow-lg m-2 p-4 cursor-pointer"
            onClick={() => handleThumbnailClick(painting)}>
            <div className="border border-gray-300 p-2 rounded-md">
              <div className="flex flex-col items-center">
                <div className="w-40 h-40 overflow-hidden rounded-lg mb-2">
                  <img
                    src={painting.thumbnail}
                    alt={painting.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-lg text-black font-semibold">
                  {painting.name}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex w-1/2 bg-white rounded-lg shadow-md p-4 h-screen justify-center items-center">
        <form onSubmit={handleSubmit} className="w-96">
          <div>
            <label className="block text-sm text-black ">Main Image</label>

            <label className="flex flex-col items-center w-full max-w-lg p-5 mx-auto mt-2 text-center bg-[#000000] border-2 border-gray-300 border-dashed cursor-pointer rounded-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-8 h-8 text-gray-500 dark:text-gray-400">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>

              <h2 className="mt-1 font-medium tracking-wide text-gray-700 dark:text-gray-200">
                Image File
              </h2>

              <p className="mt-2 text-xs tracking-wide text-gray-500 dark:text-gray-400">
                Upload or drag & drop your file PNG, JPG{" "}
              </p>

              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={(e) => {
                  setThumbnail(URL.createObjectURL(e.target.files![0]));
                }}
              />

              {thumbnail && (
                <img
                  src={thumbnail}
                  alt="Uploaded Image"
                  className="w-full h-64 object-cover mt-4"
                />
              )}
            </label>
          </div>

          <div>
            <label className="block text-sm text-black">Username</label>
            <input
              type="text"
              placeholder="John Doe"
              className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-black">Description</label>
            <textarea
              placeholder="lorem..."
              className="block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-[#6b4b35] focus:outline-none focus:ring focus:ring-[#6b4b35]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-black">Price</label>
            <input
              type="number"
              placeholder="0.00"
              className="block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-[#6b4b35] focus:outline-none focus:ring focus:ring-[#6b4b35]"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
            />
          </div>

          <div>
            <label className="block text-sm text-black">Image URL</label>
            <input
              type="file"
              className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg"
              onChange={(e) =>
                setImageUrl(URL.createObjectURL(e.target.files![0]))
              }
            />
          </div>

          <button
            type="submit"
            className="block w-full bg-[#9b6d4e] hover:bg-[#4b3627] text-white font-bold py-2 px-4 rounded mt-4">
            Add Painting
          </button>
        </form>
      </div>

      {selectedPainting && (
        <div className="fixed bottom-10 right-10 bg-white shadow-lg p-4 rounded-lg w-1/3">
          <button
            className="absolute top-2 right-2 p-2 bg-white rounded-xl text-red-500 hover:text-red-800 transition duration-300"
            onClick={() => setSelectedPainting(null)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <img
            src={selectedPainting.thumbnail}
            alt={selectedPainting.name}
            className="w-full h-40 object-cover rounded-md"
          />
          <h3 className="text-lg font-semibold mt-2">
            {selectedPainting.name}
          </h3>
          <p className="text-gray-700 mt-1">{selectedPainting.description}</p>
          <p className="text-green-600 mt-1 font-bold">
            ${selectedPainting.price}
          </p>
        </div>
      )}
    </div>
  );
}
