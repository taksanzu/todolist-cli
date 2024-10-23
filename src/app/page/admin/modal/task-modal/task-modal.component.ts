import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Task } from '../../../../models/task';
import { Category } from '../../../../models/category';
import { TaskService } from '../../../../service/admin/task.service';
import { CategoryService } from '../../../../service/admin/category.service';
import {User} from '../../../../models/user';
import { UserService } from '../../../../service/admin/user.service';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.css'
})
export class TaskModalComponent implements OnInit {
  // @ts-ignore
  @Input() task: Partial<Task> = { category: { id: 0, name: '' } };
  @Input() categories: Category[] = [];
  @Input() assignees: User[] = [];
  @Output() saveTaskEvent = new EventEmitter<Partial<Task>>();
  @ViewChild('taskModal') taskModal!: ElementRef;
  errorMessage: string = "";

  constructor(private taskService: TaskService,
              private categoryService: CategoryService,
              private userService: UserService) {}

  ngAfterViewInit(): void {
    const modalElement = this.taskModal.nativeElement;
    modalElement.addEventListener('hide.bs.modal', () => {
      this.clearModal();
    });
  }
  get selectedCategoryId(): number {
    return this.task.category?.id || 0;
  }

  get selectedAssigneeId(): number {
    return this.task.assignee?.id || 0;
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadAssignee();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error loading categories:', error);
      }
    );
  }

  loadAssignee(): void {
    this.userService.getNormalUsers().subscribe(
      (data) => {
        this.assignees = data;
      },
      (error) => {
        console.error('Error loading assignee:', error);
      }
    );
  }

  saveTask(): void {
    if (this.task.id) {
      this.taskService.updateTask(this.task, this.selectedCategoryId, this.selectedAssigneeId).subscribe(
        (data) => {
          this.saveTaskEvent.emit(data);
          this.clearModal();
          this.closeModal();
        },
        (error) => {
          this.errorMessage = error.error.message;
        }
      );
    } else {
      this.taskService.createTask(this.task, this.selectedCategoryId, this.selectedAssigneeId).subscribe(
        (data) => {
          this.saveTaskEvent.emit(data);
          this.clearModal();
          this.closeModal();
        },
        (error) => {
          this.errorMessage = error.error.message;
        }
      );
    }
  }

  closeModal(): void {
    const modalElement = this.taskModal.nativeElement;
    // @ts-ignore
    const modalInstance = bootstrap.Modal.getInstance(modalElement);

    if (modalInstance) {
      modalInstance.hide();
    } else {
      // @ts-ignore
      const newModalInstance = new bootstrap.Modal(modalElement);
      newModalInstance.hide();
    }
  }

  clearModal(): void {
    // @ts-ignore
    this.task = {id: undefined, title: '', description: '', important: 0, dueDate: new Date(), done: false, category: {id: undefined, name: ''}};
    this.errorMessage = "";
  }
}
