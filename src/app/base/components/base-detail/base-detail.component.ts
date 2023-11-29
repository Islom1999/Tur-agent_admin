import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: '',
})
export abstract class BaseDetailComponent<T extends { id: string }> {




}
