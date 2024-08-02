export type Page = {
  size: number
  total_page: number
  current_page: number
}

export type Pageable<T> = {
  data: Array<T>
  paging: Page
}
