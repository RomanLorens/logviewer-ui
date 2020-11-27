import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { UserInfo } from './UserInfo';
import { UUID } from 'angular2-uuid';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  @Input() user: string

  userInfo: UserInfo
  triggered = false
  id: string

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.id = UUID.UUID()
  }

  onMouseOver(evt) {
    if (!this.triggered) {
      this.triggered = true
      this.commonService.getUser(this.user).subscribe(d => this.userInfo = d)
    }
    document.getElementById(this.id).classList.remove('hidden')
  }

  onMouseLeave() {
    document.getElementById(this.id).classList.add('hidden')
  }

  showInfo() {
    if (!this.userInfo) {
      return ''
    }
    return `${this.userInfo.firstName} ${this.userInfo.lastName}`
  }

}
