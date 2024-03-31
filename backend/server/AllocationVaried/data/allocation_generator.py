import json
import copy

json_data = {
  "initialAllocation": [
    {
      "module_name": "Cloud",
      "app": "app01",
      "id_resource": 5
    }
  ]
}

new_allocation = []

for i in range(1,13):
    new_entry = copy.deepcopy(json_data["initialAllocation"][0])

    new_entry["module_name"] = "Edge"+str(i)
    new_entry["app"] = "app"+str(i)
    new_entry["id_resource"] = 0

    new_allocation.append(new_entry)
new_data = {"initialAllocation": new_allocation}

with open("allocDefinition.json", "w") as outfile:
    json.dump(new_data, outfile, indent=2)

print("JSON FILE generated")