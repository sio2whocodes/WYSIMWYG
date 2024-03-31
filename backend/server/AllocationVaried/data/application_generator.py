import copy
import json

json_data = {
    "id": 1,
    "name": "app1",
    "HwReqs": 1,
    "MaxReqs": 200,
    "MaxLatency": 50,
    "transmission": [
        {
            "message_in": "ms_1",
            "module": "Edge1"
        }
    ],
    "module": [
        {
            "id": 1,
            "name": "Edge1",
            "type": "MODULE",
            "RAM": 1
        }
    ],
    "message": [
        {
            "id": 1,
            "name": "ms_1",
            "s": "None",
            "d": "Edge1",
            "bytes": 20,
            "instructions": 30
        }
    ]
}

new_data = []

for i in range(1, 13):
    new_entry = copy.deepcopy(json_data)

    new_entry["id"] = i

    new_entry["name"] = "app" + str(i)
    new_entry["transmission"][0]["message_in"] = "ms_" + str(i)
    new_entry["transmission"][0]["module"] = "Edge" + str(i)
    new_entry["module"][0]["id"] = i
    new_entry["module"][0]["name"] = "Edge" + str(i)
    new_entry["message"][0]["id"] = i
    new_entry["message"][0]["name"] = "ms_" + str(i)
    new_entry["message"][0]["d"] = "Edge" + str(i)

    print(new_entry)

    new_data.append(new_entry)

print(new_data)
with open('appDefinition.json', 'w') as outfile:
    json.dump(new_data, outfile, indent=2)
