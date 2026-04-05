const Filter = ({ newSearch, handleSearch }) => {
  return (
    <>
      filter shown with{" "}
      <input value={newSearch} onChange={handleSearch} type="text" />
    </>
  );
};

export default Filter;
