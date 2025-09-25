const { Pool } = require('pg');
const pool = new Pool();

class AlbumService {
  constructor() {
    this._albums = [];
  }

  async addAlbum({ id, name, year }) {
    const newAlbum = { id, name, year };
    this._albums.push(newAlbum);
    return id;
  }

  async getAlbumById(id) {
    return this._albums.find(album => album.id === id);
  }

  async updateAlbum(id, { name, year }) {
    const index = this._albums.findIndex(album => album.id === id);
    if (index === -1) return false;
    this._albums[index] = { id, name, year };
    return true;
  }

  async deleteAlbum(id) {
    const index = this._albums.findIndex(album => album.id === id);
    if (index === -1) return false;
    this._albums.splice(index, 1);
    return true;
  }
}

module.exports = AlbumService;

