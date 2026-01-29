import { Component, OnInit } from '@angular/core';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'pantkotsi-front';

  constructor(private themeService: ThemeService) {}
  
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }
}
