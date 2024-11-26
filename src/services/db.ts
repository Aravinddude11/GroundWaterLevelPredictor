import { openDB } from 'idb';
import { WaterLevelData } from '../types';
import { addMonths, format } from 'date-fns';

const DB_NAME = 'groundwater_db';
const STORE_NAME = 'water_levels';

export async function initDB() {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id' });
    },
  });
}

export async function getHistoricalData(lat: number, lng: number): Promise<WaterLevelData[]> {
  const db = await openDB(DB_NAME, 1);
  const startDate = new Date(2023, 0, 1);
  
  // Generate location-specific data
  const data: WaterLevelData[] = Array.from({ length: 12 }, (_, i) => {
    const date = addMonths(startDate, i);
    const month = i / 12;
    
    // Base level calculation based on location
    const baseLevel = 35 + 
      (lat - 28.6139) * 0.5 + // Latitude impact
      (lng - 77.2090) * 0.3;  // Longitude impact
    
    // Add seasonal variation
    const seasonalVariation = Math.sin(month * Math.PI * 2) * 5;
    
    // Add some random noise
    const noise = (Math.random() - 0.5) * 2;
    
    return {
      id: `${lat}-${lng}-${i}`,
      location: {
        latitude: lat,
        longitude: lng,
        name: `Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`
      },
      date: format(date, 'yyyy-MM'),
      level: Number((baseLevel + seasonalVariation + noise).toFixed(2)),
      factors: {
        rainfall: 750 + Math.sin(month * Math.PI * 2) * 250 + Math.random() * 100,
        population: 450 + (lat - 28.6139) * 100 + Math.random() * 50,
        elevation: 450 + (lng - 77.2090) * 50 + Math.random() * 25,
        landUse: 'Agricultural'
      }
    };
  });

  // Store the generated data
  const tx = db.transaction(STORE_NAME, 'readwrite');
  await Promise.all(data.map(item => tx.store.put(item)));
  await tx.done;

  return data;
}