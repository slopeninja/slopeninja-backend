import fetch from 'isomorphic-fetch';

const DATAGRID_URL = process.env.DATAGRID_URL;
const DATAGRID_CRED = process.env.DATAGRID_CRED;

const DATAGRID_CACHE_NAMESPACE = 'default';

class DataGrid {
  
  constructor(url, namespace) {
    this.url = `${url}/${namespace}`;
    this.token = new Buffer(DATAGRID_CRED).toString('base64');
  }
  
  async get(key) {
    const response = await fetch(`${this.url}/${key}`, {
      method: 'GET',
      headers: new Headers({
        authorization: `Basic ${this.token}`,
      }),
    });
    
    const body = await response.text();
    return body;
  }
  
  async set(key, value) {
    const response = await fetch(`${this.url}/${key}`, {
      method: 'PUT',
      headers: new Headers({
        authorization: `Basic ${this.token}`,
        'Content-Type': 'text/plain'
      }),
      body: value,
    });
    
    const body = await response.text();
    return body;
  }
}

const client = new DataGrid(DATAGRID_URL, DATAGRID_CACHE_NAMESPACE);

export default client;