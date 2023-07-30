/*
 * @Author: chessman cjb15770595346@163.com
 * @Date: 2023-07-30 15:59:18
 * @LastEditors: chessman cjb15770595346@163.com
 * @LastEditTime: 2023-07-30 16:14:40
 * @FilePath: /framework-console-core/src/app.service.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
