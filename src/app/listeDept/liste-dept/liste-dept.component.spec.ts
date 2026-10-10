import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDeptComponent } from './liste-dept.component';

describe('ListeDeptComponent', () => {
  let component: ListeDeptComponent;
  let fixture: ComponentFixture<ListeDeptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeDeptComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeDeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
