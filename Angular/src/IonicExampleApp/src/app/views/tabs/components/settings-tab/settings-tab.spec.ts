import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsTab } from './settings-tab';

describe('SettingsTab', () => {
  let component: SettingsTab;
  let fixture: ComponentFixture<SettingsTab>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(SettingsTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
