import copy
import json

import pandas as pd

app_json = {
  "sources": [
    {
      "id_resource": 101,
      "app_name": "app01",
      "message": "ms_0",
      "lambda": 200
    }
  ]
}

new_sources = []

# population import
population = pd.read_json('population_data.json')

for i in range(1,13):
    new_entry = copy.deepcopy(app_json["sources"][0])
    new_entry["id_resource"] = 100+i
    new_entry["app_name"] = "app" + str(i)
    new_entry["message"] = "ms_" + str(i)

    numOfPop = population.loc[population['local_id'] == i].iloc[0]['population']
    for j in range(0, numOfPop):
        new_sources.append(new_entry)

new_data = {"sources": new_sources}

with open('usersDefinition.json', 'w') as outfile:
    json.dump(new_data, outfile, indent=2)


