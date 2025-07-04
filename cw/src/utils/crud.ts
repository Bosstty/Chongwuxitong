import { service } from '@/utils/request';

export interface PageInfo<T> {
    current: number;
    size: number;
    total: number;
    pages: number;
    data: Array<T>;
}

/**
 * 查询 集合
 * @param url
 * @param queryParam
 * @returns
 */
export function list<T>(url: string, queryParam?: object): Promise<T[]> {
    // 为给定 ID 的 user 创建请求
    //data  真实的数据
    return service.get<T[]>(url, { params: queryParam });
}

/**
 *  分页查询
 * @param url
 * @param queryParam
 * @returns
 */
export function page<T>(url: string, queryParam: object): Promise<PageInfo<T>> {
    // 为给定 ID 的 user 创建请求
    //data  真实的数据
    return service.get<PageInfo<T>>(url, { params: queryParam });
}

/**
 *
 * @param url 根据主键删除
 * @param id
 * @returns
 */
export function deleteById(url: string, id: string): Promise<boolean> {
    return service.get<boolean>(url, { params: { id: id } });
}

/**
 * 保存或修改
 * @param url
 * @param form
 * @returns
 */
export function saveOrUpdate(url: string, form: object): Promise<boolean> {
    return service.get<boolean>(url, { params: form });
}

/**
 *
 * @param url 根据主键查询一条结果
 * @param id
 * @returns
 */
export function queryById<T>(url: string, id: string): Promise<T> {
    return service.get<T>(url, { params: { id: id } });
}
