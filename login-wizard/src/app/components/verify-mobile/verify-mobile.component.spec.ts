import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyMobileComponent } from './verify-mobile.component';

describe('VerifyMobileComponent', () => {
  let component: VerifyMobileComponent;
  let fixture: ComponentFixture<VerifyMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyMobileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerifyMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
