import { Component, OnInit } from '@angular/core';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { FakeDataService } from '../../services/fake-data.service';

@Component({
  selector: 'core-job-tree',
  template: `
    <nz-tree [nzData]="nodes" nzShowLine (nzClick)="nzEvent($event)"></nz-tree> 
  `,
  styleUrls: ['./job-tree.component.scss']
})
export class JobTreeComponent implements OnInit{
  // jobs tree needs parsing
  nodes = [
    {
      title: 'parent 1',
      key: '100',
      expanded: true,
      children: [
        {
          title: 'parent 1-0',
          key: '1001',
          expanded: true,
          children: [
            { title: 'leaf', key: '10010', isLeaf: true },
            { title: 'leaf', key: '10011', isLeaf: true },
            { title: 'leaf', key: '10012', isLeaf: true }
          ]
        },
        {
          title: 'parent 1-1',
          key: '1002',
          children: [{ title: 'leaf', key: '10020', isLeaf: true }]
        },
        {
          title: 'parent 1-2',
          key: '1003',
          children: [
            { title: 'leaf', key: '10030', isLeaf: true },
            { title: 'leaf', key: '10031', isLeaf: true }
          ]
        }
      ]
    }
  ];
  constructor(private fakeDataService:FakeDataService){
  }
  ngOnInit(): void {
    this.fakeDataService.getJobAll().subscribe((res)=>console.log(res));
    this.fakeDataService.getJobById(1).subscribe((res)=>console.log(res));
  }
  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }

}
