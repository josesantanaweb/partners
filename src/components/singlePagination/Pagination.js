import React from "react";
import { Pagination, PaginationLink, PaginationItem } from "reactstrap";
import Icon from "../icon/Icon";

const SimplePagination = ({ data, setCurrentPage, totalItems, paginate, currentPage }) => {
  return (
    <Pagination>
      <PaginationItem disabled={currentPage - 1 === 0 ? true : false}>
        <PaginationLink
          className="page-link-prev"
          onClick={(ev) => {
            ev.preventDefault();
            setCurrentPage(currentPage - 1);
          }}
          href="#prev"
        >
          <Icon name="chevrons-left" />
          <span>Atrás</span>
        </PaginationLink>
      </PaginationItem>
      <PaginationItem className={currentPage ? "active" : ""} key={currentPage}>
        <PaginationLink
          tag="a"
          href="#pageitem"
          onClick={(ev) => {
            ev.preventDefault();
            paginate(currentPage);
          }}
        >
          {currentPage}
        </PaginationLink>
      </PaginationItem>
      <PaginationItem disabled={data.length >= totalItems - 1 ? true : false}>
        <PaginationLink
          className="page-link-prev"
          onClick={(ev) => {
            ev.preventDefault();
            setCurrentPage(currentPage + 1);
          }}
          href="#pageitem"
        >
          <span>Sigte</span>
          <Icon name="chevrons-right" />
        </PaginationLink>
      </PaginationItem>
    </Pagination>
  );
};
export default SimplePagination;
