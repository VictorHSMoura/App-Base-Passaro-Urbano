import { Oferta } from './shared/oferta.model'
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { URL_API } from './app.api' 
import { Observable } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { OfertaComponent } from './oferta/oferta.component';

@Injectable()
export class OfertasService {

    constructor(private http: HttpClient){ }

    public getOfertas(): Promise<Oferta[]> {
        // efetuar uma requisição http
        return this.http.get(`${URL_API}/ofertas?destaque=true`)
            .toPromise()
            .then((resposta: Oferta[]) => resposta);
        // retornar uma promise Oferta[]
    }

    public getOfertasPorCategoria(categoria: string) : Promise<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?categoria=${categoria}`)
            .toPromise()
            .then((resposta: Oferta[]) => resposta);
    }

    public getOfertasPorId(id: number) : Promise<Oferta> {
        return this.http.get(`${URL_API}/ofertas?id=${id}`)
            .toPromise()
            .then((resposta: Oferta) => resposta[0]);
    }

    public getComoUsarOfertaPorId(id: number) : Promise<string> {
        return this.http.get(`${URL_API}/como-usar?id=${id}`)
            .toPromise()
            .then((resposta: Oferta) => resposta[0].descricao);
    }

    public getOndeFicaOfertaPorId(id: number) : Promise<string> {
        return this.http.get(`${URL_API}/onde-fica?id=${id}`)
            .toPromise()
            .then((resposta: Oferta) => resposta[0].descricao);
    }

    public pesquisaOfertas(termo: string) : Observable<Oferta []> {
        return this.http.get(`${URL_API}/ofertas?descricao_oferta_like=${termo}`)
            .pipe(map((resposta: Oferta[]) => resposta), retry(10));
    }
}