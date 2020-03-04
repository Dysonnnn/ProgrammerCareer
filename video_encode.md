视频转码 普通版本
ffmpeg -i V00301-114924.mp4 -vcodec h264 -b 5800k -f mp4 output.mp4


视频转码 - 调用显卡N卡版本

ffmpeg -i xxx.mp4 -vcodec h264_nvenc -b 5800k -f mp4 output.mp4


手机termux内安装ffmpeg


压制前
---
VID_20190712_203947.mp4
容器：MPEG-4
总码率：12.9 Mbps
大小：334 MiB
时长：3mn 37s 694ms

视频(1)：AVC
码率：12.8 Mbps
大小：331 MiB (99%)
分辨率：1920x1080
宽高比：16:9(1.778)
帧率：30.000 fps
位深度：8 bits
像素宽高比：1.000
编码库：
Profile：High@L4.0
编码时间：UTC 2019-07-12 12:43:26
总帧数：6525

音频(2)：AAC
大小：2.49 MiB (1%)
码率：96.0 Kbps
采样率：48.0 KHz
声道数：2
---

压制后
---
output.mp4
容器：MPEG-4
总码率：5 898 Kbps
大小：153 MiB
时长：3mn 37s 695ms

视频(1)：AVC
码率：5 800 Kbps
大小：150 MiB (98%)
分辨率：1920x1080
宽高比：16:9(1.778)
帧率：30.000 fps
位深度：8 bits
像素宽高比：1.000
编码库：x264 - core 155
Profile：High@L4.0
编码时间：
总帧数：6527

音频(2)：AAC
大小：2.49 MiB (2%)
码率：96.0 Kbps
采样率：48.0 KHz
声道数：2
---