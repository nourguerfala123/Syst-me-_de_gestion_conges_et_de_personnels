import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierDeptComponent } from './modifier-dept.component';

describe('ModifierDeptComponent', () => {
  let component: ModifierDeptComponent;
  let fixture: ComponentFixture<ModifierDeptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierDeptComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifierDeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
