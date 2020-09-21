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
  ano_veiculo =  null;
  kilometragem_veiculo = null
  cor_veiculo: String = '';
  preco_veiculo = null;
  isLoadingResults = false;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private FormBuilder: FormBuilder) { }

  ngOnInit() {
    this.getVeiculo(this.route.snapshot.params['id']);
    this.productForm = this.FormBuilder.group({
      marca_veiculo: [null, Validators.required],
      nome_veiculo: [null, Validators.required],
      versao_veiculo: [null, Validators.required],
      ano_veiculo: [null, Validators.required],
      kilometragem_veiculo: [null, Validators.required],
      cor_veiculo: [null, Validators.required],
      preco_veiculo:[null, Validators.required]
    });
  }

  getVeiculo(id) {
    this.api.getVeiculo(id).subscribe(data => {
      this._id = data._id;
      this.productForm.setValue({
        nome_veiculo: data.nome,
        versao_veiculo: data.versao,
        ano_veiculo: data.ano,
        kilometragem_veiculo: data.kilometragem,
        cor_veiculo: data.cor,
        preco_veiculo: data.preco
      })
    })
  }

  updateVeiculo(form: NgForm) {
    this.isLoadingResults = true;
    this.api.updateVeiculo(this._id, form).subscribe(res => {
      this.isLoadingResults = false;
      this.router.navigate(['/veiculo-detalhe' + this._id]);
    }, (err) => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }
}


