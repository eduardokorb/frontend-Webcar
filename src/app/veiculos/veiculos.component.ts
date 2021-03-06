import { Component, OnInit } from '@angular/core';
import { ApiService } from './../service/api.service';
import { Veiculo } from './../model/veiculo';

@Component({
  selector: 'app-veiculos',
  templateUrl: './veiculos.component.html',
  styleUrls: ['./veiculos.component.scss']
})
export class VeiculosComponent implements OnInit {

  displayedColumns: string[] = ['_id', 'marca', 'nome', 'versao', 'ano', 'kilometragem', 'cor', 'preco'];
  dataSource: Veiculo[];
  isLoadingResults = false;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getVeiculos()
    .subscribe(res => {
      this.dataSource = res;
      console.log(res);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }
}
