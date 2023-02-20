export class Job{
    id=0;
    title="";
    childJobs:Job[] = []
    constructor(data:any){
        this.id=data.id;
        this.title=data.title;
        this.childJobs= data.childJobs.map((job:any)=>{
            return new Job(job); //recursive creation
        })
    }
}