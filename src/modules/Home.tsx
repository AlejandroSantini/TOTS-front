
import React from "react";
import Map from "../components/Map";

const Home: React.FC = () => {
  return (
    <main className="w-full font-mono p-4 mx-auto justify-center">
        <h1 className="text-xl code">
          Welcome <span className="text-blue-500">TOTS</span> Map
        </h1>
        <Map />
    </main>
  );
};

export default Home;
