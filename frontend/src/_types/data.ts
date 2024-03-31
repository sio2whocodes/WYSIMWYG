export interface StrategyType {
  local_id: number;
  storage_type: string;
  storage_id: number;
}
export interface ResultType {
  //  Monthly Cost for the distribution
  "00cost": number;
  // 1) Average response time
  "01avg_response_time": number;
  "02avg_response_time_in_edge": number;
  "03avg_response_time_in_cloud": number;
  // 3) Response time (min, max)
  "04min_response_time": number;
  "05max_response_time": number;
  // 2) Success rate
  "06success_rate_in_downtime($s)": number;
  "07success_rate_in_downtime($s) - edge": number;
  "08success_rate_in_downtime($s) - cloud": number;
  // 4) Range of benefit
  "09range_of_benefit(edge)": number;
  // 5) Latency difference
  "10latency_difference": number;
  // Total Result
  "11total_cost": number;
  "12total_improvement": number;
}
