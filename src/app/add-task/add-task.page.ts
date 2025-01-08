import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonSelect, 
  IonSelectOption, 
  IonTextarea, 
  IonButton 
} from '@ionic/angular/standalone';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonItem, 
    IonLabel, 
    IonInput, 
    IonSelect, 
    IonSelectOption, 
    IonTextarea, 
    IonButton, 
    CommonModule, 
    FormsModule
  ]
})
export class AddTaskPage implements OnInit {
  taskName: string = '';
  taskPriority: string = '';
  taskDescription: string = '';

  constructor(private firebaseService: FirebaseService, private router: Router) {}

  ngOnInit() {}

  saveTask() {
    if (this.taskName && this.taskPriority && this.taskDescription) {
      const task = {
        name: this.taskName,
        priority: this.taskPriority,
        description: this.taskDescription,
        completed: false,
      };

      this.firebaseService.addTask(task)
        .then(() => {
          console.log('Task added successfully!');
          this.clearFields();
          this.router.navigate(['/home']);
        })
        .catch((error: unknown) => {
          console.error('Error adding task:', error);
        });
    } else {
      console.error('Please fill out all fields!');
    }
  }

  // Clears the form fields
  private clearFields() {
    this.taskName = '';
    this.taskPriority = '';
    this.taskDescription = '';
  }
}
