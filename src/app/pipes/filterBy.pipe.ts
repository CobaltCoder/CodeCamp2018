import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterByFeatured'
})
export class FilterPipe implements PipeTransform {
    transform(value: any, args: number): any {
        let fieldValue = args;
        return value.filter((e: any) => {
            return (e['featured'] == fieldValue);
        });
    }
}
