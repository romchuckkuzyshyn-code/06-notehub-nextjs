import css from './Pagination.module.css';
import ReactPaginate from 'react-paginate';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Paginate = (ReactPaginate as any).default ?? ReactPaginate;

interface PaginationProps {
  totalPages: number;
  onPageChange: (page: number) => void;
  page: number;
}

const Pagination = ({ totalPages, onPageChange, page }: PaginationProps) => {
  return (
    <Paginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }: { selected: number }) =>
        onPageChange(selected + 1)
      }
      forcePage={page - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
};

export default Pagination;
