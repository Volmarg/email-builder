import { request } from './axios.config';
import { getCookie } from '../utils/utils';
import { v4 as uuidv4 } from 'uuid';
import ParentPostMessageEventDispatcher from "@demo/services/Event/ParentPostMessageEventDispatcher";
import FileService from "@demo/services/File/FileService";

/**
 * @link https://f3oall.github.io/awesome-notifications/docs/how-to-use.html
 */
import AWN from "awesome-notifications"
import "awesome-notifications/dist/style.css"
import "../styles/awesome-notifications.scss"
import LocalStorageReader from "@demo/services/Storage/LocalStorageReader";

const QI_NIUI_KEY = 'qiniuConfig';

type QiniuConfig = { origin: string; token: string; };

export const common = {
  async uploadByQiniu(file: File | Blob): Promise<string> {
    const qiniuCookie = getCookie(QI_NIUI_KEY); // 有cookie先拿cookie
    let qiniuConfig: QiniuConfig;
    if (qiniuCookie) {
      qiniuConfig = JSON.parse(qiniuCookie);
    } else {
      qiniuConfig = await request.get<QiniuConfig>(
        '/upload/visitor/qiniu-token'
      );
      document.cookie = `${QI_NIUI_KEY}=${JSON.stringify(
        qiniuConfig
      )}; max-age=540;`; // 设置十分钟有效期
    }
    const { token, origin } = qiniuConfig;

    const data = new FormData();
    data.append('file', file);
    data.append('token', token);
    data.append('key', uuidv4() + `-${(file as any)?.name || ''}`);
    const res = await request.post<{ key: string; }>(
      'http://127.0.0.1',
      data
    );
    return origin + '/' + res.key;
  },
  uploadByUrl(url: string) {
    return request.get<string>('/upload/user/upload-by-url', {
      params: {
        url,
      },
    });
  },
  async uploadByCallToFrontProject(file: File) {
    let base64FileContent = await FileService.getBase64Content(file);
    let uploadId          = uuidv4();

    parent.window.postMessage({
      event : ParentPostMessageEventDispatcher.EVENT_OUTGOING_UPLOAD_FILE,
      base64FileContent: base64FileContent,
      fileName: file?.name,
      fileSIze: file?.size,
      fileType: file?.type,
      uploadId: uploadId,
    }, '*');

    return new Promise( (resolve, reject) => {
      let intervalMs = 100;
      let maxLoopMs  = 2000; //5s
      let loopTimeMs = 0;

      let interval = setInterval(() => {

        if (LocalStorageReader.getUploadedFilePath(uploadId)) {
          clearInterval(interval);
          resolve(LocalStorageReader.getUploadedFilePath(uploadId));
        }

        loopTimeMs += intervalMs;
        if (loopTimeMs >= maxLoopMs) {
          clearInterval(interval);
          new AWN({
            position: "top-right",
            icons: {
              prefix: "<span>",
              suffix: "</span>",
              alert: "⚠"
            }
          }).alert("Could not get the uploaded image!");
          reject();
        }

      }, intervalMs)
    })
  },
  getMenu(): Promise<IAppMenuItem[]> {
    return Promise.resolve([
      {
        name: '数据模板',
        icon: 'bar-chart',
        isOpen: true,
        children: [
          {
            name: '数据模板',
            url: '/',
          },
        ],
      },
    ]);
  },
  sendTestEmail(data: {
    toEmail: string;
    subject: string;
    html: string;
    text: string;
  }) {
    return request.post('/email/user/send', {
      to_email: data.toEmail,
      subject: data.subject,
      text: data.text,
      html: data.html,
    });
  },
};

export interface IAppMenuItem {
  name: string;
  url?: string;
  icon: string;
  isOpen?: boolean;
  children: IAppSubMenuItem[];
}

export interface IAppSubMenuItem {
  name: string;
  url: string;
  isOpen?: boolean;
}
