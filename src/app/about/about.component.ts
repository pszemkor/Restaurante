import { Component, OnInit, Inject } from '@angular/core';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';
import { flyInOut, expand } from '../animations/app.animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class AboutComponent implements OnInit {
  errorMessage: any;
  BaseURL: any;

  constructor(private leaderService: LeaderService,
    @Inject('BaseURL') BaseURL) { 
      this.BaseURL = BaseURL;
    }
  leaders: Leader[];

  ngOnInit(): void {
    this.leaderService.getLeaders()
      .subscribe(leadersList => this.leaders = leadersList,
        error => this.errorMessage = <any>error);
  }

}
