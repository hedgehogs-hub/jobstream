import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-job-search-list',
  templateUrl: './job-search-list.component.html',
  styleUrls: ['./job-search-list.component.css']
})
export class JobSearchListComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  handlePageChange(evt) {
    console.log(evt);
  }
}
