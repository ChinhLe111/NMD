import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableComponent } from '@core/data-table/data-table.component';
import { DataTableModel, Pagination } from '@model';
import { FormatCurrencyPipe, FormatDatePipe } from '@pipes';
import { Auth, GlobalFacade, News, NewsFacade } from '@store';
import moment from 'moment';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-list-source-news',
  templateUrl: './list-source-news.component.html',
  styleUrls: ['./list-source-news.component.less'],
  providers: [FormatDatePipe, FormatCurrencyPipe, NewsFacade],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListSourceNewsComponent {
  @ViewChild('table') tableList!: DataTableComponent;
  @ViewChild('ownerFullName') ownerFullName!: TemplateRef<HTMLTemplateElement>;
  @ViewChild('statusTable') statusTable!: TemplateRef<HTMLTemplateElement>;
  listAdminStatus = [
    { label: 'Đã duyệt', statusCode: 'PUBLISHED' },
    { label: 'Chờ duyệt', statusCode: 'WAIT_CONFIRM' },
    { label: 'Xác minh', statusCode: 'VERIFIED' },
    { label: 'Nhận tin', statusCode: 'RECEIVED' },
    { label: 'Từ chối', statusCode: 'ADMIN_REJECTED' },
    { label: 'Kết thúc', statusCode: 'END' },
  ];
  listSelerStatus = [
    { label: 'Đã duyệt', statusCode: 'PUBLISHED' },
    { label: 'Xác minh', statusCode: 'VERIFIED' },
    { label: 'Nhận tin', statusCode: 'RECEIVED' },
    { label: 'Kết thúc', statusCode: 'END' },
  ];
  listNewsStatus = [
    { label: 'Đã duyệt', statusCode: 'PUBLISHED' },
    { label: 'Chờ duyệt', statusCode: 'WAIT_CONFIRM' },
    { label: 'Nháp', statusCode: 'DRAFT' },
    { label: 'Xác minh', statusCode: 'VERIFIED' },
    { label: 'Nhận tin', statusCode: 'RECEIVED' },
    { label: 'Từ chối', statusCode: 'ADMIN_REJECTED' },
    { label: 'Kết thúc', statusCode: 'END' },
  ];
  constructor(
    public newsFacade: NewsFacade,
    private formatDate: FormatDatePipe,
    protected route: ActivatedRoute,
    protected router: Router,
    public globalFacade: GlobalFacade,
  ) {}
  private destroyed$ = new Subject<void>();
  roleCode?: string;
  data!: Pagination<News>;
  columnsTable: DataTableModel<News>[] = [];
  id?: string;
  ngOnInit(): void {
    const { id } = this.route.snapshot.params;

    this.globalFacade.user$.pipe(takeUntil(this.destroyed$)).subscribe((user) => {
      if (user?.userModel?.roleListCode) {
        this.roleCode = user?.userModel?.roleListCode[0];
      }
    });

    this.newsFacade.status$.pipe(takeUntil(this.destroyed$)).subscribe((status) => {
      switch (status) {
        case 'deleteOk':
          this.newsFacade.getPagination({});
      }
    });
    this.table();
    this.newsFacade.getPagination({});
  }

  private table() {
    setTimeout(() => {
      this.columnsTable = [
        {
          name: 'title',
          title: 'Tiêu đề',
          tableItem: {
            renderTemplate: this.ownerFullName,
          },
        },
        {
          name: 'createdOnDate',
          title: 'Ngày tạo',
          tableItem: {
            align: 'center',
            render: (data) => this.formatDate.transform(data.createdOnDate, 'HH:mm:ss - DD/MM/YYYY'),
          },
        },
        {
          name: 'statusCode',
          title: 'Trạng thái',
          tableItem: {
            width: '150px',
            renderTemplate: this.statusTable,
            align: 'center',
          },
        },
        {
          name: '',
          title: 'Thao tác',
          tableItem: {
            width: '85px',
            align: 'center',
            actions: [
              {
                icon: () => 'la-edit',
                text: () => 'routes.admin.Layout.edit',
                color: () => '#40A9FF',
                onClick: (item) => this.router.navigate(['/list_source_news', item.id, 'edit']),
                condition: () => this.roleCode != 'ADMIN' && this.roleCode != 'SOU',
              },
              {
                icon: () => 'la-trash',
                textConfirm: () => 'components.data-table.wanttodeletethisrecord',
                text: () => 'routes.admin.Layout.delete',
                color: () => '#CD5C5C',
                confirm: true,
                onClick: (item: any) => this.newsFacade.delete(item.id),
              },
            ],
          },
        },
      ];
    });
  }
  filteDateRange(data: any) {
    const dataS = moment(data[0]).format('YYYY-MM-DD, 00:00:00');
    const dataE = moment(data[1]).format('YYYY-MM-DD, 23:59:59');
    const rs = [dataS, dataE];
    if (data.length == 0) {
      if (data) this.tableList.filter('DateRange', null, []);
    } else if (data) this.tableList.filter('DateRange', null, rs);
  }
}
