/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InputDataTextComponent } from './input-data-text.component';

describe('InputDataTextComponent', () => {
  let component: InputDataTextComponent;
  let fixture: ComponentFixture<InputDataTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputDataTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDataTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
