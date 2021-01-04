import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';
import { OverviewPage } from '../shared/interfaces';
import { AnalyticsService } from '../shared/services/analytics.service';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.css']
})
export class OverviewPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('tapTarget') tapTargetRef: ElementRef
  data$: Observable<OverviewPage>
  tapTarget:MaterialInstance

  yesterday = new Date()

  constructor(private service: AnalyticsService) { }

  ngOnInit(): void {
   this.data$= this.service.getOverview()
   this.yesterday.setDate(this.yesterday.getDate() -1)
  }
ngOnDestroy(){
  this.tapTarget.destroy()
}

openInfo(){
  this.tapTarget.open()

}

ngAfterViewInit(){
  this.tapTarget = MaterialService.initTapTarget(this.tapTargetRef)
}
}
