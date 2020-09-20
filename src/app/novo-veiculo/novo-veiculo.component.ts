import { Component, OnInit } from '@angular/core';
import {Router, router} from '@angular/router';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import { ApiService } from './../service/api.service';

productForm: FormGroup;
isLoadingResults = false;

addVeiculo(form: NgForm){
  this.isLoadingResults = true;
  this.api.addVeiculo(form)
  .subscribe(res => {
    const id = res['_id'];
    this.isLoadingResults = false;
    this.router.navigate(['/veiculo-detalhe', id]);
  }, (err) => {
    console.log(err);
    this.isLoadingResults = false;
  });
}

@Component({
  selector: 'app-novo-veiculo',
  templateUrl: './novo-veiculo.component.html',
  styleUrls: ['./novo-veiculo.component.scss']
})
export class NovoVeiculoComponent implements OnInit {

  constructor( private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): {
    this.productForm = this.formBuilder.group({
      'marca_veiculo': [null, Validators.required],
      'nome_veiculo': [null, Validators.required],
      'versao_veiculo': [null, Validators.required],
      'ano_veiculo': [null, Validators.required],
      'kilometragem_veiculo': [null, Validators.required],
      'cor_veiculo': [null, Validators.required],
      'preco_veiculo': [null, Validators.required]
    });
  }
}

