import { useState } from "react";

export const useFetching = () => {
  const [isFetching, setIsFetching] = useState(true);

  const disableFetching = () => setIsFetching(false)
  const showIsFetching = () => isFetching

  return {
    showIsFetching,
    disableFetching
  };
};
