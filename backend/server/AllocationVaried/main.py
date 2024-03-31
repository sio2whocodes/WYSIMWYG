"""
    This is the most simple scenario with a basic topology, some users and a set of apps with only one service.

    @author: Isaac Lera
"""
import os
import time
import json
import random
import logging.config
import sys
sys.path.append('../../src/yafs/src')

import networkx as nx
from pathlib import Path
import matplotlib.pyplot as plt

import pandas as pd
import numpy as np

from yafs.core import Sim
from yafs.application import create_applications_from_json, Application, Message, fractional_selectivity
from yafs.topology import Topology

from yafs.placement import JSONPlacement
from yafs.path_routing import DeviceSpeedAwareRouting
# from yafs.path_routing import MinimunPath
from yafs.distribution import deterministic_distribution
from yafs.extension import haversine_distance


def main(stop_time, it, folder_results):
    """
    TOPOLOGY
    """
    t = Topology()

    # You also can create a topology using JSONs files. Check out examples folder
    dataNetwork = json.load(open('data/network.json'))
    t.load(dataNetwork)
    nx.write_gexf(t.G, folder_results + "network_graph")  # you can export the Graph in multiples format to view in tools like Gephi, and so on.

    # print(t.G.nodes())  # nodes id can be str or int
    # print(nx.node_link_data(t.G))

    ## load latitude, longitude
    network_node = pd.read_csv('data/network_node.csv')
    for node in t.G.nodes():
        node1 = network_node.loc[network_node['node_id'] == node]
        t.G.nodes[node]['lat'] = node1['latitude'].values[0]
        t.G.nodes[node]['lon'] = node1['longitude'].values[0]

    ## load distance
    for link in t.G.edges():
        src_lat, src_lon = t.G.nodes[link[0]]['lat'], t.G.nodes[link[0]]['lon']
        dst_lat, dst_lon = t.G.nodes[link[1]]['lat'], t.G.nodes[link[1]]['lon']
        distance = haversine_distance(src_lat, src_lon, dst_lat, dst_lon)
        t.G.edges[link]['PR'] = round(distance*10, 5) # PR에 추가함

    ## check the values (node, edges)
    data = nx.node_link_data(t.G)
    # print(data)

    ## network json 저장
    with open("data/network_updated.json", "w") as outfile:
        json.dump(data, outfile, indent=4)

    # Plotting the graph
    pos = nx.spring_layout(t.G)
    nx.draw_networkx(t.G, pos, with_labels=True)
    # nx.draw_networkx_edge_labels(t.G, pos, alpha=0.5, font_size=5, verticalalignment="top")
    plt.show()

    """
    APPLICATION or SERVICES
    """
    dataApp = json.load(open('data/appDefinition.json'))
    apps = create_applications_from_json(dataApp)

    """
    SERVICE PLACEMENT (ALLOCATION)
    """
    placementJson = json.load(open('data/allocDefinition.json'))
    placement = JSONPlacement(name="Placement", json=placementJson)

    """
    (!TEMP) Defining ROUTING algorithm to define how path messages in the topology among modules
    """
    selectorPath = DeviceSpeedAwareRouting()

    """
    SIMULATION ENGINE
    """
    s = Sim(t, default_results_path=folder_results + "sim_trace")

    """
    Deploy services == APP's modules
    """
    for aName in apps.keys():
        s.deploy_app(apps[aName], placement, selectorPath)  # Note: each app can have a different routing algorithm

    """
    Deploy users
    """
    userJSON = json.load(open('data/usersDefinition.json'))
    for user in userJSON["sources"]:
        app_name = user["app_name"] # 헷갈려서 app_name 명시함
        app = s.apps[app_name]
        msg = app.get_message(user["message"])
        node = user["id_resource"]
        dist = deterministic_distribution(100, name="Deterministic")
        idDES = s.deploy_source(app_name, id_node=node, msg=msg, distribution=dist)

    """
    RUNNING - last step
    """
    logging.info(" Performing simulation: %i " % it)
    s.run(stop_time)  # To test deployments put test_initial_deploy a TRUE
    s.print_debug_assignaments()


