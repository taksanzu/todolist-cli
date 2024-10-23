import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Category } from '../../../../models/category';
import { CategoryService } from '../../../../service/admin/category.service';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrl: './category-modal.component.css'
})
export class CategoryModalComponent {
  @Input() category: Partial<Category> = {}; // Khai báo thuộc tính đầu vào
  @Output() saveCategoryEvent = new EventEmitter<Partial<Category>>();
  @ViewChild('categoryModal') categoryModal!: ElementRef;
  errorMessage: string = ""; // Thông báo lỗi

  constructor(private categoryService: CategoryService) {}

  ngAfterViewInit(): void {
    const modalElement = this.categoryModal.nativeElement;
    modalElement.addEventListener('hide.bs.modal', () => {
      this.clearModal();
    });
  }


  saveCategory() {
    if (this.category.id) {
      // Sửa category
      this.categoryService.updateCategory(this.category).subscribe(
        () => {
          this.saveCategoryEvent.emit();
          this.closeModal(); // Đóng modal
        },
        (error) => {
          this.errorMessage = error.error.message // Lấy thông báo lỗi từ API
        }
      );
    } else {
      // Thêm category mới
      this.categoryService.createCategory(this.category).subscribe(
        () => {
          this.saveCategoryEvent.emit();
          this.closeModal();
        },
        (error) => {
          this.errorMessage = error.error.message // Lấy thông báo lỗi từ service
        }
      );
    }
  }


  closeModal(): void {
    const modalElement = this.categoryModal.nativeElement;
    // @ts-ignore
    const modalInstance = bootstrap.Modal.getInstance(modalElement);

    if (modalInstance) {
      modalInstance.hide(); // Đóng modal đúng cách
    } else {
      // @ts-ignore
      const newModalInstance = new bootstrap.Modal(modalElement);
      newModalInstance.hide();
    }
  }


  clearModal(): void {
    this.category = {id: undefined, name: ''};
    this.errorMessage = "";
  }
}
