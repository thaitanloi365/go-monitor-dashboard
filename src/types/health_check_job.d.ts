interface IJobHealthCheckLog {}

interface IJobHealthCheck {
  tag: string;
  next_at: number;
  start_at: number;
  endpoint: string;
  timeout: number;
  interval: number;
  logs: IJobHealthCheckLog[];
}
