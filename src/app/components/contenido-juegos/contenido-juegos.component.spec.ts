import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidoJuegosComponent } from './contenido-juegos.component';

describe('ContenidoJuegosComponent', () => {
  let component: ContenidoJuegosComponent;
  let fixture: ComponentFixture<ContenidoJuegosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenidoJuegosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenidoJuegosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
