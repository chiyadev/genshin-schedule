import { h } from "preact";
import Search from "./search";
import { useState } from "preact/hooks";
import Characters from "./characters";
import Help from "./help";

const Customize = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="container mx-auto p-4">
      <Search value={search} setValue={setSearch} />

      <div className="mt-2">
        <Help />
      </div>

      <div className=" mt-8">
        <Characters search={search} />
      </div>
    </div>
  );
};

export default Customize;
