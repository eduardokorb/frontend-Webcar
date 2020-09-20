import { Component, OnInit } from '@angular/core';
import { ApiService } from './../service/api.service';
import { Veiculo } from './../model/veiculo';

displayedColumns: string[] = ['_id','marca','nome','versao','ano','kilometragem','cor','preco'];
dataSource: Veiculo[];
constructor(private _api: ApiService) { }

@Component({
  selector: 'app-veiculos',
  templateUrl: './veiculos.component.html',
  styleUrls: ['./veiculos.component.scss']
})
export class VeiculosComponent implements OnInit {

  constructor() { }

  ngOnInit(): {
    this._api.getVeiculos()
    .subscribe(res => {
      this.dataSource = res;
      console.log(this.dataSource);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }
}
