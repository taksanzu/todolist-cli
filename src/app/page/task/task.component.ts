import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../service/task/task.service';
import { Category } from '../../models/category';
import { CategoryService } from '../../service/category/category.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  categories: Category[] = [];
  selectedTask: Partial<Task> = {};
  selectedCategoryId: number | null = null;

  constructor(private taskService: TaskService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
   this.taskService.getTasks().subscribe(
      (data) => {
        this.tasks = data;
      },
      (error) => {
        console.error('Error loading tasks:', error);
      }
    );
   this.categoryService.getCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error loading categories:', error);
      }
    );
  }

  editTask(id: number): void {
    const taskToEdit = this.tasks.find(task => task.id === id);
    if (taskToEdit) {
      this.selectedTask = { ...taskToEdit }; // Sao chép task và category hiện tại
      const modalElement = document.getElementById('taskModal');
      // @ts-ignore
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  onSaveTask() {

  }

  onCategoryChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement; // Ép kiểu thành HTMLSelectElement
    const categoryId: number | null = selectElement.value ? Number(selectElement.value) : null; // Chuyển đổi giá trị

    console.log('Selected Category ID:', categoryId); // Kiểm tra giá trị

    if (categoryId !== null) {
      this.taskService.getTasksByCategoryId(categoryId).subscribe(
        (data) => {
          this.tasks = data;
        },
        (error) => {
          console.error('Lỗi khi lấy tasks theo category:', error);
        }
      );
    } else {
      this.taskService.getTasks().subscribe(
        (data) => {
          this.tasks = data;
        },
        (error) => {
          console.error('Lỗi khi lấy tất cả tasks:', error);
        }
      );
    }
  }
}
