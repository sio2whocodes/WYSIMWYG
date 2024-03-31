import json

json_data = {
  "initialAllocation": [
    {
      "module_name": "Edge1",
      "app": "app1",
      "id_resource": 5
    }
  ]
}

def get_allocation(strategy):
    new_allocation = []

    for local in strategy['strategy']:
        local_id = local["local_id"]

        new_alloc = {}
        new_alloc["module_name"] = "Edge"+str(local_id)
        new_alloc["app"] = "app" + str(local_id)
        if local["storage_type"] == "EDGE":
            new_alloc["id_resource"] = local_id
        elif local["storage_type"] == "CLOUD":
            new_alloc["id_resource"] = 0

        new_allocation.append(new_alloc)

    data = {"initialAllocation": new_allocation}
    # print(data)

    with open("data/allocDefinition.json", "w") as outfile:
        json.dump(data, outfile, indent=2)

    return data