import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataAccessAngularComponent } from './data-access-angular.component';

describe('DataAccessAngularComponent', () => {
  let component: DataAccessAngularComponent;
  let fixture: ComponentFixture<DataAccessAngularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataAccessAngularComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataAccessAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
