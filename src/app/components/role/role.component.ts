import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { RoleService } from 'src/app/services/role.service';
import { RouteService } from 'src/app/services/route.service';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef  } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit, OnDestroy {
isShowDialog: boolean;
isEdit: boolean = false;
roleForm: FormGroup;
roles: Array<any>;
role = {
    id: null,
    name: null,
    attempt: []
};
routes: Array<any>;
selectedRoles: Array<any>;
filterFields = ['name'];
loading = true;
submitted = false;
@ViewChild('dt') table: Table;
@ViewChild('filter') filter: ElementRef;
ref: DynamicDialogRef

  constructor(
    private roleService: RoleService,
    private routeService: RouteService,
    private dialogService: DialogService,
    private confirmService: ConfirmationService,
    private alertService: AlertService,
    private fb: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.roleForm = this.fb.group({
        name: ['', Validators.required],
        attempt: ['']
    })
    this.getRoles();
    this.getRoutes();
  }

  getRoles(): void {
    this.roleService.list().subscribe(res => {
        this.roles = res.data;
        this.loading = false;
    });
  }

  getRoutes(): void {
    this.routeService.list().subscribe(res => {
        this.routes = res.data;
    });
  }

  clear(table: Table): void {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  addNew(): void {
    this.role = { id: null, name: null, attempt: [] };
    this.submitted = false;
    this.isShowDialog = true;
  }

  edit(role: any): void {
    this.role = {
        id: role.id,
        name: role.name,
        attempt: JSON.parse(role.attempt)
    }
    this.role.name = role.name;
    this.isShowDialog = true;
    this.isEdit = true;
  }

  delete(role: any): void {
    this.confirmService.confirm({
        message: 'Do you want delete this role',
        accept: () => {
            this.roleService.delete([role.id]).subscribe(res => {
                this.alertService.success(res);
                this.getRoles();
            },
            err => {
                this.alertService.error(err);
            },
            () => {
                this.role = { id: null, name: null, attempt: [] };
                this.selectedRoles = [];
            });
        }
    })
  }

  deleteSelected(): void {
    console.log(this.selectedRoles);
    this.confirmService.confirm({
        message: 'Do you want delete this roles',
        accept: () => {
            const ids = this.selectedRoles.map(el => el.id);
            this.roleService.delete(ids).subscribe(res => {
                this.alertService.success(res);
                this.getRoles();
            },
            err => {
                this.alertService.error(err);
            },
            () => {
                this.role = { id: null, name: null, attempt: [] };
                this.selectedRoles = [];
            });
        }
    })
  }

  getColor(method: string): string {
    method = method.toLocaleLowerCase();
    switch(method) {
        case 'get': return 'primary';
        case 'post': return 'success';
        case 'put': return 'warn';
        case 'delete': return 'danger';
        default: return '';
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.role.name) {
        this.isShowDialog = false;
        this.isEdit = false;
        this.submitted = false;
        const data = {
            name: this.role.name,
            attempt: JSON.stringify(this.role.attempt),
        }
        if (!this.isEdit) {
            this.roleService.create(data).subscribe(res => {
                this.alertService.success(res);
                this.getRoles();
            },
            err => {
                this.alertService.error(err);
            },
            () => {
                this.role = { id: null, name: null, attempt: [] };
            });
        } else {
            this.roleService.update(this.role.id, data).subscribe(res => {
                this.alertService.success(res);
                this.getRoles();
            },
            err => {
                this.alertService.error(err);
            },
            () => {
                this.role = { id: null, name: null, attempt: [] };
            });
        }
    }
  }

  hideDialog(): void {
    this.isShowDialog = false;
    this.submitted = false;
    this.isEdit = false;
  }

  ngOnDestroy(): void {
    if (this.ref) {
        this.ref.close();
    }
  }
}
