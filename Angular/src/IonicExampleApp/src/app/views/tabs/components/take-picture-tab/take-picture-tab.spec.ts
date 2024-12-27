import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakePictureTab } from './take-picture-tab';

describe('TakePictureTab', () => {
  let component: TakePictureTab;
  let fixture: ComponentFixture<TakePictureTab>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TakePictureTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
