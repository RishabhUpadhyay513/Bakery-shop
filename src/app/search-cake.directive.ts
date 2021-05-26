import { Directive, Input } from '@angular/core';
import { AdminService } from './admin.service';
import { UserListService } from './user-list.service';

@Directive({
  selector: '[appSearchCake]',
})
export class SearchCakeDirective {
  @Input() searchKey: any;
  @Input() userAdmin: any = false;
  constructor(private cs: UserListService, private admin: AdminService) {}

  ngOnChanges(changes: any) {
    if (changes.searchKey.firstChange) return;
    console.log(changes);
    // trim the white sapces from search query
    const searchQuery = this.searchKey.trim();

    // check if search Query is empty space
    if (!searchQuery) {
      !this.userAdmin
        ? (this.cs.cakeSearch = [...this.cs.cakeList])
        : (this.admin.cakeSearch = [...this.admin.cakeList]);
      return;
    }

    // filter out the matched data
    !this.userAdmin
      ? (this.cs.cakeSearch = this.cs.cakeList.filter((e: any) =>
          e.name.toLowerCase().includes(searchQuery.toLowerCase())
        ))
      : (this.admin.cakeSearch = this.admin.cakeList.filter((e: any) =>
          e.name.toLowerCase().includes(searchQuery.toLowerCase())
        ));
  }
}
