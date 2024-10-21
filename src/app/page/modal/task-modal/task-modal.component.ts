import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Task } from '../../../models/task';
import { Category } from '../../../models/category';
import { TaskService } from '../../../service/task/task.service';
import { CategoryService } from '../../../service/category/category.service';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.css'
})
export class TaskModalComponent implements OnInit {
  // @ts-ignore
  @Input() task: Partial<Task> = { category: { id: 0, name: '' } };
  @Input() categories: Category[] = [];
  @Output() saveTaskEvent = new EventEmitter<Partial<Task>>();
  @ViewChild('taskModal') taskModal!: ElementRef;
  errorMessage: string = "";

  constructor(private taskService: TaskService, private categoryService: CategoryService) {}

  ngAfterViewInit(): void {
    const modalElement = this.taskModal.nativeElement;
    modalElement.addEventListener('hide.bs.modal', () => {
      this.clearModal();
    });
  }
  get selectedCategoryId(): number {
    return this.task.category?.id || 0;
  }

  ngOnInit(): void {
    this.loadCategories();
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



  // saveTask() {
  //   if (this.task.id) {
  //     // Sửa task
  //     this.taskService.updateTask(this.task).subscribe(
  //       () => {
  //         this.saveTaskEvent.emit(); // Phát sự kiện lưu thành công
  //         this.closeModal(); // Đóng modal sau khi lưu
  //       },
  //       (error) => {
  //         this.errorMessage = error.error.message; // Xử lý lỗi từ API
  //       }
  //     );
  //   } else {
  //     // Thêm task mới
  //     this.taskService.createTask(this.task).subscribe(
  //       () => {
  //         this.saveTaskEvent.emit(); // Phát sự kiện lưu thành công
  //         this.closeModal(); // Đóng modal sau khi lưu
  //       },
  //       (error) => {
  //         this.errorMessage = error.error.message; // Xử lý lỗi từ API
  //       }
  //     );
  //   }
  // }

  closeModal(): void {
    const modalElement = this.taskModal.nativeElement;
    // @ts-ignore
    const modalInstance = bootstrap.Modal.getInstance(modalElement);

    if (modalInstance) {
      modalInstance.hide(); // Đóng modal nếu có instance tồn tại
    } else {
      // @ts-ignore
      const newModalInstance = new bootstrap.Modal(modalElement);
      newModalInstance.hide(); // Đóng modal
    }
  }

  clearModal(): void {
    // @ts-ignore
    this.task = {id: undefined, title: '', description: '', important: 0, dueDate: new Date(), done: false, category: {id: undefined, name: ''}};
    this.errorMessage = ""; // Xóa thông báo lỗi
  }
}
