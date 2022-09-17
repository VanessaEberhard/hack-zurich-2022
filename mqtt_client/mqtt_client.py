"""
This script opens a MQTT Client to read data from different sensors
that are also MQTT clients, and parse it to generate complete timestamps
with all the selected sensor data.

Timestamps are every 10 minute intervals.

variables:
- broker_ip: corresponds to the IP address of the MQTT Broker
- subs: corresponds to the names of sensors we want to read from

functions:
- read_mqtt: initializes MQTT Client and starts reading
- get_data: prints to screen received data in interval

"""

import paho.mqtt.client as mqtt
from datetime import datetime


data = {}

last_time_stamp = None


subs = ['temp', 'co2', 'voc']
"""Subs that we want MQTT client to subscribe to"""

broker_ip = 'localhost'
"""IP of MQTT broker"""


def get_data():
    global data

    rl = []

    for sub in subs:
        if sub in data:
            rl.append(data[sub])
        else:
            rl.append(0)

    print('Sending data:', rl)
    # return rl


def read_mqtt():
    print('Reading mqtt')
    client = mqtt.Client()
    client.on_connect = on_connect
    client.on_message = on_message

    client.connect(broker_ip)

    client.loop_forever()


def get_time_stamp():
    time_now = datetime.now()
    minute = (time_now.minute//10)
    return time_now.strftime("%Y-%m-%d %H:") + str(minute) + "0:00"


def on_connect(client, userdata, flags, rc):
    print("Connected with code", str(rc))

    for sub in subs:
        client.subscribe(sub)


def on_message(client, userdata, msg):
    global last_time_stamp, data
    time_stamp = get_time_stamp()

    topic = msg.topic
    payload = msg.payload

    if last_time_stamp is not None and time_stamp != last_time_stamp:
        get_data()
        data.clear()

    last_time_stamp = time_stamp

    data[topic] = payload

    print(time_stamp, msg.topic, str(msg.payload))


if __name__ == "__main__":
    read_mqtt()
