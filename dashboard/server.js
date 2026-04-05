const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 4847;
const ROOT = path.resolve(__dirname);
const PROJECT_ROOT = path.resolve(__dirname, '..');

// MIME types for static files
const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

function readJsonFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return null;
  }
}

function listDir(dirPath) {
  try {
    return fs.readdirSync(dirPath);
  } catch {
    return [];
  }
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(JSON.stringify(data));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname;

  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    return res.end();
  }

  // --- API Routes ---

  // GET /api/config/:filename
  if (pathname.startsWith('/api/config/') && req.method === 'GET') {
    const filename = pathname.replace('/api/config/', '');
    const filePath = path.join(PROJECT_ROOT, 'config', filename);
    const data = readJsonFile(filePath);
    if (data) return sendJson(res, 200, data);
    return sendJson(res, 404, { error: `Config ${filename} not found` });
  }

  // GET /api/data/shared/:path
  if (pathname.startsWith('/api/data/shared/') && req.method === 'GET') {
    const subpath = pathname.replace('/api/data/shared/', '');
    const filePath = path.join(PROJECT_ROOT, 'data', 'shared', subpath);

    // If it's a directory, list contents
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      const files = listDir(filePath);
      return sendJson(res, 200, { files });
    }
    // If it's a file, return contents
    const data = readJsonFile(filePath);
    if (data) return sendJson(res, 200, data);
    return sendJson(res, 404, { error: `Data file not found: ${subpath}` });
  }

  // GET /api/scheduled-tasks
  if (pathname === '/api/scheduled-tasks' && req.method === 'GET') {
    const tasksDir = path.join(PROJECT_ROOT, 'scheduled-tasks');
    const tasks = [];
    const dirs = listDir(tasksDir);
    for (const dir of dirs) {
      const skillPath = path.join(tasksDir, dir, 'SKILL.md');
      try {
        const content = fs.readFileSync(skillPath, 'utf8');
        // Extract frontmatter
        const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
        let name = dir;
        let description = '';
        let cron = '';
        if (fmMatch) {
          const fm = fmMatch[1];
          const nameMatch = fm.match(/name:\s*(.+)/);
          const descMatch = fm.match(/description:\s*(.+)/);
          if (nameMatch) name = nameMatch[1].trim();
          if (descMatch) description = descMatch[1].trim();
        }
        // Extract cron from body
        const cronMatch = content.match(/Cron:\s*`([^`]+)`/);
        if (cronMatch) cron = cronMatch[1];

        tasks.push({ id: dir, name, description, cron, enabled: true });
      } catch {
        tasks.push({ id: dir, name: dir, description: '', cron: '', enabled: true });
      }
    }
    return sendJson(res, 200, { tasks });
  }

  // GET /api/agents
  if (pathname === '/api/agents' && req.method === 'GET') {
    const divisions = {
      'division-1-paid': [],
      'division-2-organic': [],
      'division-3-eddie': [],
    };
    for (const div of Object.keys(divisions)) {
      const dirPath = path.join(PROJECT_ROOT, 'agents', div);
      const files = listDir(dirPath);
      for (const f of files) {
        if (f.endsWith('.md')) {
          divisions[div].push({
            name: f.replace('.md', '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
            file: f,
            status: 'idle',
            lastHeartbeat: null,
          });
        }
      }
    }
    return sendJson(res, 200, divisions);
  }

  // GET /api/health
  if (pathname === '/api/health' && req.method === 'GET') {
    const pkgPath = path.join(PROJECT_ROOT, 'package.json');
    const pkg = readJsonFile(pkgPath);
    const nodeModulesExist = fs.existsSync(path.join(PROJECT_ROOT, 'node_modules'));
    const envExists = fs.existsSync(path.join(PROJECT_ROOT, '.env'));
    const eddieSymlink = fs.existsSync(path.join(PROJECT_ROOT, 'eddie-vibe-marketer'));

    return sendJson(res, 200, {
      npmDependencies: nodeModulesExist ? 'installed' : 'missing',
      envFile: envExists ? 'present' : 'missing',
      eddieSymlink: eddieSymlink ? 'linked' : 'missing',
      packageVersion: pkg?.version || 'unknown',
    });
  }

  // POST /api/actions/:action
  if (pathname.startsWith('/api/actions/') && req.method === 'POST') {
    const action = pathname.replace('/api/actions/', '');
    const body = await parseBody(req);

    const timestamp = new Date().toISOString();
    const logEntry = { action, timestamp, params: body, status: 'queued' };

    // Write to actions log
    const logDir = path.join(PROJECT_ROOT, 'data', 'shared', 'actions-log');
    if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
    const logFile = path.join(logDir, 'actions.json');
    let log = [];
    try { log = JSON.parse(fs.readFileSync(logFile, 'utf8')); } catch {}
    log.unshift(logEntry);
    if (log.length > 100) log = log.slice(0, 100);
    fs.writeFileSync(logFile, JSON.stringify(log, null, 2));

    return sendJson(res, 200, { message: `Action '${action}' queued`, entry: logEntry });
  }

  // GET /api/actions-log
  if (pathname === '/api/actions-log' && req.method === 'GET') {
    const logFile = path.join(PROJECT_ROOT, 'data', 'shared', 'actions-log', 'actions.json');
    const data = readJsonFile(logFile);
    return sendJson(res, 200, data || []);
  }

  // POST /api/campaigns
  if (pathname === '/api/campaigns' && req.method === 'POST') {
    const body = await parseBody(req);
    const timestamp = new Date().toISOString();
    const campaign = { ...body, createdAt: timestamp, status: 'draft' };

    const campaignsFile = path.join(PROJECT_ROOT, 'data', 'shared', 'campaigns-draft.json');
    let campaigns = [];
    try { campaigns = JSON.parse(fs.readFileSync(campaignsFile, 'utf8')); } catch {}
    campaigns.push(campaign);
    fs.writeFileSync(campaignsFile, JSON.stringify(campaigns, null, 2));

    return sendJson(res, 200, { message: 'Campaign draft saved', campaign });
  }

  // --- Static file serving ---
  let filePath = pathname === '/' ? '/index.html' : pathname;
  filePath = path.join(ROOT, filePath);

  // Prevent directory traversal
  if (!filePath.startsWith(ROOT)) {
    return sendJson(res, 403, { error: 'Forbidden' });
  }

  try {
    const stat = fs.statSync(filePath);
    if (stat.isFile()) {
      const ext = path.extname(filePath);
      const mime = MIME[ext] || 'application/octet-stream';
      const content = fs.readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': mime });
      return res.end(content);
    }
  } catch {}

  sendJson(res, 404, { error: 'Not found' });
});

server.listen(PORT, () => {
  console.log(`Dashboard server running at http://localhost:${PORT}`);
  console.log(`Project root: ${PROJECT_ROOT}`);
});
