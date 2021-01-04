import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialService } from '../../classes/material.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements AfterViewInit {
  @ViewChild('floating') floatingRef:ElementRef
  links =[
    {url:'/overview', name:'Overview'},
    {url:'/analytics', name:'Analytics'},
    {url:'/history', name:'History'},
    {url:'/order', name:'Add order'},
    {url:'/categories', name:'Product line'},
  ]

  constructor(private auth:AuthService, private router: Router) { }


ngAfterViewInit(){
  MaterialService.initializeFloatingButton(this.floatingRef)

}

  logout(event:Event){
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/login'])

  }
}
