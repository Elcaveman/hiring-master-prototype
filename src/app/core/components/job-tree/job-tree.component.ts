import { Component, OnInit } from '@angular/core';
import { NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd/tree';
import { FakeDataService } from '../../services/fake-data.service';
import { Job } from '../../models/job';
import { Observable, map, tap } from 'rxjs';

@Component({
  selector: 'core-job-tree',
  template: `
  <ng-container *ngIf="parsedJobsTree$ | async as parsedJobsTree">
    <nz-tree [nzData]="parsedJobsTree" nzShowLine (nzClick)="nzEvent($event)"></nz-tree> 
  </ng-container>
  `,
  styleUrls: ['./job-tree.component.scss']
})
export class JobTreeComponent implements OnInit{
  jobsStream$!:Observable<Job[]>;
  parsedJobsTree$!: Observable<NzTreeNode[]>;
  // can add reload subject
  constructor(private fakeDataService:FakeDataService){
  }
  ngOnInit(): void {
    this.jobsStream$ = this.fakeDataService.getJobAll();
    this.parsedJobsTree$ = this.jobsStream$.pipe(
      map((jobList:Job[])=>this.parseJobList(jobList)),
      tap((res:any)=>console.log(res))
    )
  }
  parseJobList(jobs:Job[],acc?:any[]){
    // recursive ; acc means accumulator start
    if (acc == undefined) acc = [];
    if (jobs.length == 0) return acc;
    else{
      for (let job of jobs){
        const parsedJob : any = {...job};
        parsedJob.children = this.parseJobList(job.childJobs,[]);// reference assign meaning for memory opti
        delete parsedJob.childJobs;
        if (parsedJob.children.length==0) parsedJob.isLeaf = true; 
        acc.push(parsedJob);
      }
      return acc;
    }
  }
  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }

}
