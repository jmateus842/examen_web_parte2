import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NasaService } from './nasa';

describe('NasaService', () => {
  let service: NasaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(NasaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('debe manejar error y regresar lista vacia', () => {
    service.getItems().subscribe(list => {
      expect(list.length).toBe(0);
    });

    const req = httpMock.expectOne(() => true);
    req.error(new ProgressEvent('Error'), { status: 500 });
  });
});
