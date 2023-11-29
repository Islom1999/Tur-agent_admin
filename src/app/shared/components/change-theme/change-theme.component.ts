import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'change-theme',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './change-theme.component.html',
  styleUrls: ['./change-theme.component.scss']
})
export class ChangeThemeComponent {
  isChange = true;

  changeTheme() {
    this.isChange = !this.isChange;
  }
}
