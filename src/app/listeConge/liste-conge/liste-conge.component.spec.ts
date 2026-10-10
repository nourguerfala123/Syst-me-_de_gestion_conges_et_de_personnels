import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCongeComponent } from './liste-conge.component';

describe('ListeCongeComponent', () => {
  let component: ListeCongeComponent;
  let fixture: ComponentFixture<ListeCongeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeCongeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
