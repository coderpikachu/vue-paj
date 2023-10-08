import TestJson from '@/assets/jsons/hero_list.json';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import axios from 'axios';
import { stringFormat } from '@/utils/string-format';
import itemJson from '@/assets/jsons/item_list.json';
const download = (href) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: href,
      responseType: 'arraybuffer',
    })
      .then((data) => {
        resolve(data.data);
      })
      .catch((error) => {
        reject(error.toString());
      });
  });
};
export const doOnce = () => {
  const zip = new JSZip();
  const cache = {};
  const promises = [];

  const items = itemJson['items'];
  items.forEach((item) => {
    const alias = item['itemId'];
    const url = stringFormat(
      'https://game.gtimg.cn/images/lol/act/img/item/{0}.png',
      alias,
    );
    const fileName = stringFormat('{0}.png', alias);

    //item.downloadLink.split('?')[0] 处理companyAttachmentsList里的url地址 去除？号和后面的字符串
    const promise = download(url).then((data) => {
      // 下载文件, 并存成ArrayBuffer对象
      //item.fileName companyAttachmentsList里的文件名
      zip.file(fileName, data, { binary: true }); // 逐个添加文件
      cache[fileName] = data; //可要可不要 用来打印查检查添加了那些文件
    });
    promises.push(promise); //加到promises队列里
  });
  Promise.all(promises).then(() => {
    //异步队列全部完成时 执行下面代码
    zip.generateAsync({ type: 'blob' }).then((content) => {
      // 生成二进制流
      saveAs(content, '打包下载.zip'); // 利用file-saver保存文件
    });
  });
};
// export const doOnce = (idMap) => {
//   console.log('idMap', idMap);
//   let cnt = 0;
//   for (const idMapKey in idMap) {
//     const alias = idMap[idMapKey]['alias'];
//     cnt++;
//     console.log(alias);
//     saveAs(
//       String.format(
//         'https://game.gtimg.cn/images/lol/act/img/champion/{0}.png',
//         alias,
//       ),
//       String.format('{0}.png', alias),
//     );
//   }
//   console.log(cnt);
//   //const alias = 'Yone';
//   // saveAs(
//   //   String.format(
//   //     'https://game.gtimg.cn/images/lol/act/img/champion/{0}.png',
//   //     alias,
//   //   ),
//   //   String.format('{0}.png', alias),
//   // );
// };
