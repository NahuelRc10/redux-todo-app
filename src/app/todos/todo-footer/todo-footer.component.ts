import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { filtrosValidos, setFiltro } from 'src/app/filtro/filtro.actions';
import { limpiarTodos } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {

  filtroActual: filtrosValidos = 'todos';
  filtros: filtrosValidos[] = ['todos', 'completados', 'pendientes'];
  totalTareasPendientes: number = 0;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    // this.store.select('filtro').subscribe(data => {
    //   this.filtroActual = data;
    // });
    this.store.subscribe(state => {
      this.filtroActual = state.filtro;
      this.totalTareasPendientes = state.todos.filter(todo => todo.completado != true).length;
    });
  }

  public cambiarFiltro(filtro: filtrosValidos) {
    this.store.dispatch(setFiltro({ filtro: filtro })); 
  }

  public limpiarTodos() {
    this.store.dispatch(limpiarTodos());
  }
}
