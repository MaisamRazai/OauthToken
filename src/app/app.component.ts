import { GraphService } from './graph.service';
import { Component } from '@angular/core';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  users: Array<User>;
  constructor(private graphService: GraphService
  ) {
    graphService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

}

