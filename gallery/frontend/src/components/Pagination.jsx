import React, { useRef, useState } from 'react';
import {Button} from "@fluentui/react-components";
import {ChevronLeftRegular, ChevronRightRegular} from "@fluentui/react-icons";

const PaginatedSection = ({ title, items, itemsPerPage = 12, renderItem, children }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const topRef = useRef(null);

    if (!items || items.length === 0) return null;

    const last = currentPage * itemsPerPage;
    const first = last - itemsPerPage;
    const currentItems = items.slice(first, last);
    const totalPages = Math.ceil(items.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        if (topRef.current) {
            topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div ref={topRef} className="mb-12 scroll-mt-24 w-full">
            {title && <h3 className="text-2xl font-semibold mb-4 border-b pb-2">{title}</h3>}

            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-3 gap-8 mb-8">
                {renderItem 
                    ? currentItems.map((item) => renderItem(item))
                    : children // Fallback if you want to manage mapping outside
                }
            </div>

            {items.length > itemsPerPage && (
                <div className="flex justify-center items-center gap-2 mb-32">
                    <Button
                        icon={<ChevronLeftRegular />}
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                        appearance="subtle"
                    />

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                            key={page}
                            appearance={currentPage === page ? "primary" : "subtle"}
                            onClick={() => handlePageChange(page)}
                            style={currentPage === page ? { backgroundColor: '#9C0D38', color: 'white' } : {}}
                        >
                            {page}
                        </Button>
                    ))}

                    <Button
                        icon={<ChevronRightRegular />}
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                        appearance="subtle"
                    />
                </div>
            )}
        </div>
    );
};

export default PaginatedSection;