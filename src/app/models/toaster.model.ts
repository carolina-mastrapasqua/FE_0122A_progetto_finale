export class Toaster {
  index: number;
  type: string;
  icon: string;
  title: string;
  message: string;
  expire: number;

  constructor(type: string, title: string, message: string, icon= '', expire= 10000) {
    this.index = 0;
    this.type = type;
    this.icon = icon;
    this.title = title;
    this.message = message;
    this.expire = expire;
  }

}
