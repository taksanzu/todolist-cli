import {Component, OnInit } from '@angular/core';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../service/admin/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  selectedCategory: Partial<Category> = {};

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error loading categories:', error);  // Hiển thị lỗi chi tiết
      }
    );
  }


  editCategory(id: number): void {
    // @ts-ignore
    const categoryToEdit = this.categoryService.getCategoryById(id).subscribe(
      (data) => {
        this.selectedCategory = { ...data };
        const modalElement = document.getElementById('categoryModal');
        // @ts-ignore
        const modalInstance = new bootstrap.Modal(modalElement);
        modalInstance.show();
      },
      (error) => {
        console.error('Error loading category:', error);
      }
    );
  }

  deleteCategory(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa category này?')) {
      this.categoryService.deleteCategory(id).subscribe(
        () => {
          this.categories = this.categories?.filter(category => category.id !== id);
        },
        (error) => {
          console.error('Error deleting category:', error);
        }
      );
    }
  }

  onSaveCategory(): void {
    this.loadCategories();
  }
}
