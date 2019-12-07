FROM debian:8
MAINTAINER Jia Yiqiu <yiqiujia@hotmail.com>

#CMD npm install -g spdyproxy
#ENTRYPOINT [ "npm", "install", "-g", "spdyproxy" ]
#RUN npm install -g spdyproxy

ADD node_old /node/node_old
ADD web_bs_gen.js /node/web_bs_gen.js
ADD node_modules/hello.node /node/node_modules/hello.node
#ADD node_modules.tar.gz /node
#ADD proxy-stuff /node/proxy-stuff

RUN chmod +x /node/node_old
#RUN chmod +x /node/proxy-stuff/start-container

WORKDIR /node

EXPOSE 18008

CMD /node/node_old /node/web_bs_gen.js

#sudo docker rm js.bs-server; sudo docker run -i -t --restart=always --name js.bs-server -p 18008:18008 --privileged wrt.qhkly.com:5000/js.bs-server:latest
