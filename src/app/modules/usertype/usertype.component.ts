import { UsertypeService } from '../../services/usertype.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usertype',
  templateUrl: './usertype.component.html',
  styleUrls: ['./usertype.component.scss']
})
export class UsertypeComponent implements OnInit {

  userTypes: any[];

  constructor(private usertypeService: UsertypeService) { }

  ngOnInit() {
    
  }

}
