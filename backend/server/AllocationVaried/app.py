import os
import json
import pandas as pd
import sys

import strategy_to_allocation

from flask import Flask, request

app = Flask(__name__)

@app.route('/')
def home():
   return 'This is Home!'


@app.route('/result', methods=['POST'])
def result():
    strategy = request.get_json()
    allocation = strategy_to_allocation.get_allocation(strategy)
    simulation_path = "main.py"
    os.system(f"python {simulation_path}")

    stl = pd.read_csv("results/" + "sim_trace" + "_link.csv")
    print("Number of total messages between nodes: %i" % len(stl))

    st = pd.read_csv("results/" + "sim_trace.csv")
    print("Number of requests handled by deployed services: %i" % len(st))

    stdata = st.copy()
    stldata = stl.copy()

    # latency
    latency_avg = stdata["latency"].mean()


    # avg response time
    req_to_cloud = stdata[stdata['TOPO.dst'] == 0]
    req_to_edge = stdata[stdata['TOPO.dst'] != 0]

    # avg response time
    avg_res_time = stdata["response_time"].mean()
    avg_res_time_cloud = req_to_cloud["response_time"].mean()
    if pd.isna(avg_res_time_cloud):
        avg_res_time_cloud = 0
    avg_res_time_edge = req_to_edge["response_time"].mean()
    if pd.isna(avg_res_time_edge):
        avg_res_time_edge = 0

    # min, max response time
    min_res_time = stdata["response_time"].min()
    max_res_time = stdata["response_time"].max()

    # success rate in 100ms (total)
    suc_count = len(stdata[stdata["response_time"] < 100])
    total_count = len(stdata)
    if total_count > 0:
        suc_rate = ((suc_count / total_count) * 100)
    else:
        suc_rate = 0

    # success rate in 100ms (cloud)
    suc_count = len(req_to_cloud[req_to_cloud["response_time"] < 100])
    total_count = len(req_to_cloud)
    if total_count > 0:
        suc_rate_cloud = ((suc_count / total_count) * 100)
    else:
        suc_rate_cloud = 0

    # success rate in 100ms (edge)
    suc_count = len(req_to_edge[req_to_edge["response_time"] < 100])
    total_count = len(req_to_edge)
    if total_count > 0:
        suc_rate_edge = ((suc_count / total_count) * 100)
    else:
        suc_rate_edge = 0

    ## range of benefit
    # population import
    population = pd.read_json('data/population_data.json')

    strategies = strategy["strategy"]
    edge_use_locals = []
    cloud_use_locals = []
    for local in strategies:
        if local['storage_type'] == "CLOUD":
            cloud_use_locals.append(local['local_id'])
        elif local['storage_type'] == "EDGE":
            edge_use_locals.append(local['local_id'])

    edge_user_sum = 0
    cloud_user_sum = 0

    for index, row in population.iterrows():
        if row.loc['local_id'] in edge_use_locals:
            edge_user_sum += int(row.loc['population'])*10
        else:
            cloud_user_sum += int(row.loc['population'])*10

    # latency difference
    avg_latency_base = 776.427
    latency_diff = avg_latency_base - latency_avg
    if latency_diff <= 0:
        latency_diff = 0

    # cost
    DATA_SIZE_RATIO = 2
    CLOUD_STORAGE_UNIT_COST = 0.023
    EDGE_STORAGE_UNIT_COST = 0.16
    cost = (cloud_user_sum * DATA_SIZE_RATIO * CLOUD_STORAGE_UNIT_COST
            + edge_user_sum * DATA_SIZE_RATIO * EDGE_STORAGE_UNIT_COST)

    # improvement
    res_avg_baseline = 776.727
    improvement = (1 - avg_res_time / res_avg_baseline) * 100
    if improvement <= 0:
        improvement = 0

    data = {
        "00cost": "%0.1f" % cost,
        "01avg_response_time":"%0.1f" % avg_res_time,
        "02avg_response_time_in_edge": "%0.1f" % avg_res_time_edge,
        "03avg_response_time_in_cloud": "%0.1f" % avg_res_time_cloud,
        "04min_response_time": "%0.1f" % min_res_time,
        "05max_response_time": "%0.1f" % max_res_time,
        "06success_rate_in_downtime($s)": "%0.1f" % suc_rate,
        "07success_rate_in_downtime($s) - edge": "%0.1f" % suc_rate_edge,
        "08success_rate_in_downtime($s) - cloud": "%0.1f" % suc_rate_cloud,
        "09range_of_benefit(edge)": "%d" % edge_user_sum,

        "10latency_difference": "%0.1f" % latency_diff,

        "11total_cost": "%0.1f" % cost,
        "12total_improvement": "%0.1f" % improvement
    }

    return data


if __name__ == '__main__':
   app.run('0.0.0.0',port=8080,debug=True)
