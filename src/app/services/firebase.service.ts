import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DocumentReference } from 'firebase/firestore'; // Correct import for DocumentReference

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: Firestore) {}

  // Fetch tasks from Firestore
  getTasks(): Observable<any[]> {
    const tasksRef = collection(this.firestore, 'tasks'); // Create collection reference
    return collectionData(tasksRef, { idField: 'id' }); // Fetch data with IDs included
  }

  // Add a task to Firestore
  addTask(task: any): Promise<DocumentReference<any>> {
    const tasksRef = collection(this.firestore, 'tasks');
    return addDoc(tasksRef, task); // Add a new document to Firestore
  }
}
