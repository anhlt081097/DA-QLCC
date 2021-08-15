import {
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { throwError } from 'rxjs';
import { MemberService } from '../../../shared/service/member-service.service';
import { AddMemberComponent } from './add-member/add-member.component';
import { EditMemberComponent } from './edit-member/edit-member.component';
import { MatDialog } from '@angular/material/dialog';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MemberResponse } from '../../../shared/model/member/member-response';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {DialogSubmitUnlockComponent} from '../../../shared/component/dialog-submit-unlock/dialog-submit-unlock.component';
import {DialogSubmitLockComponent} from '../../../shared/component/dialog-submit-lock/dialog-submit-lock.component';
import {ToastService} from '../../../shared/service/toast.service';

@Component({
  selector: 'ngx-list-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'),
      ),
    ]),
  ],
})
export class MemberComponent implements OnInit, AfterViewInit {
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();
  member = new MatTableDataSource();
  memberLock = new MatTableDataSource();
  columnsToDisplay = ['image', 'userName', 'fullName', 'email', 'phone', 'id'];
  expandedElement: MemberResponse | null;

  constructor(
    private dialog: MatDialog,
    private memberService: MemberService,
    private toastrService: ToastService,
  ) {}

  ngOnInit(): void {
    this.getAllMember();
    this.getAllMemberLock();
  }

  private getAllMember() {
    this.memberService.getAllMember().subscribe(
      (data) => {
        this.member.data = data;
      },
      (error) => {
        throwError(error);
      },
    );
  }

  private getAllMemberLock() {
    this.memberService.getAllMemberLock().subscribe(
      (data) => {
        this.memberLock.data = data;
      },
      (error) => {
        throwError(error);
      },
    );
  }

  ngAfterViewInit(): void {
    this.member.paginator = this.paginator.toArray()[0];
    this.member.sort = this.sort.toArray()[0];
    this.memberLock.paginator = this.paginator.toArray()[1];
    this.memberLock.sort = this.sort.toArray()[1];
  }

  openAdd() {
    const dialogRef = this.dialog.open(AddMemberComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getAllMember();
      }
    });
  }

  openEdit(id: number) {
    const dialogRef = this.dialog.open(EditMemberComponent, {
      data: id,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getAllMember();
      }
    });
  }

  onDelete(id) {
    const dialogRef = this.dialog.open(DialogSubmitLockComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.memberService.deleteMember(id).subscribe(
          (data) => {
            this.getAllMember();
            this.getAllMemberLock();
            this.toastrService.showToast('success', 'Success', 'Lock successfully');
          },
          (error) => {
            throwError(error);
            this.toastrService.showToast('danger', 'Unsuccessful', 'Lock unsuccessfully');
          },
        );
      }
    });
  }

  onUnlock(id) {
    const dialogRef = this.dialog.open(DialogSubmitUnlockComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.memberService.uplockMember(id).subscribe(
          (data) => {
            this.getAllMember();
            this.getAllMemberLock();
            this.toastrService.showToast('success', 'Success', 'Unlock successfully');
          },
          (error) => {
            throwError(error);
            this.toastrService.showToast('danger', 'Unsuccessful', 'Unlock unsuccessfully');
          },
        );
      }
    });
  }

  applyFilterMember(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.member.filter = filterValue.trim().toLowerCase();

    if (this.member.paginator) {
      this.member.paginator.firstPage();
    }
  }

  applyFilterMemberLock(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.memberLock.filter = filterValue.trim().toLowerCase();

    if (this.memberLock.paginator) {
      this.memberLock.paginator.firstPage();
    }
  }
}
