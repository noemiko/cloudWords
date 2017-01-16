/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BiggerImageComponent } from './bigger-image.component';

describe('BiggerImageComponent', () => {
  let component: BiggerImageComponent;
  let fixture: ComponentFixture<BiggerImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiggerImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiggerImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
