// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://ryrohlvnchlltgdoiudd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5cm9obHZuY2hsbHRnZG9pdWRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1MjAzNzYsImV4cCI6MjA2MzA5NjM3Nn0.cwRc2DXwt4dQJ-XLy5Uld7l3dSU_QTSOZLaueIRYZQo'
);
