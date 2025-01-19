import { Pipe, PipeTransform } from '@angular/core';
import { ToDoItem } from '../model/ToDoItem';

@Pipe({
  name: 'itemFilter',
  standalone: true,
  pure: false
})
export class ItemFilterPipe implements PipeTransform {
  transform(value: ToDoItem[], isDone: boolean) {
    return value.filter(item => item.isDone === isDone);
  }
}
