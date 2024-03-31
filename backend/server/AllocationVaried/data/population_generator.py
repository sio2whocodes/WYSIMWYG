import json

population = [0,14,8,13,22,37,18,14,24,15,25,13,15]

population_data = []

for i in range(1,len(population)):
    new_local = {
        "local_id": i,
        "population": population[i]
    }
    population_data.append(new_local)

print(population_data)

with open('population_data.json', 'w') as outfile:
    json.dump(population_data, outfile, indent=2)
