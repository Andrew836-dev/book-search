import React, {useRef} from "react";
import SearchForm from "../../components/SearchForm";

function Homepage() {
  const searchTerm = useRef();

  return (
    <div>
      <p>Landing Page</p>
      <SearchForm placeholder="testing" ref={searchTerm} />
    </div>
  )
}
export default Homepage;