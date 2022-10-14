import fs from "fs/promises";
import { EOL } from "os";
import { ALLOW_APPENDING_FLAG } from "../../logic/config/consts";
import { RATE_LOG_FILE } from "../../logic/config/config";
import ChainElement from "./chain.element";

export default class ChainDecorator extends ChainElement {
  protected component: any;

  constructor(component: any) {
    super();
    this.component = component;
  }

  async handle() {
    const res = await this.component.handle();
    this.log(res);
    return res;
  }

  private log(data: string) {
    const str = JSON.stringify(data);
    fs.writeFile(`./src/data/logs/${RATE_LOG_FILE}`, str + EOL, {
      flag: ALLOW_APPENDING_FLAG,
    });
  }
}
