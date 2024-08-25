import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteDialogComponent } from './compte-dialog.component';

describe('CompteDialogComponent', () => {
  let component: CompteDialogComponent;
  let fixture: ComponentFixture<CompteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompteDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
