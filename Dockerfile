FROM nginx
COPY ./dist /usr/share/nginx/html
EXPOSE 80
# 基于nginx来打包
# 拷贝当前目录的dist文件夹到 /usr/share/nginx/html中去
## 运行在80端口