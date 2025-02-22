import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCompaniaComponent } from './detalle-compania.component';

describe('DetalleCompaniaComponent', () => {
  let component: DetalleCompaniaComponent;
  let fixture: ComponentFixture<DetalleCompaniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleCompaniaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleCompaniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
