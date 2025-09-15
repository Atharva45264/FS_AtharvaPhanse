import React, { useEffect, useState } from 'react';
import CommuteMap from '../components/CommuteMap';
import { api } from '../services/api';

export default function MapView() {
  const [routes, setRoutes] = useState([]);
  const username = localStorage.getItem('username');

  useEffect(() => {
    // fetch existing routes
    (async () => {
      try {
        const res = await api.get('/routes');
        setRoutes(res.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <div style={{ height: '100%' }}>
      <CommuteMap routes={routes} username={username} />
    </div>
  );
}
