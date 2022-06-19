class Client {
  sessionId;

  constructor(host, port = 443, path, baseDirectory, username, password) {
    this.url = new URL(path, `https://${host}:${port}`);
    this.username = username;
    this.password = password;
    this.sessionId = "0";
    this.baseDirectory = baseDirectory;
    this.refreshSession();
  }

  get headers() {
    return {
      'X-Transmission-Session-Id': this.sessionId,
      'Authorization': 'Basic ' + btoa(`${this.username}:${this.password}`)
    };
  }

  async request(method, args = {}) {
    let query = { method: method, arguments: args };
    this.httpQuery(query);
  }

  async httpQuery(query) {
    fetch(this.url.toString(), {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(query)
    })
      .then(response => {
        this.sessionId = response.headers.get('X-Transmission-Session-Id');
      })
    .catch(response => {
      });
  }

  async refreshSession() {
    this.request("session-get");
  }

  async addTorrent(torrent, directory) {
    let args = { 'filename': torrent, 
      'download-dir': this.baseDirectory+directory}; 
    this.request("torrent-add", args);
  }
}


const client = new Client(
  'orion.feralhosting.com',
  443,
  '/dijkstra/transmission/rpc',
  '/media/f18a/dijkstra/private/transmission/data/',
  '', 'uELpjcRFn7gjPjeg')


browser.runtime.onMessage.addListener(message => {
  client.addTorrent(message.torrent, message.category)});
