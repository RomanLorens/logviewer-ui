import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportConfigSaveComponent } from './support-config-save.component';

describe('SupportConfigSaveComponent', () => {
  let component: SupportConfigSaveComponent;
  let fixture: ComponentFixture<SupportConfigSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportConfigSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportConfigSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
