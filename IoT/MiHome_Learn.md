[通过树莓派+Homebridge+小米智能，实现我homekit梦](https://www.jianshu.com/p/ac813cf3559c)

还是离不开 米家的网关。





[[智能传感] 米家蓝牙温湿度计【Hassio】](https://bbs.hassbian.com/thread-4078-1-3.html)
## 获取米家蓝牙温湿度计mac地址
1. 安装hcitool【如果没有装】
```
sudo apt-get install bluez bluez-hcidump
```
2. 通过hcitool工具扫描获取 蓝牙mac地址,扫描过程中，需要开启手机米家app连接米家蓝牙温湿度计读取一下数据。否则扫描不出mac地址
```
bash-4.4# sudo hcitool lescan
Set scan parameters failed: Operation timed out
bash-4.4# hcitool lescan
LE Scan ...
11:22:33:AA:BB:CC MJ_HT_V1

```

3. Hassio可以直接进入Homeassistant容器执行第二步的操作【hassio 自带hcitool】
```
docker exec -it homeassistant bash
```

## 配置Yaml
```
sensor:
  - platform: mitemp_bt
    mac: '11:22:33:AA:BB:CC'
    monitored_conditions:
      - temperature
      - humidity
      - battery

homeassistant:
  customize:
    sensor.mitemp_bt_battery:
      friendly_name: 米家蓝牙温湿度计电量
    sensor.mitemp_bt_humidity:
      friendly_name: 米家蓝牙温湿度计湿度
    sensor.mitemp_bt_temperature:
      friendly_name: 米家蓝牙温湿度计温度

group:
  mitemp_bt:
    name: "米家蓝牙温湿度计"
    icon: mdiil-temperature
    view: false
    entities:
      - sensor.mitemp_bt_temperature
      - sensor.mitemp_bt_humidity
      - sensor.mitemp_bt_battery
```      
需求
1.Homeassistant >=0.69
2.蓝牙适配器

参考文档
1.[米家蓝牙温湿度计HA官方文档](https://www.home-assistant.io/integrations/mitemp_bt)






----


（更新）米家蓝牙温湿度计2接入
https://bbs.hassbian.com/thread-9037-1-1.html
(出处: 『瀚思彼岸』» 智能家居技术论坛)
米家蓝牙温湿度计2 通过具有蓝牙的 Linux 设备作为网桥，接入 MQTT，并被HASS 订阅
请忘了原来那一版愚蠢的方法……

lLDiid.png

lLBvM6.png

先决条件
有一台具有蓝牙功能的 Linux 设备，包括但不限于 树莓派 山寨派 x86 设备等
请参考 JsBergbau/MiTemperature2，安装好 Python3 Python3-pip Bluez setuptools wheel 等。
食用方法
克隆源项目
```
git clone https://github.com/JsBergbau/MiTemperature2
cd MiTemperature2 
```
建立一个 Shell 脚本，供LYWSD03MMC.py回调
```
touch sendtoMQTT.sh
```
编辑 Shell 脚本，保存并退出
```
vim sendtoMQTT.sh
# 将以下内容粘贴到文件中，并修改 mqtt.host mqtt.username mqtt.passwd
# 例如：mosquitto_pub -h 192.168.1.77 -t "mibridge/$2/temp" -u mqtt -P mqtt -i "mibridge" -m "$3"
#!/bin/bash
mosquitto_pub -h mqtt.host -t "mibridge/$2/temp" -u mqtt.username -P mqtt.passwd -i "mibridge" -m "$3"
mosquitto_pub -h mqtt.host -t "mibridge/$2/humidity" -u mqtt.username -P mqtt.passwd -i "mibridge" -m "$4"
mosquitto_pub -h mqtt.host -t "mibridge/$2/batterylevel" -u mqtt.username -P mqtt.passwd -i "mibridge" -m "$5"
```
给脚本赋予运行权限
```
chmod +x sendtoMQTT.sh
```

让程序在后台运行，并回调脚本向 mqtt 发布信息
```
# 修改 device.name device.MAC-Address 并运行
# 例如 nohup python3 LYWSD03MMC.py --callback sendtoMQTT.sh -b 1 --name ciwo -d AA:BB:CC:CD:EE:FF
nohup python3 LYWSD03MMC.py --callback sendtoMQTT.sh -b 1 --name device.name -d device.MAC-Address &
# 每次重启设备，需要重新运行以上命令，或想办法配置成启动时自动执行
# 退出当前 bash 时，请使用 exit 命令，而不是直接关闭窗口，保证程序能在后台持续运行
配置 HASS mqtt 传感器，订阅相关主题
# 修改 device.name 到与上面运行命令相同
sensor:
  - platform: mqtt
    state_topic: "mibridge/device.name/temp"
    # 例如：state_topic: "mibridge/ciwo/temp"
    name: 次卧温度
    unit_of_measurement: "°C"
    force_update: true
    device_class: temperature
  - platform: mqtt
    state_topic: "mibridge/device.name/humidity"
    name: 次卧湿度
    unit_of_measurement: "%"
  - platform: mqtt
    state_topic: "mibridge/device.name/batterylevel"
    name: 次卧温湿度计电池
    unit_of_measurement: "%"
```
重启 hass，到前端添加三个 sensor
琐碎话
之后也许可能大概会尝试改成 hass 自定义组件的方式接入。但因为我自己没有这个需求（hassio on hyper-v on j3455，且主板无蓝牙），且能力非常非常低劣（如果懂python的人见过上一次改的版本就知道了），所以可能是猴年马月的事情。（刚搜到大概很快 sensor.mitemp_bt 项目就会支持这一款了 https://github.com/custom-components/sensor.mitemp_bt/issues/7）
hass 本身是有 RESTAPI 的，如果没有 mqtt 的朋友，可以考虑在 hass 中创建一些 input_number 和 template sensor，用 curl POST 数据，实现接入。（方法更新在18楼，可自行研究）
希望大家多学，多研究，多交流。
请忽略下面过时的附件