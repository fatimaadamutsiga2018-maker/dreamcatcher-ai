const STATIC_TRUSTED_ORIGINS = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:3002',
  'http://127.0.0.1:3002',
  'https://www.dreamcatcherai.us',
  'https://dreamcatcherai.us',
  'https://dreamcatcher-ai-nine.vercel.app',
];

const TRUSTED_HOST_PATTERNS = [
  '*-fatimas-projects-05c26760.vercel.app',
];

const VERCEL_ENV_HOST_KEYS = [
  'VERCEL_URL',
  'VERCEL_BRANCH_URL',
  'VERCEL_PROJECT_PRODUCTION_URL',
] as const;

function isLocalHost(host: string) {
  return host.startsWith('localhost') || host.startsWith('127.0.0.1');
}

function toOrigin(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  try {
    if (value.includes('://')) {
      return new URL(value).origin;
    }

    const protocol = isLocalHost(value) ? 'http' : 'https';
    return new URL(`${protocol}://${value}`).origin;
  } catch {
    return null;
  }
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function matchesHostPattern(host: string, pattern: string) {
  const regex = new RegExp(
    `^${pattern.split('*').map(escapeRegex).join('.*')}$`
  );

  return regex.test(host);
}

function getDeploymentOrigins() {
  return VERCEL_ENV_HOST_KEYS.map((key) => toOrigin(process.env[key]))
    .filter((origin): origin is string => Boolean(origin));
}

function getDeploymentHosts() {
  return getDeploymentOrigins()
    .map((origin) => {
      try {
        return new URL(origin).host;
      } catch {
        return null;
      }
    })
    .filter((host): host is string => Boolean(host));
}

function getRequestOrigin(request?: Request) {
  if (!request) {
    return null;
  }

  const requestOrigin = toOrigin(request.headers.get('origin'));
  if (requestOrigin) {
    return requestOrigin;
  }

  const forwardedHost =
    request.headers.get('x-forwarded-host') || request.headers.get('host');

  if (!forwardedHost) {
    return null;
  }

  const forwardedProto =
    request.headers.get('x-forwarded-proto') ||
    (isLocalHost(forwardedHost) ? 'http' : 'https');

  return toOrigin(`${forwardedProto}://${forwardedHost}`);
}

export function isTrustedAuthOrigin(origin: string) {
  const normalizedOrigin = toOrigin(origin);
  if (!normalizedOrigin) {
    return false;
  }

  if (STATIC_TRUSTED_ORIGINS.includes(normalizedOrigin)) {
    return true;
  }

  if (getDeploymentOrigins().includes(normalizedOrigin)) {
    return true;
  }

  try {
    const { host } = new URL(normalizedOrigin);
    const matchesPattern = TRUSTED_HOST_PATTERNS.some((pattern) =>
      matchesHostPattern(host, pattern)
    );

    return matchesPattern;
  } catch {
    return false;
  }
}

export function getTrustedAuthOrigins(request?: Request) {
  const origins = new Set<string>([
    ...STATIC_TRUSTED_ORIGINS,
    ...getDeploymentOrigins(),
  ]);

  const requestOrigin = getRequestOrigin(request);
  if (requestOrigin && isTrustedAuthOrigin(requestOrigin)) {
    origins.add(requestOrigin);
  }

  return [...origins];
}

export function getAllowedAuthHosts() {
  return [
    'localhost:3000',
    '127.0.0.1:3000',
    'localhost:3002',
    '127.0.0.1:3002',
    'www.dreamcatcherai.us',
    'dreamcatcherai.us',
    'dreamcatcher-ai-nine.vercel.app',
    ...TRUSTED_HOST_PATTERNS,
    ...getDeploymentHosts(),
  ];
}
