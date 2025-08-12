import React, { useEffect, useState } from 'react';
import api from '../api/axios';

type Brand = { id: string; name: string; description?: string };

export default function Brands() {
  const [items, setItems] = useState<Brand[]>([]);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [editing, setEditing] = useState<null | string>(null);

  const load = async () => {
    const r = await api.get('/brands');
    setItems(r.data);
  };

  useEffect(() => { load(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await api.put(`/brands/${editing}`, { name, description: desc });
    } else {
      await api.post('/brands', { name, description: desc });
    }
    setName(''); setDesc(''); setEditing(null);
    load();
  };

  const edit = (b: Brand) => { setEditing(b.id); setName(b.name); setDesc(b.description || ''); };
  const del = async (id: string) => { if (!confirm('Delete?')) return; await api.delete(`/brands/${id}`); load(); };

  return (
    <div style={{ maxWidth: 800, margin: 20 }}>
      <h2>Brands</h2>
      <form onSubmit={submit} style={{ marginBottom: 20 }}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
        <button type="submit">{editing ? 'Save' : 'Create'}</button>
        {editing && <button type="button" onClick={() => { setEditing(null); setName(''); setDesc(''); }}>Cancel</button>}
      </form>

      <table border={1} cellPadding={8} style={{ width: '100%' }}>
        <thead>
          <tr><th>Name</th><th>Description</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {items.map(b => (
            <tr key={b.id}>
              <td>{b.name}</td>
              <td>{b.description}</td>
              <td>
                <button onClick={() => edit(b)}>Edit</button>
                <button onClick={() => del(b.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
