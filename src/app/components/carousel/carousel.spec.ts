import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Carousel } from './carousel';
import { By } from '@angular/platform-browser';

describe('Carousel', () => {
  let fixture: ComponentFixture<Carousel>;
  let component: Carousel;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Carousel]
    }).compileComponents();

    fixture = TestBed.createComponent(Carousel);
    component = fixture.componentInstance;
  });

  it('debe mostrar la imagen inicial', () => {
    component.images = ['https://example.com/test.jpg'];
    component.startIndex = 0;
    fixture.detectChanges();

    const imgEl = fixture.debugElement.query(By.css('img'));
    expect(imgEl).toBeTruthy();
    expect((imgEl.nativeElement as HTMLImageElement).src).toContain('test.jpg');
  });

  it('debe avanzar a la siguiente imagen', () => {
    component.images = ['a.jpg', 'b.jpg'];
    component.startIndex = 0;
    fixture.detectChanges();

    component.next();
    expect(component.currentIndex).toBe(1);
  });
});
