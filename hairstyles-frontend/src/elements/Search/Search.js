import { useEffect, useState } from "react";
import { MeiliSearch } from "meilisearch";

import { Container, Input, Label } from "./Search.styled";
import searchIco from "../../static/icons/search.svg";
import Image from "next/image";

const client = new MeiliSearch({
  host: "http://firos:7700",
});

const Search = (props) => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (search.length > 1) {
      client
        .index("product")
        .search(search)
        .then((results) => {
          const { hits } = results;
          let types = hits.filter((value, index, self) =>
            index === self.findIndex((t) => (
              t.type.name === value.type.name
            ))
          );
          const titles = hits.map(hit => hit.title);
          // console.log(hits)
          types = types.map(type => type.type.name)
          setProducts([...types, ...titles]);
        });
    } else {
      setProducts([]);
    }
  }, [search]);

  useEffect(() => {
    if (!props.showSearch) {
      setProducts([]);
    }
  }, [props.showSearch])

  return (
    <Container>
      <Label>
        <Image src={searchIco} width={16} height={16} />
        <Input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          ref={props.searchRef}
          onBlur={() => setProducts([])}
        />
      </Label>
      <ul className={`hints ${products.length > 0 ? "show" : "hidden"}`}>
        {products.map(title => <li key={Math.random()} className="hint">{title}</li>)}
      </ul>
    </Container>
  );
};

export default Search;
{
  /* <div className="products">
        {products?.map((product) => (
          <div key={product.id}>
            <div>
              <p>{product.id}</p>
              <h2>{product.name}</h2>
            </div>
          </div>
        ))}
      </div> */
}
