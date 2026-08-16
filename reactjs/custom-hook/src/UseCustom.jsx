import { useState, useEffect } from "react";

const UseCustom = (url) => {
  const [data, setData] = useState();

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  },[url]);

  return [data];
};

export default UseCustom;