if __name__ == '__main__':
    LOGGING_CONFIG = Path(__file__).parent / 'logging.ini'
    logging.config.fileConfig(LOGGING_CONFIG)

    folder_results = Path("results/")
    folder_results.mkdir(parents=True, exist_ok=True)
    folder_results = str(folder_results) + "/"

    nIterations = 1  # iteration for each experiment
    simulationDuration = 3000

    # Iteration for each experiment changing the seed of randoms
    for iteration in range(nIterations):
        random.seed(iteration)
        logging.info("Running experiment it: - %i" % iteration)

        start_time = time.time()
        main(stop_time=simulationDuration,
             it=iteration, folder_results=folder_results)

        print("\n--- %s seconds ---" % (time.time() - start_time))

    print("Simulation Done!")

    # Analysing the results.
    dfl = pd.read_csv(folder_results + "sim_trace" + "_link.csv")
    print("Number of total messages between nodes: %i" % len(dfl))

    df = pd.read_csv(folder_results + "sim_trace.csv")
    print("Number of requests handled by deployed services: %i" % len(df))

    dfapp = df.copy()
    print(dfapp.head())

    req_to_cloud = dfapp[dfapp['TOPO.dst'] == 0]
    # print("TO CLOUD\n", req_to_cloud)

    req_to_edge = dfapp[dfapp['TOPO.dst'] != 0]
    # print("TO EDGE\n", req_to_edge)

    avg_latency_cloud = req_to_cloud["latency"].mean()
    print("(cloud)average latency: %0.3f" % avg_latency_cloud)
    avg_response_time_cloud = req_to_cloud["response_time"].mean()
    print("(cloud)average response time: %0.3f" % avg_response_time_cloud)

    avg_latency_edge = req_to_edge["latency"].mean()
    print("(edge)average latency: %0.3f" % avg_latency_edge)
    avg_response_time_edge = req_to_edge["response_time"].mean()
    print("(edge)average response time: %0.3f" % avg_response_time_edge)

    dfapp.loc[:, "transmission_time"] = dfapp.time_emit - dfapp.time_reception  # Transmission time
    dfapp.loc[:, "service_time"] = dfapp.time_out - dfapp.time_in
    dfapp.loc[:, "latency"] = dfapp.time_reception - dfapp.time_emit
    dfapp.loc[:, "latency+wait"] = dfapp.time_in - dfapp.time_emit
    dfapp.loc[:, "response_time"] = dfapp.time_out - dfapp.time_emit

    print("The average service time of apps is: %0.3f " % dfapp["service_time"].mean())
    print("The average latency of apps is: %0.3f " % dfapp["latency"].mean())
    print("The average response time of apps is: %0.3f " % dfapp["response_time"].mean())

    # response time (min, max) in total
    min_response_time = dfapp["response_time"].min()
    max_response_time = dfapp["response_time"].max()
    mindes = dfapp.loc[dfapp["response_time"] == min_response_time]
    maxdes = dfapp.loc[dfapp["response_time"] == max_response_time]
    # print("min response time: %0.3f (from %d user)" % (min_response_time, mindes.iloc[0]['TOPO.src']))
    # print("max response time: %0.3f (from %d user)" % (max_response_time, maxdes.iloc[0]['TOPO.src']))
    #
    # print("The apps is deployed in the folling nodes: %s" % np.unique(dfapp["TOPO.dst"]))
    # print("The number of instances of apps deployed is: %s" % np.unique(dfapp["DES.dst"]))

    suc_count = len(dfapp[dfapp["response_time"] < 100])
    total_count = len(dfapp)
    if total_count > 0:
        suc_rate = suc_count / total_count
    else:
        suc_rate = 0
    print("total suc rate : %0.1f %%" % (suc_rate*100))

    suc_count = len(req_to_cloud[req_to_cloud["response_time"] < 100])
    total_count = len(req_to_cloud)
    if total_count > 0:
        suc_rate = suc_count / total_count
    else:
        suc_rate = 0
    print("cloud suc rate : %0.1f %%" % (suc_rate * 100))

    suc_count = len(req_to_edge[req_to_edge["response_time"] < 100])
    total_count = len(req_to_edge)
    if total_count > 0:
        suc_rate = suc_count / total_count
    else:
        suc_rate = 0
    print("edge suc rate : %0.1f %%" % (suc_rate * 100))
