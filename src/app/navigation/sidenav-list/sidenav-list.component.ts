import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-sidenav-list",
  templateUrl: "./sidenav-list.component.html",
  styleUrls: ["./sidenav-list.component.css"],
})
export class SidenavListComponent implements OnInit {
  @Output() closeSideNav = new EventEmitter<void>();

  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  onCloseSideNav() {
    this.closeSideNav.emit();
  }

  onLogout() {
    this.onCloseSideNav();
    this.authService.logout();
  }
}
