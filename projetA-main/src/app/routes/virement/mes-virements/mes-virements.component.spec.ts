import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesVirementsComponent } from './mes-virements.component';

describe('MesVirementsComponent', () => {
  let component: MesVirementsComponent;
  let fixture: ComponentFixture<MesVirementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesVirementsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MesVirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
