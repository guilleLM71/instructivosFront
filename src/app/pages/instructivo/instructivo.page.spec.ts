import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstructivoPage } from './instructivo.page';

describe('InstructivoPage', () => {
  let component: InstructivoPage;
  let fixture: ComponentFixture<InstructivoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InstructivoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
