import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseCatComponent } from './expense-cat.component';

describe('ExpenseCatComponent', () => {
  let component: ExpenseCatComponent;
  let fixture: ComponentFixture<ExpenseCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseCatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpenseCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
