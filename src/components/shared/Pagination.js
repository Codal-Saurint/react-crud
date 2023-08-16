import {
  Pagination as CommonPagination,
  PaginationItem as CommonPaginationItem,
  PaginationLink as CommonPaginationLink
} from 'reactstrap';

export const Pagination = () => {
  return (
    <CommonPagination>
      <CommonPaginationItem>
        <CommonPaginationLink first href="#" />
      </CommonPaginationItem>
      <CommonPaginationItem>
        <CommonPaginationLink href="#" previous />
      </CommonPaginationItem>
      <CommonPaginationItem>
        <CommonPaginationLink href="#">1</CommonPaginationLink>
      </CommonPaginationItem>
      <CommonPaginationItem>
        <CommonPaginationLink href="#">2</CommonPaginationLink>
      </CommonPaginationItem>
      <CommonPaginationItem>
        <CommonPaginationLink href="#">3</CommonPaginationLink>
      </CommonPaginationItem>

      <CommonPaginationItem>
        <CommonPaginationLink href="#" next />
      </CommonPaginationItem>
      <CommonPaginationItem>
        <CommonPaginationLink href="#" last />
      </CommonPaginationItem>
    </CommonPagination>
  );
};
