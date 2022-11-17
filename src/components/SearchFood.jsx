import React, { useState } from "react";
import { Divider, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

function SearchFood(props) {
  // Destructuring filterFood function
  const { type, filterFood } = props;

  // Searched input element state
  const [search, setSearch] = useState("");

  // Handle search by user
  const handleSearch = (e) => {
    setSearch(e.target.value);
    filterFood(e.target.value);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <br />
      <label htmlFor="query"></label>
      <Input
        prefix={<SearchOutlined />}
        placeholder="Buscar"
        value={search}
        type="text"
        name="query"
        onChange={handleSearch}
        style={{ width: "60%", borderRadius: "10px" }}
      />

      <Divider className="divider">
        {type === "foods"
          ? "Comidas"
          : type === "desserts"
          ? "Postres"
          : type === "drinks"
          ? "Bebidas"
          : type === "all"
          ? "Todos los productos"
          : null}
      </Divider>
    </div>
  );
}

export default SearchFood;
