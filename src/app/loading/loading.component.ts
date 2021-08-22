import { Component, OnInit } from "@angular/core";
import { CommonService } from "../shared/common.service";

@Component({
  selector: "loading",
  templateUrl: "./loading.component.html",
  styleUrls: ["./loading.component.css"],
})
export class LoadingComponent implements OnInit {
  constructor(public commonService: CommonService) {}

  ngOnInit(): void {}
}
