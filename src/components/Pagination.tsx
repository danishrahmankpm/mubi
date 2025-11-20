import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination"

import { useDispatch, useSelector } from "react-redux"
import { fetchMovie } from "../state/MovieSlice"
import type { RootState, AppDispatch } from "../state/Store"

export function MoviePagination() {
  const dispatch = useDispatch<AppDispatch>()

  const page = useSelector((s: RootState) => s.movie.data?.page)
  const totalPages = useSelector((s: RootState) => s.movie.data?.total_pages)

  const goToPage = (p: number) => {
    if (!totalPages) return
    if (p < 1 || p > totalPages) return
    dispatch(fetchMovie(p))
  }

  if (!page || !totalPages) {
    return <div>Loading...</div>
  }

    return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => goToPage(page - 1)}
            className={page === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={() => goToPage(page + 1)}
            className={page === totalPages ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

      </PaginationContent>
    </Pagination>
  )
}
