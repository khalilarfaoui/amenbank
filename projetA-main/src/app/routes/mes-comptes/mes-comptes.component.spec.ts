import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesComptesComponent } from './mes-comptes.component';

describe('MesComptesComponent', () => {
  let component: MesComptesComponent;
  let fixture: ComponentFixture<MesComptesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesComptesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MesComptesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
