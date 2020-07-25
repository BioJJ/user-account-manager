import http from '../util/http';

interface EntidadeBase {
    id: number
}

export default class GenericService<T extends EntidadeBase> {
    base: string = 'http://localhost:3000';
    endpoint: string = ``;

    constructor(recurso: string){
        this.endpoint = recurso;
    }

    save(item: T) {
        return http.post<T>(`${this.base}/${this.endpoint}`, item)
    }

    /*update(item: T) {
        return api.post<T>(`${this.endpoint}/${item.id}`, item);
    }

    list(pagination: Pagination) {
        if(pagination.limit < 0) pagination.limit = 0;
        return api.get<Page<T>>(`/${this.endpoint}`, {params: pagination});
    }

    delete(id: number) {
        return api.delete(`${this.endpoint}/${id}`);
    }*/
}
