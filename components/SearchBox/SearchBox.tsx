import css from "./SearchBox.module.css";

interface SearchBoxProps {
  search: string;
  onSearch: (e: string) => void;
}

const SearchBox = ({ search, onSearch }: SearchBoxProps) => {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={search}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default SearchBox;
