import { useState } from "react";

export function useFilteredItems(items) {
  const [search, setSearch] = useState("");
  const filtered = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );
  return { filtered, search, setSearch };
}
