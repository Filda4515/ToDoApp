import { Pipe, PipeTransform } from '@angular/core';
import { ToDoItem } from '../model/ToDoItem';

@Pipe({
  name: 'groupItems',
  standalone: true,
  pure: false
})
export class GroupItemsPipe implements PipeTransform {
  transform(value: any) {
    const groupsDict: Record<string, ToDoItem[]> = {
      'To Do': [],
      'Done': [],
    };

    value.forEach((obj: any) => {
      const category = obj['isDone'] ? 'Done' : 'To Do';
      groupsDict[category].push(obj);
    });

    const groups = Object.entries(groupsDict)
    .filter(([category, list]) => list.length > 0)
    .map(([category, list]) => ({
      category,
      list,
    }));

    return groups;
  }
}
