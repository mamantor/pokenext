import { Dispatch, SetStateAction, useRef, useEffect } from "react";
import styles from "./pokeList.module.scss";
import "./pokemon-thumbnail.scss";

interface PokeListProps {
  pokemons: { name: string; url: string }[];
  setSelectedId: Dispatch<SetStateAction<string>>;
  selectedId: string;
}

export default function PokeList({
  pokemons,
  setSelectedId,
  selectedId,
}: PokeListProps) {
  console.log("pokeList");
  const scrollableRef = useRef(null);
  useEffect(() => {
    const scrollableElement: any = scrollableRef.current;
    if (scrollableElement) {
      const selectedItem = scrollableElement.querySelector(
        `[data-id="${selectedId}"]`
      );
      if (selectedItem) {
        const scrollOffset =
          selectedItem.offsetTop -
          scrollableElement.offsetHeight / 2 +
          selectedItem.offsetHeight / 2;
        scrollableElement.scrollTo({ top: scrollOffset, behavior: "smooth" });
      }
    }
  }, [selectedId]);

  return (
    <div>
      <span
        className={`${styles.pokesprite} ${styles.pokemon} ${styles.bulbasaur}`}
      ></span>
      <div className={styles.carousel__wrapper}>
        <div className={styles.carousel} ref={scrollableRef}>
          {pokemons.map((p: { name: string }, id: number) => (
            <div
              onClick={() => {
                console.log(id);
                setSelectedId(String(id));
              }}
              key={p.name}
              data-id={id}
              className={
                styles[
                  `carousel__item${id === Number(selectedId) ? "--active" : ""}`
                ]
              }
            >
              <span className={`pokesprite pokemon ${p.name}`}></span>
              <p>{p.name[0].toUpperCase()+p.name.slice(1, p.name.length)} - #{id + 1}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
