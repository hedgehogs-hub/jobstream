import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UsersComponent} from '../users/users.component';

@Component({
  selector: 'app-conf-dialog',
  templateUrl: './conf-dialog.component.html',
  styleUrls: ['./conf-dialog.component.css']
})
export class ConfDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UsersComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
  }
  onClose() {
    this.dialogRef.close()
  }

}
