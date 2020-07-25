import http from '../util/http';
import {Viacep} from '../models/viacep';

interface EntidadeBase {
    id: number
}

export default class CepService {

    getEndereco(cep: string) {
        return http.get<Viacep>(`https://viacep.com.br/ws/${cep}/json/`);
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
