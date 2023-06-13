"use client";

import PokeList from "./pokeList";
import PokeCard from "./pokeCard";
import { useState } from "react";


interface PokeViewProps {
  pokemons: { name: string; url: string }[];
}

export default function PokeView({ pokemons }: PokeViewProps) {
  const [selectedId, setSelectedId] = useState("1");

  return (
    <div style={{display : 'flex'}}>
        <PokeList pokemons={pokemons} setSelectedId={setSelectedId} selectedId={selectedId} ></PokeList>
        <PokeCard selectedId={selectedId}></PokeCard>
    </div>
  );
}
