import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from './../service/api.service';
import { Veiculo } from './../model/veiculo';



@Component({
  selector: 'app-view-veiculo',
  templateUrl: './view-veiculo.component.html',
  styleUrls: ['./view-veiculo.component.scss']
})
export class ViewVeiculoComponent implements OnInit {
  veiculo: Veiculo = {_id:'', marca_veiculo:'', nome_veiculo:'', versao_veiculo:'', ano_veiculo: null, kilometragem_veiculo: null, cor_veiculo:'', preco_veiculo: null, dt_atualizacao: null };
  isLoadingResults = true;

  constructor(private router: Router, private route: ActivatedRoute, private spi: ApiService) { }

  ngOnInit(): {
    this.getVeiculo(this.route.snapshot.params['id']);
  }

  getVeiculo(id) {
    this.api.getVeiculo(id)
    .subscribe(data => {
      this.veiculo = data;
      console.log(this.veiculo);
      this.isLoadingResults = false;
    });
  }

  deleteVeiculo(id) {
    this.isLoadingResults = true;
    this.api.deleteVeiculo(id)
    .subscribe(res => {
      this.isLoadingResults = false;
      this.router.navigate(['/veiculos']);
    }, (err) => {
      console.log(err);
      this.isLoadingResults = false;
    }
    );
  }
}
