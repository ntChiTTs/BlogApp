import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFavBlogsComponent } from './my-fav-blogs.component';

describe('MyFavBlogsComponent', () => {
  let component: MyFavBlogsComponent;
  let fixture: ComponentFixture<MyFavBlogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFavBlogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFavBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
