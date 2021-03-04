import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'kanban-board',
  templateUrl: './kanbanBoard.component.html',
  styleUrls: ['./kanbanBoard.component.scss']
})
export class KanbanBoard implements OnInit {
  tasks: Task[];
  stagesNames: string[];
  stagesTasks: any[]; //Only used for rendering purpose
  @Input() newTask:string;


  ngOnInit() {
    // Each task is uniquely identified by its name. 
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.tasks = [
      { name: '0', stage: 0 },
      { name: '1', stage: 0 },
    ];
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
    this.configureTasksForRendering();
  }
  
  // this function has to be called whenever tasks array is changed to construct stagesTasks for rendering purpose
  configureTasksForRendering = () => {
    this.stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      this.stagesTasks.push([]);
    }
    for (let task of this.tasks) {
      const stageId = task.stage;
      this.stagesTasks[stageId].push(task);
     
    }
    
  }

  generateTestId = (name) => {
    return name.split(' ').join('-');
  }


  addTask=()=>{
   // alert(this.newTask);
    if(this.newTask==void(0)){
      return;
    }

    let taskFind=this.tasks.find(taskI=>taskI.name==this.newTask);
    if(taskFind==void(0)){


    this.tasks.push({
      name:this.newTask,
      stage:0
    });
    this.configureTasksForRendering();}

    this.newTask="";


  }
  returnB=(taskItem:Task)=>{
    if(taskItem.stage!=0){
      taskItem.stage--;
    }
    this.configureTasksForRendering();

  }
  foward=(taskItem:Task)=>{
    if(taskItem.stage+1 < this.stagesNames.length){
      taskItem.stage++;

    }
    this.configureTasksForRendering();
  }
  delete=(taskItem:Task)=>{
    let taskFind=this.tasks.findIndex(taskI=>taskI.name==taskItem.name);
   
    if(taskFind!=-1)
      this.tasks.splice(taskFind,1);
    this.configureTasksForRendering();
  }




}

interface Task {
  name: string;
  stage: number;
}