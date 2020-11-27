import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { User } from './auth/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  user: User
  activeMenuId: string

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.currentUser().subscribe(u => this.user = u)
    document.onclick = (evt) => {
      if(this.activeMenuId && !evt.srcElement['classList'].contains('nav-list')) {
        document.getElementById(this.activeMenuId).classList.toggle('show')
        this.activeMenuId = null
      }
    }
  }

  isAdmin(): boolean {
    return this.user && this.user.roles.includes('admin')
  }

  toggleMenu(evt, id: string) {
    this.activeMenuId = id
    document.getElementById(id).classList.toggle('show')
    evt.stopPropagation()
  }

}
