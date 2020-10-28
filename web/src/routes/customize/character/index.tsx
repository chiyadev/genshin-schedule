import React, { memo, useMemo } from "react";
import { CharacterSearch } from "./search";
import Icon from "./icon";
import { Link } from "react-router-dom";

const CharacterList = ({ search }: { search: string }) => {
  const results = useMemo(
    () =>
      CharacterSearch.search(search).sort((a, b) =>
        a.name.localeCompare(b.name)
      ),
    [search]
  );

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <div className="text-xl font-bold">
        <img
          alt="Character"
          src="/assets/game/Anemo.png"
          className="w-8 h-8 inline"
        />

        <span className="align-middle"> Characters</span>
      </div>

      <div>
        {results.map((character) => (
          <Link key={character.name} to={`/characters/${character.name}`}>
            <Icon character={character} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default memo(CharacterList);
