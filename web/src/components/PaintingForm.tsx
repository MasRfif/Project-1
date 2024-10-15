"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

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

  // Fetch all paintings on component mount
  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/paintings");
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        setPaintings(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPaintings();
  }, []);

  // Handle the form submission for creating a new painting
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPainting = { name, thumbnail, description, price, imageUrl };

    try {
      const response = await fetch("http://localhost:5000/api/paintings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPainting),
      });

      if (!response.ok) {
        const errorMessage = await response.text(); // Get the error message from the response
        throw new Error(`Error: ${response.status} - ${errorMessage}`);
      }

      const savedPainting = await response.json();
      setPaintings((prevPaintings) => [...prevPaintings, savedPainting]); // Update state with new painting
      setName("");
      setThumbnail("");
      setDescription("");
      setPrice(0);
      setImageUrl("");
    } catch (error) {
      console.error(error);
    }
  };

  // Handle painting thumbnail click
  const handleThumbnailClick = (painting: Painting) => {
    setSelectedPainting(painting);
  };

  // Handle thumbnail and image URL preview
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImageUrlFunc: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageUrlFunc(URL.createObjectURL(file));
    }
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
                  <Image
                    src={painting.thumbnail}
                    alt={painting.name}
                    className="w-full h-full object-cover"
                    width={300}
                    height={300}
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
            <label className="block text-sm text-black">Main Image</label>
            <label className="flex flex-col items-center w-full max-w-lg p-5 mx-auto mt-2 text-center bg-[#000000] border-2 border-gray-300 border-dashed cursor-pointer rounded-xl">
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={(e) => handleImageUpload(e, setThumbnail)}
              />
              {thumbnail && (
                <Image
                  src={thumbnail}
                  alt="Uploaded Image"
                  className="w-full h-64 object-cover mt-4"
                  width={300}
                  height={300}
                />
              )}
            </label>
          </div>
          <div>
            <label className="block text-sm text-black">Name</label>
            <input
              type="text"
              placeholder="Painting Name"
              className="block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-black">Description</label>
            <textarea
              placeholder="Description"
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
            {/* Close button SVG here */}
          </button>

          <h3 className="text-2xl text-black font-semibold mb-4">
            {selectedPainting.name}
          </h3>
          <Image
            src={selectedPainting.imageUrl}
            alt={selectedPainting.name}
            width={500}
            height={500}
            className="rounded-lg"
          />
          <p className="text-gray-600 mt-2">{selectedPainting.description}</p>
          <p className="text-gray-800 font-semibold">
            ${selectedPainting.price.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
}
