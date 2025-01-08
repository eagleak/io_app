import { Component, OnInit } from '@angular/core';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service'; // Import FirebaseService

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
  ],
  providers: [Device],
})
export class HomePage implements OnInit {
  deviceInfo: any;
  showDeviceInfo: boolean = false;
  tasks: any[] = []; // Property to hold tasks

  constructor(private device: Device, private router: Router, private firebaseService: FirebaseService) {}

  ngOnInit() {
    // Load tasks from Firestore
    this.loadTasks();

    // Initialize device info
    this.deviceInfo = {
      model: this.device.model,
      platform: this.device.platform,
      version: this.device.version,
      manufacturer: this.device.manufacturer,
      isVirtual: this.device.isVirtual,
      serial: this.device.serial,
    };
  }

  toggleDeviceInfo() {
    this.showDeviceInfo = !this.showDeviceInfo;
  }

  navigateToAddTask() {
    this.router.navigate(['/add-task']);
  }

  loadTasks() {
    this.firebaseService.getTasks().subscribe({
      next: (tasks: any[]) => {
        this.tasks = tasks || []; // Ensure tasks is assigned
        console.log('Tasks loaded:', this.tasks);
      },
      error: (error: any) => {
        console.error('Error loading tasks:', error);
        this.tasks = []; // Handle error gracefully
      },
    });
  }    
}
