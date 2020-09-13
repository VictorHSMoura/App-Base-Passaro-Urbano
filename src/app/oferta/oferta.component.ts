import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Observer, Subscription } from 'rxjs';
import { URL_API } from '../app.api';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';
import { interval } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { CarrinhoService } from '../carrinho.service';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
})
export class OfertaComponent implements OnInit, OnDestroy {

  private tempoObservableSubscription: Subscription;
  private meuObservableTesteSubscription: Subscription;

  public oferta: Oferta;

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService,
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((parametros: Params) => {
      this.ofertasService.getOfertasPorId(parametros.id)
      .then((oferta: Oferta) => {
        this.oferta = oferta;
      });
    });
  }

  ngOnDestroy(): void {
  }

  public adicionarItemCarrinho(): void {
    this.carrinhoService.incluirItem(this.oferta);
  }
}
