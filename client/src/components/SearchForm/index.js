import React from "react";

const SearchForm = React.forwardRef((props, ref) => {
  return (
    <form className="form-group">
      <input className="form-item" ref={ref} type="text" {...props} />
      <input className="hidden" type="submit" />
    </form>
  )
})
export default SearchForm;