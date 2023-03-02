import { useEffect, useState, useRef } from "react";
import { MeiliSearch } from "meilisearch";

import { Container, Input, Label } from "./Search.styled";
import searchIco from "../../static/icons/search.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import useOutsideClick from "../../hooks/useOutsideClick";

const client = new MeiliSearch({
  host: "http://46.205.217.7:7700",
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
          // const titles = hits.map(hit => hit.title);
          const titles = [];
          types = types.map((type) => type.type.name);
          loaded && setHitnsIsOpen(true);
          setProducts([...types, ...titles]);
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
    <Container ref={searchRef}>
      <Label>
        <Image src={searchIco} width={16} height={16} />
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
        className={`hints ${
          hintsIsOpen && products.length > 0 ? "show" : "hidden"
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
    </Container>
  );
};

export default Search;
