from flask import Flask, request
from flask_cors import CORS
import json
import csv

app = Flask(__name__)
CORS(app)

csv_path = '../sensor_data/data.csv'
csv_data = []
# csv_names = []  # list used for names of columns in csv_file

NUM_PAST_ROWS = 16  # number of rows sent to react for past analysis

@app.route('/future', methods=['POST'])
def get_data_future():
    return json.dumps({"co2": 452.8})

@app.route('/present', methods=['GET'])
def get_data_present():
    global csv_data

    room = request.args.get('room')

    row = csv_data[len(csv_data)-1]

    air_data = {}

    if room == 'room_a':
        air_data = {
            "timestamp": str(row[0]),
            "temp": str(row[4]),
            "co2": str(row[21]),
            "voc": str(row[24]),
            "consumed_meals": str(row[30])
        }
    elif room == 'room_b':
        air_data = {
            "timestamp": str(row[0]),
            "temp": str(row[25]),
            "co2": str(row[22]),
            "voc": str(row[29])
        }
    else:
        print('Room was not specified')
        air_data = {
            "timestamp": "",
            "temp": "",
            "co2": "",
            "voc": "",
            "consumed_meals": ""
        }

    return json.dumps(air_data)


@app.route('/past', methods=['GET'])
def get_data_past():
    global csv_data

    room = request.args.get('room')

    if room is None:
        print('Room was not specified')

    i = len(csv_data)-NUM_PAST_ROWS
    air_data = []

    for j in range(NUM_PAST_ROWS):
        row = csv_data[i]
        cur_air_data = {}

        if room == 'room_a':
            cur_air_data = {
                "timestamp": str(row[0]),
                "temp": str(row[4]),
                "co2": str(row[21]),
                "voc": str(row[24]),
                "consumed_meals": str(row[30])
            }
        elif room == 'room_b':
            cur_air_data = {
                "timestamp": str(row[0]),
                "temp": str(row[25]),
                "co2": str(row[22]),
                "voc": str(row[29])
            }
        else:
            cur_air_data = {
                "timestamp": "",
                "temp": "",
                "co2": "",
                "voc": "",
                "consumed_meals": ""
            }

        air_data.append(cur_air_data)

        i += 1

    return json.dumps(air_data)


if __name__ == '__main__':
    # Read CSV
    with open(csv_path, newline='') as csvfile:
        spamreader = csv.reader(csvfile, delimiter=',', quotechar='|')
        csv_data = list(spamreader)

    # csv_names = csv_data[0]
    # csv_names[0] = 'timestamp'
    # print(csv_names)

    # Open Server
    app.run(debug=True)
