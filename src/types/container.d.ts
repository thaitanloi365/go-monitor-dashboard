interface Container {
  Id: string;
  Names: string[];
  Image: string;
  ImageID: string;
  Command: string;
  Created: number;
  Ports: (Port|Ports2)[];
  Labels: Labels;
  State: string;
  Status: string;
  HostConfig: HostConfig;
  NetworkSettings: NetworkSettings;
  Mounts: (Mount|Mounts2|Mounts3)[];
}

interface Mounts3 {
  Type: string;
  Source: string;
  Destination: string;
  Mode: string;
  RW: boolean;
  Propagation: string;
  Name?: string;
  Driver?: string;
}

interface Mounts2 {
  Type: string;
  Source: string;
  Destination: string;
  Mode: string;
  RW: boolean;
  Propagation: string;
}

interface Mount {
  Type: string;
  Name: string;
  Source: string;
  Destination: string;
  Driver: string;
  Mode: string;
  RW: boolean;
  Propagation: string;
}

interface NetworkSettings {
  Networks: Networks;
}

interface Networks {
  deployment_default?: DeploymentDefault;
  'traefik-public'?: DeploymentDefault;
}

interface DeploymentDefault {
  IPAMConfig?: any;
  Links?: any;
  Aliases?: any;
  NetworkID: string;
  EndpointID: string;
  Gateway: string;
  IPAddress: string;
  IPPrefixLen: number;
  IPv6Gateway: string;
  GlobalIPv6Address: string;
  GlobalIPv6PrefixLen: number;
  MacAddress: string;
}

interface HostConfig {
  NetworkMode: string;
}

interface Labels {
  'com.docker.compose.config-hash': string;
  'com.docker.compose.container-number': string;
  'com.docker.compose.oneoff': string;
  'com.docker.compose.project': string;
  'com.docker.compose.project.config_files': string;
  'com.docker.compose.project.environment_file': string;
  'com.docker.compose.project.working_dir': string;
  'com.docker.compose.service': string;
  'com.docker.compose.version': string;
  maintainer?: string;
  'traefik.enable'?: string;
  'traefik.http.routers.chat-http.entrypoints'?: string;
  'traefik.http.routers.chat-http.middlewares'?: string;
  'traefik.http.routers.chat-http.rule'?: string;
  'traefik.http.routers.chat-https.entrypoints'?: string;
  'traefik.http.routers.chat-https.middlewares'?: string;
  'traefik.http.routers.chat-https.rule'?: string;
  'traefik.http.routers.chat-https.tls'?: string;
  'traefik.http.routers.chat-https.tls.certresolver'?: string;
  'traefik.http.services.chat.loadbalancer.server.port'?: string;
  'traefik.http.services.consumer.loadbalancer.server.port'?: string;
  'traefik.http.services.postgres.loadbalancer.server.port'?: string;
  'traefik.http.routers.pgadmin-http.entrypoints'?: string;
  'traefik.http.routers.pgadmin-http.middlewares'?: string;
  'traefik.http.routers.pgadmin-http.rule'?: string;
  'traefik.http.routers.pgadmin-https.entrypoints'?: string;
  'traefik.http.routers.pgadmin-https.rule'?: string;
  'traefik.http.routers.pgadmin-https.tls'?: string;
  'traefik.http.routers.pgadmin-https.tls.certresolver'?: string;
  'traefik.http.services.pgadmin.loadbalancer.server.port'?: string;
  'traefik.http.services.memcache.loadbalancer.server.port'?: string;
  'traefik.http.services.redis.loadbalancer.server.port'?: string;
  'traefik.http.routers.marketplace-http.entrypoints'?: string;
  'traefik.http.routers.marketplace-http.middlewares'?: string;
  'traefik.http.routers.marketplace-http.rule'?: string;
  'traefik.http.routers.marketplace-https.entrypoints'?: string;
  'traefik.http.routers.marketplace-https.middlewares'?: string;
  'traefik.http.routers.marketplace-https.rule'?: string;
  'traefik.http.routers.marketplace-https.tls'?: string;
  'traefik.http.routers.marketplace-https.tls.certresolver'?: string;
  'traefik.http.services.marketplace.loadbalancer.server.port'?: string;
  'traefik.http.routers.tpl-http.entrypoints'?: string;
  'traefik.http.routers.tpl-http.middlewares'?: string;
  'traefik.http.routers.tpl-http.rule'?: string;
  'traefik.http.routers.tpl-https.entrypoints'?: string;
  'traefik.http.routers.tpl-https.middlewares'?: string;
  'traefik.http.routers.tpl-https.rule'?: string;
  'traefik.http.routers.tpl-https.tls'?: string;
  'traefik.http.routers.tpl-https.tls.certresolver'?: string;
  'traefik.http.services.tpl.loadbalancer.server.port'?: string;
  'org.label-schema.build-date'?: string;
  'org.label-schema.name'?: string;
  'org.label-schema.schema-version'?: string;
  'org.label-schema.vcs-ref'?: string;
  'org.label-schema.vcs-url'?: string;
  'org.label-schema.vendor'?: string;
  'traefik.http.services.gorush.loadbalancer.server.port'?: string;
  'traefik.http.routers.mongoui-http.entrypoints'?: string;
  'traefik.http.routers.mongoui-http.middlewares'?: string;
  'traefik.http.routers.mongoui-http.rule'?: string;
  'traefik.http.routers.mongoui-https.entrypoints'?: string;
  'traefik.http.routers.mongoui-https.rule'?: string;
  'traefik.http.routers.mongoui-https.tls'?: string;
  'traefik.http.routers.mongoui-https.tls.certresolver'?: string;
  'traefik.http.services.mongoui.loadbalancer.server.port'?: string;
}

interface Ports2 {
  IP: string;
  PrivatePort: number;
  PublicPort: number;
  Type: string;
}

interface Port {
  PrivatePort: number;
  Type: string;
}
