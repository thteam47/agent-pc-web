import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyRecommendComponent } from './survey-recommend.component';

describe('SurveyRecommendComponent', () => {
  let component: SurveyRecommendComponent;
  let fixture: ComponentFixture<SurveyRecommendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyRecommendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyRecommendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
