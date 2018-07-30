import { TestBed, inject } from '@angular/core/testing';

import { DisplayassetsService } from './displayassets.service';


describe('DisplayassetsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DisplayassetsService]
    });
  });

  it('should be created', inject([DisplayassetsService], (service: DisplayassetsService) => {
    expect(service).toBeTruthy();
  }));
});
