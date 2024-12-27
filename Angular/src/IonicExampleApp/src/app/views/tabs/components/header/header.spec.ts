import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPicturesTab } from './header';

describe('SearchPicturesTab', () => {
  let component: SearchPicturesTab;
  let fixture: ComponentFixture<SearchPicturesTab>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(SearchPicturesTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
