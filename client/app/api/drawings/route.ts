import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const drawingsDir = path.join(process.cwd(), 'public', 'drawings');
    const files = fs.readdirSync(drawingsDir);
    
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png'].includes(ext);
    });

    const sortedImages = imageFiles
      .sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)?.[0] || '0');
        const numB = parseInt(b.match(/\d+/)?.[0] || '0');
        return numA - numB;
      })
      .map(file => `/drawings/${file}`);

    return NextResponse.json({ images: sortedImages });
  } catch (error) {
    console.error('Error fetching drawings:', error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
} 