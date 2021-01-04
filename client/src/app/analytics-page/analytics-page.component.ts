import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AnalyticsPage } from '../shared/interfaces';
import { AnalyticsService } from '../shared/services/analytics.service';
import {Chart} from 'chart.js'

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.css']
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('gain') gainRef: ElementRef
  @ViewChild('order') orderRef: ElementRef

  average: number
  pending = true
  aSub: Subscription

  constructor(private service: AnalyticsService) { }

  ngAfterViewInit() {
    const gainConfig: any ={
      label: 'Profit',
      color: 'rgb(255, 99, 132)'

    }

    const orderConfig: any ={
      label: 'Orders',
      color: 'rgb(54, 162, 235)'

    }

    this.aSub = this.service.getAnalytics().subscribe((data: AnalyticsPage)=>{
      this.average = data.average

      gainConfig.labels = data.chart.map(item => item.label)
      gainConfig.data = data.chart.map(item => item.gain)


      orderConfig.labels = data.chart.map(item => item.label)
      orderConfig.data = data.chart.map(item => item.order)

      //**** gain****/
      gainConfig.labels.push('30.12.2020')
      gainConfig.labels.push('31.12.2020')
      gainConfig.data.push(1500)
      gainConfig.data.push(700)

      //**gain */

      //**** order****/
      orderConfig.labels.push('30.12.2020')
      orderConfig.labels.push('31.12.2020')
      orderConfig.data.push(8)
      orderConfig.data.push(4)

      //**order */

      const gainCtx = this.gainRef.nativeElement.getContext('2d')
      const orderCtx = this.orderRef.nativeElement.getContext('2d')

      gainCtx.canvas.height = '300px'
      orderCtx.canvas.height = '300px'

      new Chart(gainCtx, createChartConfig(gainConfig))
      new Chart(orderCtx, createChartConfig(orderConfig))


      this.pending = false

  })
  }

  ngOnDestroy(){

  if(this.aSub){
    this.aSub.unsubscribe()
}

  }
}


function createChartConfig({labels, data, label, color}){
  return{
    type: 'line',
    options: {
      responsive:true
    },
    data:{
      labels,
      datasets:[
        {
          label, data,
          borderColor: color,
          steppedLine: false,
          fill: false
        }
      ]
    }
  }
}
