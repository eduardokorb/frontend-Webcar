import { ApiService } from './../service/api.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';



@Component({
  selector: 'app-editar-veiculo',
  templateUrl: './editar-veiculo.component.html',
  styleUrls: ['./editar-veiculo.component.scss']
})
export class EditarVeiculoComponent implements OnInit {
  _id: String = '';
  productForm: FormGroup;
  marca_veiculo: String = '';
  nome_veiculo: String = '';
  versao_veiculo: String = '';
  ano_veiculo: Number = null;
  kilometragem_veiculo: Number = null;
  cor_veiculo: String = '';
  preco_veiculo: Number = null;
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private FormBuilder: FormBuilder) { }

  ngOnInit(): {
    this.getVeiculo(this.route.snapshot.params['id']);
    this.productForm = this.FormBuilder.group({
      'marca_veiculo': [null, Validators.required],
      'nome_veiculo': [null, Validators.required],
      'versao_veiculo': [null, Validators.required],
      'ano_veiculo': [null, Validators.required],
      'kilometragem_veiculo': [null, Validators.required],
      'cor_veiculo': [null, Validators.required],
      'preco_veiculo':[null, Validators.required]
    });
  }

  getVeiculo(id){
    this.api.getVeiculo(id).subscribe(data => {
      this._id = data._id;
      this.productForm.setValue({
        marca_veiculo: data.marca_veiculo,
        nome_veiculo: data.nome_veiculo,
        versao_veiculo: data.versao_veiculo,
        ano_veiculo: data.ano_veiculo,
        kilometragem_veiculo: data.kilometragem_veiculo,
        cor_veiculo: data.cor_veiculo,
        preco_veiculo: data.preco_veiculo
      });
    });
  }

  updateVeiculo(form: NgForm){
    this.isLoadingResults = true;
    this.api.updateVeiculo(this._id, form)
    .subscribe(res => {
      this.isLoadingResults = false;
      this.router.navigate(['/veiculo-detalhe' + this._id]);
    },(err) => {
      console.log(err);
      this.isLoadingRresults = false;
    }
    });
  }
}


