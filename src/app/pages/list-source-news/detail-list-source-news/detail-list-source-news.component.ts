import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableModel, FormModel } from '@model';
import { GlobalFacade, News, NewsFacade } from '@store';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-detail-list-source-news',
  templateUrl: './detail-list-source-news.component.html',
  styleUrls: ['./detail-list-source-news.component.less'],
  providers: [NewsFacade],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailListSourceNewsComponent {
  isVisible?: boolean;
  rejectForm!: UntypedFormGroup;
  constructor(
    public newsFacade: NewsFacade,
    protected route: ActivatedRoute,
    protected router: Router,
    public globalFacade: GlobalFacade,
    private fb: UntypedFormBuilder,
  ) {}
  private destroyed$ = new Subject<void>();
  roleCode?: string;
  statusCode?: string;
  id = '';
  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.globalFacade.user$.pipe(takeUntil(this.destroyed$)).subscribe((user) => {
      if (user?.userModel?.roleListCode) {
        this.roleCode = user?.userModel?.roleListCode[0];
      }
    });
    this.newsFacade.getById(this.id);
    this.rejectForm = this.fb.group({
      reason: [null, [Validators.required]],
      statusCode: 'ADMIN_REJECT',
    });
  }
  handleApprove() {
    this.newsFacade.approve(this.id, (this.statusCode = 'APPROVE'));
    this.router.navigate(['/list_source_news']);
  }
  reject() {
    this.isVisible = true;
  }
  handleReject() {
    const { controls } = this.rejectForm;
    this.checkValid(controls);

    if (this.rejectForm?.status === 'VALID') {
      this.newsFacade.approve(this.id, (this.statusCode = 'ADMIN_REJECT'));
      this.router.navigate(['/list_source_news']);
    }
  }
  checkValid(controls: any): void {
    for (const i in controls) {
      if (controls.hasOwnProperty(i)) {
        controls[i].markAsDirty();
        controls[i].updateValueAndValidity();
        if (controls[i]?.controls) {
          this.checkValid(controls[i]?.controls);
        }
      }
    }
  }
  columnsCancel: FormModel[] = [
    {
      name: 'reason',
      title: 'Nhập lý do từ chối',
      formItem: {
        type: 'textarea',
        rules: [{ type: 'required' }],
      },
    },
  ];
}
