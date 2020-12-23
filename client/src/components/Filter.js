import React from "react";

export default function Filter({ onFilter, yearMonths }) {
  const handleOnChange = (event) => {
    onFilter(
      yearMonths.filter((item) => {
        return item.categoryLower.includes(event.target.value.toLowerCase());
      })
    );
  };

  return (
    <div className="col s9">
      <input
        autoFocus
        placeholder="Digite a categoria..."
        id="busca"
        type="text"
        onChange={handleOnChange}
      />
    </div>
  );
}
