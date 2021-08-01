import {Injectable} from '@angular/core';
import {NbGlobalPhysicalPosition, NbToastrService} from '@nebular/theme';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  constructor(private toastrService: NbToastrService) {
  }

  showToast(type: string, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 3000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false,
    };
    this.toastrService.show(body, title, config);
  }

}
