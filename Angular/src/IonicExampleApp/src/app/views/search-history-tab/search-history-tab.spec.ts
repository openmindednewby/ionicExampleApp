import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHistoryTab } from './search-history-tab';

describe('SearchHistoryTab', () => {
  let component: SearchHistoryTab;
  let fixture: ComponentFixture<SearchHistoryTab>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(SearchHistoryTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
