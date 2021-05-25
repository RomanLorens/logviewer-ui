import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportConfigComponent } from './support-config.component';

describe('SupportConfigComponent', () => {
  let component: SupportConfigComponent;
  let fixture: ComponentFixture<SupportConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
