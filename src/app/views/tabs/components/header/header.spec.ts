import { Header } from './header';
import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle } from '@ionic/angular/standalone';
import appSignalStore from 'src/app/store/appSignalStore';

describe('Header Component', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;
  let mockStore: { titleColor: jasmine.Spy };

  beforeEach(async () => {
    // Create a mock for store titleColor
    mockStore = {
      titleColor: jasmine.createSpy('titleColor').and.returnValue('blue'),
    };

    // Set up TestBed to include necessary dependencies
    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle],
      providers: [
        { provide: appSignalStore, useValue: mockStore } // Provide the mocked store
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should compute titleColor based on the store', () => {
    const color = component.titleColor();
    expect(color).toBe('blue');
    expect(mockStore.titleColor).toHaveBeenCalled();
  });

  it('should allow setting the title via signal', () => {
    const mockTitle = signal('Mock Title');
    (component as any).title = mockTitle;  // Inject the WritableSignal for title

    mockTitle.set('New Title'); // You can use set() on WritableSignal

    // Assert the title is updated
    expect(component.title()).toBe('New Title');
  });
});
