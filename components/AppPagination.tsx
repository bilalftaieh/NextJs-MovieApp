'use client'
import React, { useState,useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { Pagination } from "@nextui-org/react";

export default function AppPagination({ totalPages }: { totalPages: number }){
    const [currentPage, setCurrentPage] = useState(1);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
      // Get 'page' parameter from URL
      const pageParam = searchParams.get('page');
      if (pageParam) {
          // Parse 'page' parameter to integer and set as current page
          setCurrentPage(Number(pageParam));
      }
  }, []);

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    const onPageChange = (page:number) => {
        setCurrentPage(page);
        const url = createPageURL(page);
        router.replace(url);
    }

    return (
        <Pagination loop showControls total={totalPages} page={currentPage} onChange={onPageChange}/>
    );
}
