import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideNav = new EventEmitter();
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  onToggleSideNav() {
    this.toggleSideNav.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}
