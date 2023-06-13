declare module '@carbon/react';

interface pokemonAPIInterface {
    name: string;
    url: string;
    abilities: {
      ability: { name: string; url: string };
      is_hidden: boolean;
      slot: number;
    }[];
    base_experience: number;
    forms: { name: string; url: string }[];
    game_indices: {
      game_index: number;
      version: { name: string; url: string };
    }[];
    height: number;
    held_items: any[];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: pokeMoves[];
    order: number;
    past_types: any[];
    species: { name: string; url: string };
    sprites: pokeSprite;
    types: {
      slot: number;
      type: { name: string; url: string };
    }[];
    typesArray: string[];
  }
  
  interface pokeMoves {
    move: { name: string; url: string };
    version_group_details: versionGroupDetails[];
  }
  
  interface versionGroupDetails {
    level_learned_at: number;
    move_learn_method: { name: string; url: string };
    version_group: { name: string; url: string };
  }
  
  interface pokeSprite {
    back_default: string;
    back_gray: string;
    back_transparent: string;
    front_default: string;
    front_gray: string;
    front_transparent: string;
    other: {
      dream_world: {
        front_default: string;
        front_female: string | null;
      };
      home: {
        front_default: string;
        front_female: string | null;
        front_shiny: string;
        front_shiny_female: string | null;
      };
      "official-artwork": {
        front_default: string;
        front_shiny: string;
      };
    };
  }
  
  interface pokemonInterface extends pokemonAPIInterface {
    typesArray: string[];
  }

  interface pokeMove {
    id: string;
    level_learned_at: number;
    learning_method: string;
  }