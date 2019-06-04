import { cities } from '../../utils/city';

Page({
  data: {
    cities: [],
    current: 'tab1',
    current_scroll: 'tab1',
    isLoading: false,
    storeArr: [],
  },
  onChange(event) {
    console.log(event.detail, 'click right menu callback data')
  },
  onReady() {
    let storeCity = new Array(26);
    let storeCityOther = new Array(26);
    const words = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]; 
    words.forEach((item, index) => {
      storeCity[index] = {
        key: item,
        list: []
      }
    });
     words.forEach((item, index) => {
       storeCityOther[index] = {
        key: item,
        list: []
      }
    });
    cities[0].forEach((item) => {
      let firstName = item.pinyin.substring(0, 1);
      let index = words.indexOf(firstName);
      storeCity[index].list.push({
        name: item.name,
        key: firstName,
        id: item.zip,
      });
    }); 
    cities[1].forEach((item) => {
      let firstName = item.pinyin.substring(0, 1);
      let index = words.indexOf(firstName);
      storeCityOther[index].list.push({
        name: item.name,
        key: firstName,
        id: item.zip,
      });
    });
    this.data.cities = storeCity;
    this.setData({
      cities: this.data.cities,
      storeArr: [storeCity, storeCityOther],
    });
  },
  handleChange({ detail }) {
    let that = this;
    let arr = this.data.storeArr[detail.key.substr(detail.key.length - 1, 1) - 1];
    this.setData({
      current: detail.key,
      isLoading: true,
      cities: arr
    });
    setTimeout(function () {
      that.setData({
        isLoading: false,
      });
    }, 2000);
  },
  handleChangeScroll({ detail }) {
    this.setData({
      current_scroll: detail.key
    });
  },
  selectedItem(e) {
    console.log(e)
  }
});