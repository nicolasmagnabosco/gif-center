// react
import React from "react";
import { useEffect, useState } from "react";
// types
import { GifObject } from "@/types/types";
// constants
import { GIFS_KEY } from "../constants/constants";
// services
// services
import giphyService from "@/services/giphyService";
// style
import css from "./HomePage.module.css";
// components
import Search from "@/components/homePage/search/Search";
import List from "@/components/homePage/list/List";
import Favorites from "@/components/homePage/favorites/Favorites";

export default function HomePage() {
  const [gifs, setGifs] = useState<Array<GifObject> | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const recentGifs = window.sessionStorage.getItem(GIFS_KEY);
    if (recentGifs) setGifs(JSON.parse(recentGifs));
  }, []);

  const handleSearch = () => {
    const fetchGifs = async () => {
      setIsLoading(true);
      const fetchedGifs = await giphyService(inputValue);
      if (fetchedGifs) {
        setGifs(fetchedGifs);
        window.sessionStorage.setItem(GIFS_KEY, JSON.stringify(fetchedGifs));
      }
      setIsLoading(false);
    };

    fetchGifs();
  };

  const updateInputValue = (value: string) => {
    setInputValue(value);
  };

  return (
    <div className={css.home}>
      <Favorites />
      <div className={css.container}>
        <header className={css.header}>
          <h1 className={css.heading}>THE GIF CENTER</h1>
          <Search
            updateInputValue={updateInputValue}
            handleSearch={handleSearch}
          />
        </header>
        <main className={css.main}>
          {gifs && !isLoading && <List gifs={gifs} />}

          {isLoading && (
            <div className="loading-spinner">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
