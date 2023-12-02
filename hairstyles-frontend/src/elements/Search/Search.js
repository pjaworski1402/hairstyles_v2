import { useEffect, useState, useRef } from "react";
import { MeiliSearch } from "meilisearch";

import { Container, Input, Label } from "./Search.styled";
import searchIco from "../../static/icons/search.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import useOutsideClick from "../../hooks/useOutsideClick";
import { MEILISEARCH_URL } from "../../utilities/urls";
import enterIco from "../../static/icons/enter-button.svg"

const client = new MeiliSearch({
  host: MEILISEARCH_URL,
});

const Search = (props) => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const searchRef = useRef(null);
  const [hintsIsOpen, setHitnsIsOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useOutsideClick(searchRef, () => {
    setHitnsIsOpen(false);
  });

  useEffect(() => {
    if (search.length > 1) {
      client
        .index("product")
        .search(search)
        .then((results) => {
          const { hits } = results;
          let types = hits.filter(
            (value, index, self) =>
              index === self.findIndex((t) => t.type.name === value.type.name)
          );
          const uniqueTags = [];

          // Przejdź przez każdy produkt
          hits.forEach(product => {
            // Przejdź przez każdy tag w produkcie
            product.tags.forEach(tag => {
              // Sprawdź, czy tag już istnieje w tablicy uniqueTags
              if (!uniqueTags.includes(tag.name)) {
                // Jeśli nie istnieje, dodaj go do tablicy
                uniqueTags.push(tag.name);
              }
            });
          });
          console.log(uniqueTags);
          // const titles = hits.map(hit => hit.title);
          types = types.map((type) => type.type.name);
          loaded && setHitnsIsOpen(true);
          setProducts([...types, ...uniqueTags]);
          setLoaded(true);
        });
    } else {
      setProducts([]);
    }
  }, [search]);

  useEffect(() => {
    if (!props.showSearch) {
      setProducts([]);
    }
  }, [props.showSearch]);

  useEffect(() => {
    if (router.query.search) {
      setSearch(router.query.search);
    }
  }, [router.query.search]);

  const handleSearch = (title) => {
    let query = { search: title };
    if (router.query.type) query.type = router.query.type;
    if (router.query.gender) query.gender = router.query.gender;
    if (router.query.price) query.price = router.query.price;
    setSearch(title);
    setHitnsIsOpen(false);
    setLoaded(false);
    router.push({
      pathname: "/results",
      query: query,
    });
  };
  return (
    <Container ref={searchRef} className="searchContainer">
      <Label>
        <Image src={searchIco} width={16} height={16} alt="searchIco" />
        <Input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          ref={props.searchRef}
          onKeyDown={(e) => {
            e.key === "Enter" && handleSearch(search);
          }}
        />
      </Label>
      <ul
        className={`hints ${hintsIsOpen && products.length > 0 ? "show" : "hidden"
          }`}
      >
        {products.map((title) => (
          <li
            key={Math.random()}
            className="hint"
            onClick={() => handleSearch(title)}
          >
            {title}
          </li>
        ))}
      </ul>
      <Image style={{ cursor: 'pointer' }} src={enterIco} width={16} height={16} alt="enter" onClick={() => handleSearch(search)} />
    </Container>
  );
};

export default Search;
