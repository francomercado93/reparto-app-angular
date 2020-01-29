import { Pipe, PipeTransform } from '@angular/core';
import { Fila } from 'src/domain/fila';
import { valorAbsoluto } from 'src/domain/valorAbsoluto';

@Pipe({
  name: 'saldoPipe'
})
export class SaldoPipe implements PipeTransform {

  transform(saldo: number): any {
    var mensajeSaldo = " "
    if (saldo < 0) {
      mensajeSaldo = "El cliente debe $" + valorAbsoluto(saldo)
    }
    else {
      mensajeSaldo = "Debo $" + valorAbsoluto(saldo)
    }
    return mensajeSaldo
  }
}
