import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComptListComponent } from './compt-list.component';

describe('ComptListComponent', () => {
  let component: ComptListComponent;
  let fixture: ComponentFixture<ComptListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComptListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComptListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
