import { PaginationProps } from "@/app/type/type";
import SearchBar from "./SearchBar";

export default function Search({ setCurrentPage }: PaginationProps) {
  return (
    <div className="m-auto">
      <SearchBar setCurrentPage={setCurrentPage} />
    </div>
  );
}
