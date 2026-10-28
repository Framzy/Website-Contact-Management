export default function useGetPages() {
  function getPages(totalPage, page) {
    const pages = [];

    if (totalPage <= 5) {
      for (let i = 1; i <= totalPage; i++) pages.push(i);
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, "...", totalPage);
      } else if (page >= totalPage - 2) {
        pages.push(1, "...", totalPage - 2, totalPage - 1, totalPage);
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPage);
      }
    }

    return pages;
  }

  return { getPages };
}
