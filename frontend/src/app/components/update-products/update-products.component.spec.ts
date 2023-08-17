import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProductsComponent } from './update-products.component';

describe('UpdateProductsComponent', () => {
  let component: UpdateProductsComponent;
  let fixture: ComponentFixture<UpdateProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateProductsComponent]
    });
    fixture = TestBed.createComponent(UpdateProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
