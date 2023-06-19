export interface PaginationParams {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
}

export interface ListResponse<T> {
    items: T[];
    meta: PaginationParams;
}

export interface ListParams {
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'ASC' | 'DESC';
    [key: string]: any;
}