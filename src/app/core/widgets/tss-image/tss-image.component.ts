import { Component, OnInit, Input } from '@angular/core';
import { TssImageService } from './tss-image.service';

@Component({
  selector: 'app-tss-image',
  templateUrl: './tss-image.component.html',
  styleUrls: ['./tss-image.component.scss']
})
export class TssImageComponent implements OnInit {

  @Input() options: any = {};
  display: boolean = false;

  //imageList = [{ "uid": "11FFD5814054DD13E06634029136E461", "img": { "src": "http://192.168.0.33:8123/ZeroCodeServices/public/images/11FFD5814054DD13E06634029136E461.png", "details": { "name": "one.png", "size": 9253, "type": "image/png" } } }, { "uid": "64D9D9BE4A621E9C13A2C73404646655", "img": { "src": "http://192.168.0.33:8123/ZeroCodeServices/public/images/64D9D9BE4A621E9C13A2C73404646655.png", "details": { "name": "two.png", "size": 9253, "type": "image/png" } } }, { "uid": "E837547753C62FD287A5EFC47C7482C7", "img": { "src": "http://192.168.0.33:8123/ZeroCodeServices/public/images/E837547753C62FD287A5EFC47C7482C7.png", "details": { "name": "three.png", "size": 9253, "type": "image/png" } } }, { "uid": "F9EF06F6C162233EDF2DF8354E5EB8A3", "img": { "src": "http://192.168.0.33:8123/ZeroCodeServices/public/images/F9EF06F6C162233EDF2DF8354E5EB8A3.png", "details": { "name": "four.png", "size": 9253, "type": "image/png" } } }, { "uid": "52E2C8F5C204B5BD03DF3A73EB096484", "img": { "src": "http://192.168.0.33:8123/ZeroCodeServices/public/images/52E2C8F5C204B5BD03DF3A73EB096484.png", "details": { "name": "five.png", "size": 9253, "type": "image/png" } } }];
  imageList = [];
  constructor(private imageService: TssImageService) { }

  ngOnInit() {

  }
  openModal() {
    this.display = true;
    this.imageService.getImages().subscribe(res => {
        this.imageList = res;
    });

  }
  chooseImage(img) {
    if (img && img.img && img.img.src) {
      this.options.url = img.img.src;
      this.display = false;
    }
  }
}
