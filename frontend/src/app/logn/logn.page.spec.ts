import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LognPage } from './logn.page';

describe('LognPage', () => {
  let component: LognPage;
  let fixture: ComponentFixture<LognPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LognPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
