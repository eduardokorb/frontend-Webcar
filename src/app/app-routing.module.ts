import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VeiculosComponent } from './veiculos/veiculos.component';
import { ViewVeiculoComponent } from './view-veiculo/view-veiculo.component';
import { NovoVeiculoComponent } from './novo-veiculo/novo-veiculo.component';
import { EditarVeiculoComponent } from './editar-veiculo/editar-veiculo.component';


const routes: Routes = [
  {
    path: 'veiculos',
    component: VeiculosComponent,
    data: { title: 'Lista de Veículos'}
  },
  {
    path: 'view-veiculo/:id',
    component: ViewVeiculoComponent,
    data: { title: 'Veiculo selecionado'}
  },
  {
    path: 'novo-veiculo',
    component: NovoVeiculoComponent,
    data: { title: 'Novo Veículo'}
  },
  {
    path: 'editar-veiculo/:id',
    component: EditarVeiculoComponent,
    data: { title: 'Editar Veículo'}
  },
  {
    path: '',
    redirectTo: '/veiculos',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
