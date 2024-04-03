import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Output() selectedPage: EventEmitter<string> = new EventEmitter();
  currentPage: string = '';

  selectPage(page: string) {
    this.currentPage = page;
    this.selectedPage.emit(page);
  }

}
