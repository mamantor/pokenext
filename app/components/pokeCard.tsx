import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./pokeCard.module.scss";
import { capitalize } from "../lib/helpers";
import { Tag, FlexGrid, Row, Column, Content } from "@carbon/react";
import PokeMoves from "./pokeMoves";

function formatMoves(pokemon: pokemonInterface): pokeMove[] {
  const redBlueMoves = pokemon.moves
    .filter((m) =>
      m.version_group_details.some((vgd) => {
        return vgd.version_group.name === "red-blue";
      })
    )
    .map((m) => {
      const redBlueLearningMethod = m.version_group_details.find((vgd) => {
        return vgd.version_group.name === "red-blue";
      });
      return {
        id: m.move.name,
        level_learned_at: redBlueLearningMethod.level_learned_at,
        learning_method: redBlueLearningMethod.move_learn_method.name,
      };
    })
    .sort((a, b) => {
      if (a.learning_method === "machine" && b.learning_method !== "machine") {
        return 1;
      } else if (
        a.learning_method !== "machine" &&
        b.learning_method === "machine"
      ) {
        return -1;
      } else {
        return a.level_learned_at - b.level_learned_at;
      }
    });
  return redBlueMoves;
}

async function fetchPokemon(id: string, setPokemon: any, setPokeMoves: any) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((res) => res.json())
    .then((res: pokemonAPIInterface) => {
      const pokemon: pokemonInterface = {
        ...res,
        typesArray: res.types.map((t) => t.type.name),
      };
      setPokemon(pokemon);
      const redBlueMoves = formatMoves(pokemon);
      console.log(redBlueMoves);
      setPokeMoves(redBlueMoves);
    });
}

async function fetchPokeFlavorText(id: string, setFlavorText: any) {
  fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    .then((res) => res.json())
    .then((res) => {
      const enDescEntry = res.flavor_text_entries.find(
        (fte: any) => fte.language.name === "en"
      );
      const enGeneraEntry = res.genera.find(
        (g: any) => g.language.name === "en"
      );
      const newDescText = enDescEntry.flavor_text.replace(/\u000c/g, " ");
      const newGeneraText = enGeneraEntry.genus.replace(/\u000c/g, " ");
      setFlavorText({ description: newDescText, genera: newGeneraText });
    });
}

export default function PokeCard({ selectedId }: { selectedId: string }) {
  const bgTypeColor = {
    bug: "#a8b820",
    dark: "#705848",
    dragon: "#7038f8",
    electric: "#f8d030",
    fairy: "#ee99ac",
    fighting: "#c03028",
    fire: "#f08030",
    flying: "#a890f0",
    ghost: "#705898",
    grass: "#78c850",
    ground: "#e0c068",
    ice: "#98d8d8",
    normal: "#a8a878",
    poison: "#a040a0",
    psychic: "#f85888",
    rock: "#b8a038",
    steel: "#b8b8d0",
    water: "#6890f0",
  };

  const [pokemon, setPokemon] = useState<pokemonInterface>({
    name: "",
  } as pokemonInterface);

  const [pokemonFlavorText, setPokemonFlavorText] = useState<{
    description: string;
    genera: string;
  }>({ description: "", genera: "" });

  const [pokeMoves, setPokeMoves] = useState<pokeMove[]>([]);

  useEffect(() => {
    fetchPokemon(String(Number(selectedId) + 1), setPokemon, setPokeMoves);
    fetchPokeFlavorText(String(Number(selectedId) + 1), setPokemonFlavorText);
  }, [selectedId]);

  const colorA = pokemon.typesArray
    ? bgTypeColor[pokemon.typesArray[0]]
    : "grey";

  const colorB =
    pokemon.typesArray?.length && pokemon.typesArray[1]
      ? bgTypeColor[pokemon.typesArray[1]]
      : colorA;

  const gradientStyle = {
    width: "100%",
    height: "100vh",
    backgroundAttachment: "fixed",
    backgroundImage: `linear-gradient(to right, ${colorA}, ${colorB})`,
  };

  return (
    <div style={gradientStyle}>
      <FlexGrid style={{ maxHeight: "100vh", overflow: "hidden" }}>
          <Row>
            <Column>
              <div className={styles.frost_container}>
                <Row fullwidth="true">
                  <Column lg={16}>
                    <h1 className={styles.pokemon_title}>
                      {capitalize(pokemon.name)}
                    </h1>
                    <p className={styles.pokemon__genera}>
                      {pokemonFlavorText.genera}
                    </p>
                  </Column>
                </Row>
                <Row>
                  <Column>
                    {pokemon.sprites ? (
                      <Image
                        width={250}
                        height={250}
                        alt={`${pokemon.name} illustration`}
                        src={
                          pokemon.sprites?.other["official-artwork"]
                            .front_default
                        }
                      ></Image>
                    ) : (
                      ""
                    )}
                  </Column>
                  <Column>
                    <div className={styles.pokemon_types}>
                      {pokemon.typesArray
                        ? pokemon.typesArray.map((t) => (
                            <Tag
                              key={t}
                              style={{
                                backgroundColor: bgTypeColor[t],
                                boxShadow: "inset 0 0 100px rgba(0, 0, 0, 0.1)",
                              }}
                            >
                              {capitalize(t)}
                            </Tag>
                          ))
                        : ""}
                    </div>
                    <p className={`${styles.pokemon_flavorText}`}>
                      {pokemonFlavorText.description}
                    </p>
                  </Column>
                </Row>
              </div>
            </Column>
          </Row>
          <Row>
            <Column lg={8}>
              <PokeMoves moves={pokeMoves} />
            </Column>
          </Row>
      </FlexGrid>
    </div>
  );
}
