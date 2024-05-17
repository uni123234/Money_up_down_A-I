import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeCatComponent } from './income-cat.component';

describe('IncomeCatComponent', () => {
  let component: IncomeCatComponent;
  let fixture: ComponentFixture<IncomeCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomeCatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IncomeCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
