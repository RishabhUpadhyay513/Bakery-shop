import { Directive, Input } from '@angular/core';
import { UserListService } from './user-list.service';

@Directive({
  selector: '[appSearchCake]',
})
export class SearchCakeDirective {
  @Input() searchKey: any;
  constructor(private cs: UserListService) {}

  ngOnChanges(changes: any) {
    if (changes.searchKey.firstChange) return;
    // trim the white sapces from search query
    const searchQuery = this.searchKey.trim();

    // check if search Query is empty space
    if (!searchQuery) {
      this.cs.cakeSearch = [...this.cs.cakeList];
      return;
    }

    // filter out the matched data
    this.cs.cakeSearch = this.cs.cakeList.filter((e: any) =>
      e.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
}
