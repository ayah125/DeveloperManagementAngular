import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkspaceListComponent } from './workspacecomponent';

describe('WorkspaceListComponent', () => {
  let component: WorkspaceListComponent;
  let fixture: ComponentFixture<WorkspaceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkspaceListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkspaceListComponent);
    component = fixture.componentInstance; // ← هنا الغلط كان: كنتِ كاتبة fixture.WorkspaceListComponent
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
