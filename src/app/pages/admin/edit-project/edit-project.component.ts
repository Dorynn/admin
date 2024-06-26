import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ApiService } from '../../../services/api.service';
import { DataService } from '../../../services/data.service';

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.css'
})
export class EditProjectComponent implements OnInit {
  name!: string;
  type!: string;
  status!: string;
  thumbnail: NzUploadFile[] = [];
  description!: string;
  district!: string;
  address!: string;
  investor!: string;
  bankHost!: string;
  bankNumber!: string;
  bankName!: string;
  qrImage: NzUploadFile[] = [];
  investorPhoneNumber!: string;
  startDate!: Date;
  endDate!: Date;
  stompClient: any;
  provinceId: any;
  provinceList: any = [];
  districtList: any = [];
  projectId: string | null = this.route.snapshot.paramMap.get('id');
  projectDetail: any = [];
  previewVisible: boolean = false;
  previewImage: string | undefined = '';
  previewImage2: string | undefined = '';
  previewVisible2: boolean = false;
  isChangeThumbnail: boolean = false;
  isChangeQrImg: boolean = false;
  loading: boolean = true;
  isExistThumbnail: boolean = false;
  isExistQrImg: boolean = false;
  typeList: any = [];
  filterTypeOptions: string[] = [];
  defaultDeposit: string = '';
  expiryDate: string = '';

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private msg: NzMessageService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.getProjectById();
    this.getProvinceList();
    this.getTypeList();
  }

  getTypeList() {
    this.apiService.getType().subscribe({
      next: (res: any) => {
        res.data.map((e: any) => {
          this.typeList.push(e.name)
          this.filterTypeOptions = this.typeList
        })
      }
    })
  }

  getProjectById() {
    return this.apiService.getProjectById(this.projectId).subscribe({
      next: (res: any) => {
        this.projectDetail = res.data;
        this.name = res.data.name;
        this.type = res.data.projectType.name;
        this.address = res.data.address;
        this.bankHost = res.data.hostBank;
        this.bankName = res.data.bankName;
        this.bankNumber = res.data.bankNumber;
        this.investor = res.data.investor;
        this.investorPhoneNumber = res.data.investorPhone;
        this.district = res.data.district.id;
        this.description = res.data.description;
        this.provinceId = res.data.district.provinceId
        this.status = res.data.status;
        this.endDate = new Date(res.data.endDate);
        this.startDate = new Date(res.data.startDate);
        this.expiryDate = res.data.expiryDate;
        this.defaultDeposit = res.data.defaultDeposit;
        if (res.data.thumbnail) {
          this.isExistThumbnail = true;
          this.thumbnail.push({
            url: res.data.thumbnail,
            uid: '-1',
            name: 'image1.png',
            status: 'done'
          })
        }
        if (res.data.qrImg) {
          this.isExistQrImg = true;
          this.qrImage.push({
            url: res.data.qrImg,
            uid: '-2',
            name: 'image2.png',
            status: 'done'
          })
        }
        this.getDistrictByProvince();
      }
    })
  }

  editProject() {
    this.dataService.changeStatusLoadingAdmin(true);
    const formData = new FormData();
    let id: string = String(this.projectId);
    formData.append("id", id)
    formData.append("name", this.name)
    formData.append("description", this.description)
    formData.append("status", this.status)
    formData.append("address", this.address)
    formData.append("startDate", this.startDate.toISOString().substring(0, 10))
    formData.append("endDate", this.endDate.toISOString().substring(0, 10))
    formData.append("bankNumber", this.bankNumber)
    formData.append("bankName", this.bankName)
    formData.append("hostBank", this.bankHost)
    formData.append("investor", this.investor)
    formData.append("investorPhone", this.investorPhoneNumber)
    formData.append("projectType", this.type)
    formData.append("districtId", this.district)
    formData.append("defaultDeposit", this.defaultDeposit);
    formData.append("expiryDate", this.expiryDate)

    if (this.isChangeThumbnail) {
      formData.append("thumbnail", this.thumbnail[0].originFileObj!)
    }
    if (this.isChangeQrImg) {
      formData.append("qrImg", this.qrImage[0].originFileObj!)
    }

    this.apiService.updateProject(formData).subscribe({
      next: (res: any) => {
        this.msg.success("Cập nhật dự án thành công!");
        this.dataService.changeStatusLoadingAdmin(false);
      },
      error: (err: any) => {
        this.msg.error("Cập nhật giao dịch thất bại")
        this.dataService.changeStatusLoadingAdmin(false);
      }
    })
  }

  // onFileSelected(event: any) {
  //   this.thumbnail = event.target.files?.[0]
  //   this.isChangeThumbnail = true;
  // }

  // onFile2Selected(event: any) {
  //   this.qrImage = event.target.files?.[0]
  //   this.isChangeQrImg = true;

  // }

  getProvinceList(): void {
    this.apiService.getAllProvince().subscribe({
      next: (res: any) => {
        this.provinceList = res.data;
      }
    })
  }

  getDistrictByProvince(): void {
    this.apiService.getDistrictByProvinceId(this.provinceId).subscribe({
      next: (res: any) => {
        this.districtList = res.data
      }
    })
  }

  onChangeProvince() {
    this.getDistrictByProvince();
  }

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file['preview']) {
      file['preview'] = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;
  }

  handleChange(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        this.handlePreview(info.file);
        this.loading = false;
        break;
      case 'error':
        if (this.thumbnail[0].status == 'error') {
          this.isChangeThumbnail = true;
        }
        if (this.qrImage[0].status == 'error') {
          this.isChangeQrImg = true;
        }
        this.loading = false;
        break;
      case 'removed':
        if (this.thumbnail[0].status == 'removed') {
          this.thumbnail = [];
        }
        if (this.qrImage[0].status == 'removed') {
          this.qrImage = []
        }
        break;
    }
  }

  onChangeType(value: string): void {
    console.log('logo')
    this.filterTypeOptions = this.typeList.filter((option: string) => option.toLowerCase().indexOf(value.toLowerCase()) !== -1)
  }
}

